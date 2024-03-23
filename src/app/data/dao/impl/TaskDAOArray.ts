import { TaskDAO } from '../interface/TaskDAO';
import { Observable, of } from 'rxjs';
import { ICategory, IPriority, ITask } from '../../../models';
import { Db } from '../../db';

export class TaskDAOArray implements TaskDAO {
  getAll(): Observable<ITask[]> {
    return of(Db.tasks);
  }

  getById(id: number): Observable<ITask | null> {
    return of(Db.tasks.find(item => item.id === id) ?? null);
  }

  add(inputModel: ITask): Observable<ITask> {
    Db.tasks.push(inputModel);
    return of(inputModel);
  }

  deleteById(id: number): Observable<ITask> {
    const index = Db.tasks.findIndex(item => item.id === id);
    if (index !== -1) {
      Db.tasks.splice(index, 1);
    }
    return of(Db.tasks[index]);
  }

  getCompletedCountInCategory(category: ICategory): Observable<number> {
    const completedTasksInCategory = Db.tasks.filter(
      item => item.completed && item.category === category
    );
    const completedCount = completedTasksInCategory.length;
    return of(completedCount);
  }

  getTotalCount(): Observable<number> {
    return of(Db.tasks.length);
  }

  getTotalCountInCategory(category: ICategory): Observable<number> {
    const completedTasksInCategory = Db.tasks.filter(
      item => item.category === category
    );
    const completedCount = completedTasksInCategory.length;
    return of(completedCount);
  }

  getUncompletedCountInCategory(category: ICategory): Observable<number> {
    const completedTasksInCategory = Db.tasks.filter(
      item => !item.completed && item.category === category
    );
    const completedCount = completedTasksInCategory.length;
    return of(completedCount);
  }

  search(
    category?: ICategory,
    searchText?: string,
    status?: boolean,
    priority?: IPriority
  ): Observable<ITask[]> {
    if (category) {
      return of(Db.tasks.filter(item => item.category?.id === category?.id));
    }
    if (searchText) {
      return of(Db.tasks.filter(item => item.title === searchText));
    }
    if (status) {
      return of(Db.tasks.filter(item => item.completed === status));
    }

    return of(Db.tasks.filter(item => item.priority === priority));
  }

  update(inputModel: ITask): Observable<ITask> {
    const index = Db.tasks.findIndex(item => item.id === inputModel.id);
    if (index) {
      Db.tasks[index] = inputModel;
    }
    return of(Db.tasks[index]);
  }
}
