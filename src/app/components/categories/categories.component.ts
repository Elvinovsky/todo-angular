import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategory } from '../../models';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditCategoryDialogComponent } from '../../dialog/edit-category-dialog/edit-category-dialog.component';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent {
  public indexMouseMove: string | null = null;
  public selectedCategory: ICategory | null = null;

  @Input() categories$!: Observable<ICategory[]>;
  @Input() set setCategory(category: ICategory | null) {
    this.selectedCategory = category;
  }

  @Output() selectCategory = new EventEmitter<ICategory>();
  @Output() updateCategory = new EventEmitter<ICategory>();
  @Output() deleteCategory = new EventEmitter<ICategory>();
  constructor(public dialog: MatDialog) {}

  trackByFn(index: number, category: ICategory) {
    return category.id;
  }

  showTasksByCategory(category: ICategory): void {
    if (this.selectedCategory === category) return;

    this.selectedCategory = category;
    this.selectCategory.emit(category);
  }

  showAllTasks(): void {
    if (!this.selectedCategory) return;

    this.selectedCategory = null;
    this.selectCategory.emit();
  }

  edit(category: ICategory) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      data: { category, dialogTitle: 'Редактирование категории' },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result: ICategory) => {
      if (result) {
        this.updateCategory.emit(result);
      }
    });
  }

  delete(category: ICategory) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Вы действительно хотите удалить категорию?',
        dialogTitle: 'Подтвердить действие',
      },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteCategory.emit(category);
      }
    });
  }

  showEditIcon(index: string | null) {
    this.indexMouseMove = index;
  }
}
