import { Observable } from 'rxjs';

export abstract class CommonRepository<T> {
  abstract add(T: T): Observable<T>;
  abstract deleteById(id: string): Observable<boolean>;
  abstract update(inputModel: T): Observable<T>;
  abstract getById(id: string): Observable<T | null>;
  abstract getAll(): Observable<T[]>;
}
