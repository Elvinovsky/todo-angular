import { Injectable } from '@angular/core';
import { Db } from '../../data/db';
import { ICategory, ITask } from '../../data/types';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor() {}

  getCategories(): ICategory[] {
    return Db.categories;
  }

  getTasks(): ITask[] {
    return Db.tasks;
  }
}
