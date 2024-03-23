import { Injectable } from '@angular/core';
import { ICategory } from '../models';
import { Db } from '../data/db';
import { TaskDAOArray } from '../data/dao/impl/TaskDAOArray';
import { CategoryDAOArray } from '../data/dao/impl/CategoryDAOArray';

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
  constructor(
    private taskDAOArray: TaskDAOArray,
    private categoryDAOArray: CategoryDAOArray
  ) {}

  getAllCategories() {
    return this.categoryDAOArray.getAll();
  }

  getAll() {
    return this.taskDAOArray.getAll();
  }

  fillTasksByCategories(category: ICategory) {
    return this.taskDAOArray.search(category);
  }

  toggleCompletedTask(id: number, completed: boolean) {
    const index = Db.tasks.findIndex(item => item.id === id);
    console.log(Db.tasks[index]);
    if (index !== -1) {
      Db.tasks[index].completed = completed;
    }
  }
}
