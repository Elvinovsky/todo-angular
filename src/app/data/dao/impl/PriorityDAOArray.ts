import { PriorityDAO } from '../interface/PriorityDAO';
import { Observable, of } from 'rxjs';
import { IPriority } from '../../../models';
import { Db } from '../../db';

export class PriorityDAOArray implements PriorityDAO {
  add(input: IPriority): Observable<IPriority> {
    Db.priorities.push(input);
    return of(input);
  }

  deleteById(id: number): Observable<IPriority> {
    const index = Db.priorities.findIndex(item => item.id === id);
    if (index !== -1) {
      Db.priorities.splice(index, 1);
    }
    return of(Db.priorities[index]);
  }

  getById(id: number): Observable<IPriority | null> {
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
