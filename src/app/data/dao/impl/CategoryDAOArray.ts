import { CategoryDAO } from '../interface/CategoryDAO';
import { Observable, of } from 'rxjs';
import { ICategory } from '../../../models';
import { Db } from '../../db';

export class CategoryDAOArray implements CategoryDAO {
  getById(id: number): Observable<ICategory | null> {
    return of(Db.categories.find(item => item.id === id) ?? null);
  }

  getAll(): Observable<ICategory[]> {
    return of(Db.categories);
  }

  add(category: ICategory): Observable<ICategory> {
    Db.categories.push(category);
    return of(category);
  }
  deleteById(id: number): Observable<ICategory> {
    const index = Db.categories.findIndex(item => item.id === id);
    if (index !== -1) {
      Db.categories.splice(index, 1);
    }
    return of(Db.categories[index]);
  }

  update(category: ICategory): Observable<ICategory> {
    const index = Db.tasks.findIndex(item => item.id === category.id);
    if (index) {
      Db.categories[index] = category;
    }
    return of(Db.categories[index]);
  }

  search(title: string): Observable<ICategory | null> {
    return of(Db.categories.find(item => item.title === title) ?? null);
  }
}
