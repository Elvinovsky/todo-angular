import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { ICategory, ITask } from './models';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  title = 'todo-client-angular';
  tasks: ITask[] = [];
  categories: ICategory[] = [];
  selectedCategory?: ICategory;

  constructor(private readonly dataService: DataService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    forkJoin({
      tasks: this.dataService.getAll(),
      categories: this.dataService.getAllCategories(),
    }).subscribe({
      next: ({ tasks, categories }) => {
        this.tasks = tasks;
        this.categories = categories;
      },
      error: error => {
        // Обработка ошибки
        console.error('Failed to load data:', error);
      },
    });
  }

  onSelectCategory(category: ICategory) {
    this.selectedCategory = category;
    this.dataService.fillTasksByCategories(category).subscribe({
      next: tasks => {
        this.tasks = tasks;
      },
      error: error => {
        // Обработка ошибки
        console.error('Failed to load tasks for category:', error);
      },
    });
  }

  onUpdateTask(task: ITask) {
    console.log(task);
    this.dataService.updateTask(task).subscribe({
      next: () => {
        this.loadData();
        if (this.selectedCategory) {
          this.onSelectCategory(this.selectedCategory);
        }
      },
      error: error => {
        // Обработка ошибки
        console.error('Failed to update task:', error);
      },
    });
  }

  onDeleteTask(task: ITask) {
    this.dataService.deleteTask(task).subscribe({
      next: () => {
        this.loadData();
        if (this.selectedCategory) {
          this.onSelectCategory(this.selectedCategory);
        }
      },
      error: error => {
        // Обработка ошибки
        console.error('Failed to delete task:', error);
      },
    });
  }
}
