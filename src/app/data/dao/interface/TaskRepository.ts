import { CommonRepository } from './CommonRepository';
import { ICategory, IPriority, ITask } from '../../../models';
import { Observable } from 'rxjs';

export abstract class TaskRepository extends CommonRepository<ITask> {
  abstract search(
    category?: ICategory,
    searchText?: string,
    status?: boolean,
    priority?: IPriority
  ): Observable<ITask[]>;

  abstract getCompletedCountInCategory(category: ICategory): Observable<number>;

  abstract getUncompletedCountInCategory(
    category: ICategory
  ): Observable<number>;

  abstract getTotalCountInCategory(category: ICategory): Observable<number>;

  abstract getTotalCount(): Observable<number>;
}
