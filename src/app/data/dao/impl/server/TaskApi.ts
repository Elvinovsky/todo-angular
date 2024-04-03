import { TaskRepository } from '../../interface/TaskRepository';
import { Observable, of } from 'rxjs';
import { ICategory, IPriority, ITask } from '../../../../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
import { Db } from '../../../db';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskApi implements TaskRepository {
  constructor(private httpServer: HttpClient) {}
  getById(id: string): Observable<ITask | null> {
    return this.httpServer.get<ITask | null>(
      environment.SERVER_URL + `/tasks/${id}`
    );
  }

  getAll(): Observable<ITask[]> {
    return this.httpServer.get<ITask[]>(environment.SERVER_URL + `/tasks`);
  }

  add(task: ITask): Observable<ITask> {
    return this.httpServer.post<ITask>(environment.SERVER_URL + `/tasks`, {
      ...task,
    });
  }

  deleteById(id: string): Observable<boolean> {
    return this.httpServer.delete<boolean>(
      environment.SERVER_URL + `/tasks/${id}`
    );
  }

  update(task: ITask): Observable<ITask> {
    return this.httpServer.put<ITask>(environment.SERVER_URL + `/tasks`, {
      id: task.id,
      title: task.title,
      completed: task.completed,
      priorityId: task.priority?.id,
      categoryId: task.category?.id,
      deadline: task?.deadline,
    });
  }

  search(
    category?: ICategory,
    searchText?: string,
    status?: boolean,
    priority?: IPriority
  ): Observable<ITask[]> {
    return this.httpServer.get<ITask[]>(
      environment.SERVER_URL +
        `/tasks?
        ${category ? `categoryId=${category.id}&` : ''}
        ${searchText ? `title=${searchText}&` : ''}
        ${status ? `status=${status}&` : ''}
        ${priority ? `priorityId=${priority.id}` : ''}`
    );
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
}
