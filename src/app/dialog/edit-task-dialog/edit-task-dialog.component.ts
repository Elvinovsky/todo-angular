import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICategory, IPriority, ITask } from '../../models';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css'],
})
export class EditTaskDialogComponent implements OnInit {
  public dialogTitle!: string;
  public tmpTitle!: string;
  public task!: ITask;
  public categories!: ICategory[];
  public priorities!: IPriority[];
  public tmpPriority?: IPriority;
  public tmpCategory?: ICategory;
  public tmpDeadline?: Date;

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: ITask; dialogTitle: string }
  ) {
    this.dataService.getAllCategories().subscribe(res => {
      this.categories = res;
    });

    this.dataService.getAllPriorities().subscribe(res => {
      this.priorities = res;
    });
  }

  ngOnInit(): void {
    this.task = this.data.task;
    this.dialogTitle = this.data.dialogTitle;
    this.tmpTitle = this.task.title;

    this.tmpDeadline = this.task.deadline;
    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;
  }

  onConfirm(): void {
    this.task.title = this.tmpTitle;
    this.task.deadline = this.tmpDeadline;
    this.task.priority = this.tmpPriority;
    this.task.category = this.tmpCategory;

    this.dialogRef.close(this.task);
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }
}
