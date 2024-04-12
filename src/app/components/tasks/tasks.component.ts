import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ICategory, IPriority, ITask } from '../../models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../../dialog/edit-task-dialog/edit-task-dialog.component';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';
import { debounceTime, distinctUntilChanged, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements AfterViewInit {
  public searchText: string | null = null;
  public dataSource!: MatTableDataSource<ITask>;
  public tasks$?: Observable<ITask[]>;
  public priorities$?: Observable<IPriority[]>;
  public selectedCategory?: ICategory;

  public selectedStatusFilter: boolean | null = null;
  public selectedPriorityFilter: IPriority | null = null;

  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ViewChild(MatSort) private sort!: MatSort;

  @Input() set setTasks(tasks: Observable<ITask[]>) {
    this.tasks$ = tasks;
    this.fillTable();
  }
  @Input()
  set setPriorities(priorities: Observable<IPriority[]>) {
    this.priorities$ = priorities;
  }

  @Output() selectCategory = new EventEmitter<ICategory>();
  @Output() taskUpdated = new EventEmitter<ITask>();
  @Output() taskDeleted = new EventEmitter<ITask>();

  @Output() filterByStatus = new EventEmitter<boolean | null>();
  @Output() filterByTitle = new EventEmitter<string | null>();
  @Output() filterByPriority = new EventEmitter<IPriority | null>();

  private searchSubject: Subject<string> = new Subject<string>();

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<ITask>();
  }

  ngAfterViewInit() {
    this.fillTable();
    this.initSearchListener();
  }

  fillTable() {
    if (!this.tasks$) return;
    this.tasks$.subscribe(data => {
      this.dataSource.data = data;

      if (this.paginator) this.dataSource.paginator = this.paginator;
      if (this.sort) this.dataSource.sort = this.sort;

      this.dataSource.sortingDataAccessor = (task, sortHeaderId) => {
        switch (sortHeaderId) {
          case 'deadline':
            return task.deadline ? task.deadline.toString() : '';

          case 'priority':
            return task.priority?.title ?? '';

          case 'category':
            return task.category?.title ?? '';

          case 'title':
            return task.title;

          default:
            return task.completed ? 1 : 0;
        }
      };
    });
  }

  showTasksByCategory(category: ICategory): void {
    if (this.selectedCategory === category) return;

    this.selectedCategory = category;
    this.selectCategory.emit(category);
  }

  edit(task: ITask): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: { task, dialogTitle: 'Редактирование задачи' },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result: ITask) => {
      if (result) {
        this.taskUpdated.emit(result);
      }
    });
  }

  delete(task: ITask) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Вы действительно хотите удалить задачу?',
        dialogTitle: 'Подтвердить действие',
      },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.taskDeleted.emit(task);
      }
    });
  }

  handleCheckedCompleted(task: ITask) {
    this.taskUpdated.emit(task);
  }

  onFilterByStatus(value: boolean | null) {
    if (value !== this.selectedStatusFilter) {
      this.selectedStatusFilter = value;
      this.filterByStatus.emit(this.selectedStatusFilter);
    }
  }

  clearSearchTitleInput() {
    this.searchText = null;
    this.filterByTitle.emit(this.searchText);
  }

  onFilterByPriority(value: IPriority | null) {
    if (value !== this.selectedPriorityFilter) {
      this.selectedPriorityFilter = value;
      this.filterByPriority.emit(this.selectedPriorityFilter);
    }
  }

  onSearchTitleInputChange() {
    if (this.searchText !== null) {
      this.searchSubject.next(this.searchText);
    }
  }
  displayedColumns: string[] = [
    'completed',
    'title',
    'deadline',
    'priority',
    'category',
    'edit',
    'delete',
  ];

  private initSearchListener() {
    this.searchSubject
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe(searchStr => {
        this.filterByTitle.emit(searchStr);
      });
  }
}
