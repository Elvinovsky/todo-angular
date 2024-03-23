import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ITask } from '../../models';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ViewChild(MatSort) private sort!: MatSort;

  @Input({ required: true }) tasks!: ITask[];
  dataSource: MatTableDataSource<ITask>;

  constructor(private readonly dataService: DataService) {
    this.dataSource = new MatTableDataSource<ITask>();
  }

  ngOnInit() {
    this.fillTable();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  handleCheckedCompleted(id: number, completed: boolean) {
    this.dataService.toggleCompletedTask(id, completed);
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
