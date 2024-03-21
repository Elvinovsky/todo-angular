import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ITask } from '../../../data/types';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit, AfterViewInit {
  public tasks: ITask[] = [];

  protected dataSource: MatTableDataSource<ITask> =
    new MatTableDataSource<ITask>();

  @ViewChild(MatPaginator, { static: false }) private paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) private sort!: MatSort;

  constructor(private readonly httpService: DataService) {}

  ngOnInit() {
    this.httpService.tasksSubject.subscribe(tasks => {
      this.tasks = tasks;
      this.refreshTable();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  handleCheckedCompleted(id: number, completed: boolean) {
    this.httpService.toggleCompletedTask(id, completed);
  }

  refreshTable() {
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

  protected displayedColumns: string[] = [
    'completed',
    'title',
    'deadline',
    'priority',
    'category',
    'edit',
    'delete',
  ];
}
