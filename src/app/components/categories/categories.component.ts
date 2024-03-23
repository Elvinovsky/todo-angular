import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ICategory } from '../../models';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  selectedCategory = {} as ICategory;
  @Input({ required: true }) categories!: ICategory[];
  constructor(private readonly httpService: DataService) {}
  ngOnInit() {
    // this.httpService
    //   .getAllCategories()
    //   .subscribe(categories => (this.categories = categories));
  }

  trackByFn(index: number, category: ICategory) {
    return category.id;
  }

  showTasksByCategory(category: ICategory): void {
    // this.selectedCategory = category;
    // this.httpService.fillTasksByCategories(category);
  }
}
