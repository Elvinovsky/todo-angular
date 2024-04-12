import { PriorityRepository } from '../../interface/PriorityRepository';
import { Observable } from 'rxjs';
import { IPriority } from '../../../../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment.development';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PriorityApi implements PriorityRepository {
  constructor(private _httpServer: HttpClient) {}
  getById(id: string): Observable<IPriority | null> {
    return this._httpServer.get<IPriority | null>(
      environment.SERVER_URL + `/priority/find/${id}`
    );
  }

  getAll(): Observable<IPriority[]> {
    return this._httpServer.get<IPriority[]>(
      environment.SERVER_URL + `/priority`
    );
  }

  add(priority: IPriority): Observable<IPriority> {
    return this._httpServer.post<IPriority>(
      environment.SERVER_URL + `/priority`,
      {
        ...priority,
      }
    );
  }

  deleteById(id: string): Observable<boolean> {
    return this._httpServer.delete<boolean>(
      environment.SERVER_URL + `/priority/${id}`
    );
  }

  update(priority: IPriority): Observable<IPriority> {
    return this._httpServer.patch<IPriority>(
      environment.SERVER_URL + `/priority`,
      {
        ...priority,
      }
    );
  }
}
