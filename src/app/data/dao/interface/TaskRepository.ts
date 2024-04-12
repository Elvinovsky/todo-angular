import { CommonRepository } from './CommonRepository';
import { ICategory, IPriority, ITask } from '../../../models';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class TaskRepository extends CommonRepository<ITask> {
  abstract search(
    category?: ICategory | null,
    searchText?: string | null,
    status?: boolean | null,
    priority?: IPriority | null
  ): Observable<ITask[]>;

  abstract getCompletedCountInCategory(category: ICategory): Observable<number>;

  abstract getUncompletedCountInCategory(
    category: ICategory
  ): Observable<number>;

  abstract getTotalCountInCategory(category: ICategory): Observable<number>;

  abstract getTotalCount(): Observable<number>;
}
