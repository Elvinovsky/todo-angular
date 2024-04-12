import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICategory } from '../../models';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.css'],
})
export class EditCategoryDialogComponent implements OnInit {
  public dialogTitle!: string;
  public category!: ICategory;
  public tmpCategoryTitle!: string;

  constructor(
    public dialogRef: MatDialogRef<EditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { category: ICategory; dialogTitle: string }
  ) {}

  ngOnInit(): void {
    this.dialogTitle = this.data.dialogTitle;
    this.category = this.data.category;
    this.tmpCategoryTitle = this.category.title;
  }

  onConfirm(): void {
    if (this.category.title === this.tmpCategoryTitle) {
      this.dialogRef.close(null);
      return;
    }

    this.category.title = this.tmpCategoryTitle;

    this.dialogRef.close(this.category);
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }
}
