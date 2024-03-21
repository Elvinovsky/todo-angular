import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory, ITask } from '../../data/types';
import { Db } from '../../data/db';
import { BehaviorSubject } from 'rxjs';

export interface ITaskResponse {
  id: number;
  title: string;
  completed: boolean;
  priority?: IPriorityResponse;
  category?: string;
  deadline?: Date;
}

export interface IPriorityResponse {
  title?: string;
  color?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  tasksSubject = new BehaviorSubject<ITask[]>(Db.tasks);
  categorySubject = new BehaviorSubject<ICategory[]>(Db.categories);
  constructor(private httpClient: HttpClient) {}

  fillTasksByCategories(category: ICategory) {
    const filteredTasks = Db.tasks.filter(
      item => item.category?.id === category.id
    );
    this.tasksSubject.next(filteredTasks);
  }

  toggleCompletedTask(id: number, completed: boolean) {
    const index = Db.tasks.findIndex(item => item.id === id);
    console.log(Db.tasks[index]);
    if (index !== -1) {
      Db.tasks[index].completed = completed;
    }
  }
}
