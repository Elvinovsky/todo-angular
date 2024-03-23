import { CommonDAO } from './CommonDAO';
import { ICategory } from '../../../models';
import { Observable } from 'rxjs';

export abstract class CategoryDAO extends CommonDAO<ICategory> {
  abstract search(title: string): Observable<ICategory | null>;
}
