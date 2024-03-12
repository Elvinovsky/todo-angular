import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ICategory } from '../../../data/types';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  public categories: ICategory[] = [];
  constructor(private readonly httpService: HttpService) {}
  ngOnInit() {
    this.categories = this.httpService.getCategories();
  }

  trackByFn(index: number, category: ICategory) {
    return category.id;
  }
}
