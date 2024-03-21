import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ICategory } from '../../../data/types';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  selectedCategory = {} as ICategory;
  public categories: ICategory[] = [];
  constructor(private readonly httpService: DataService) {}
  ngOnInit() {
    this.httpService.categorySubject.subscribe(
      categories => (this.categories = categories)
    );
  }

  trackByFn(index: number, category: ICategory) {
    return category.id;
  }

  showTasksByCategory(category: ICategory) {
    this.selectedCategory = category;
    return this.httpService.fillTasksByCategories(category);
  }
}
