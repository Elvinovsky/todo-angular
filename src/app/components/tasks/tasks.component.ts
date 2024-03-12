import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ITask } from '../../../data/types';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
})
export class TasksComponent implements OnInit {
  public tasks: ITask[] = [];

  public displayedColumns: string[] = [
    'completed',
    'title',
    'deadline',
    'priority',
    'category',
    'id',
  ];
  constructor(private readonly httpService: HttpService) {}

  ngOnInit() {
    this.tasks = this.httpService.getTasks();
  }

  trackByFn(index: number, category: ITask) {
    return category.id;
  }
  handleCheckedCompleted1(id: number, completed: boolean) {
    const index = this.tasks.findIndex(item => item.id === id);
    console.log(index);
    if (index !== -1) {
      this.tasks[index].completed = completed;
    }
  }
  handleCheckedCompleted(id: number, completed: boolean) {
    this.tasks = this.tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed }; // Используйте оператор расширения для создания нового объекта с обновленным свойством
      }
      return task;
    });
  }
}
