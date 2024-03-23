import { Observable } from 'rxjs';

export abstract class CommonDAO<T> {
  abstract add(T: T): Observable<T>;
  abstract deleteById(id: number): Observable<T>;
  abstract update(inputModel: T): Observable<T>;
  abstract getById(id: number): Observable<T | null>;
  abstract getAll(): Observable<T[]>;
}
