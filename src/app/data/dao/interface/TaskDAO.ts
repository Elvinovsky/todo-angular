import { CommonDAO } from './CommonDAO';
import { ICategory, IPriority, ITask } from '../../../models';
import { Observable } from 'rxjs';

export abstract class TaskDAO extends CommonDAO<ITask> {
  abstract search(
    category: ICategory,
    searchText: string,
    status: boolean,
    priority: IPriority
  ): Observable<ITask[]>;

  abstract getCompletedCountInCategory(category: ICategory): Observable<number>;

  abstract getUncompletedCountInCategory(
    category: ICategory
  ): Observable<number>;

  abstract getTotalCountInCategory(category: ICategory): Observable<number>;

  abstract getTotalCount(): Observable<number>;
}
