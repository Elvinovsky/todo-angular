import { CommonRepository } from './CommonRepository';
import { ICategory } from '../../../models';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class CategoryRepository extends CommonRepository<ICategory> {
  abstract search(title: string): Observable<ICategory | null>;
}
