import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategory } from '../../models';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  @Input({ required: true }) categories!: ICategory[];

  @Output()
  selectCategory = new EventEmitter<ICategory>();

  selectedCategory?: ICategory;

  trackByFn(index: number, category: ICategory) {
    return category.id;
  }

  showTasksByCategory(category: ICategory): void {
    if (this.selectedCategory === category) {
      return;
    }

    this.selectedCategory = category;

    this.selectCategory.emit(category);
  }
}
