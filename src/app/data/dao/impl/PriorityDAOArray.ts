import { PriorityRepository } from '../interface/PriorityRepository';
import { Observable, of } from 'rxjs';
import { IPriority } from '../../../models';
import { Db } from '../../db';

export class PriorityDAOArray implements PriorityRepository {
  add(input: IPriority): Observable<IPriority> {
    Db.priorities.push(input);
    return of(input);
  }

  deleteById(id: string): Observable<boolean> {
    const index = Db.priorities.findIndex(item => item.id === id);
    if (index !== -1) {
      Db.priorities.splice(index, 1);
      return of(true);
    }
    return of(false);
  }

  getById(id: string): Observable<IPriority | null> {
    return of(Db.priorities.find(item => item.id === id) ?? null);
  }

  getAll(): Observable<IPriority[]> {
    return of(Db.priorities);
  }

  update(input: IPriority): Observable<IPriority> {
    const index = Db.tasks.findIndex(item => item.id === input.id);
    if (index) {
      Db.priorities[index] = input;
    }
    return of(Db.priorities[index]);
  }
}
