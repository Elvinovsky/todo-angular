import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ITask } from '../../models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskDialogComponent } from '../../dialog/edit-task-dialog/edit-task-dialog.component';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit, AfterViewInit {
  public dataSource: MatTableDataSource<ITask>;
  public tasks: ITask[] = [];
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ViewChild(MatSort) private sort!: MatSort;

  @Input() set setTasks(tasks: ITask[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Output() taskUpdated = new EventEmitter<ITask>();
  @Output() taskDeleted = new EventEmitter<ITask>();

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<ITask>();
  }

  ngOnInit() {
    this.fillTable();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  edit(task: ITask): void {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: { task, dialogTitle: 'Редактирование задачи' },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result: ITask) => {
      if (result) {
        console.log(result);
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

  fillTable() {
    this.dataSource.data = this.tasks;
    this.dataSource.sortingDataAccessor = (task, sortHeaderId) => {
      switch (sortHeaderId) {
        case 'deadline':
          return task.deadline ? task.deadline.toISOString() : '';

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
}
