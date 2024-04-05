import { HttpClient, HttpParams } from '@angular/common/http';
import { CategoryRepository } from '../../interface/CategoryRepository';
import { Observable } from 'rxjs';
import { ICategory } from '../../../../models';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CategoryApi implements CategoryRepository {
  constructor(private httpServer: HttpClient) {}
  getById(id: string): Observable<ICategory | null> {
    return this.httpServer.get<ICategory | null>(
      environment.SERVER_URL + `/category/find/${id}`
    );
  }

  getAll(): Observable<ICategory[]> {
    return this.httpServer.get<ICategory[]>(
      environment.SERVER_URL + `/category`
    );
  }

  add(category: ICategory): Observable<ICategory> {
    return this.httpServer.post<ICategory>(
      environment.SERVER_URL + `/category`,
      {
        ...category,
      }
    );
  }

  deleteById(id: string): Observable<boolean> {
    return this.httpServer.delete<boolean>(
      environment.SERVER_URL + `/category/${id}`
    );
  }

  update(category: ICategory): Observable<ICategory> {
    return this.httpServer.patch<ICategory>(
      environment.SERVER_URL + `/category`,
      {
        ...category,
      }
    );
  }

  search(title: string): Observable<ICategory | null> {
    return this.httpServer.get<ICategory | null>(
      environment.SERVER_URL + `/category`,
      {
        params: new HttpParams().set('search', title),
      }
    );
  }
}
