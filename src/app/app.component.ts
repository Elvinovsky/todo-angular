import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { ICategory, IPriority, ITask } from './models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  title = 'todo-client-angular';
  public tasks$!: Observable<ITask[]>;
  public categories$!: Observable<ICategory[]>;
  public priorities$!: Observable<IPriority[]>;

  public selectedCategory: ICategory | null = null;
  private searchTaskText?: string | null;
  private priorityFilter?: IPriority | null;
  private statusFilter?: boolean | null;

  constructor(private readonly dataService: DataService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.tasks$ = this.dataService.getAll();
    this.categories$ = this.dataService.getAllCategories();
    this.priorities$ = this.dataService.getAllPriorities();
  }

  onSelectCategory(category: ICategory) {
    this.selectedCategory = category;
    this.updateTasks();
  }

  onFilterTasksByPriority(priority: IPriority | null) {
    this.priorityFilter = priority;
    this.updateTasks();
  }

  onUpdateCategory(category: ICategory) {
    this.dataService.updateCategory(category).subscribe({
      next: () => {
        this.updateTasks();
      },
      error: error => {
        console.error('Failed to update category:', error);
      },
    });
  }

  onDeleteCategory(category: ICategory) {
    this.dataService.deleteCategory(category).subscribe({
      next: () => {
        this.selectedCategory = null;
        this.updateTasks();
      },
      error: error => {
        console.error('Failed to update task:', error);
      },
    });
  }

  onUpdateTask(task: ITask) {
    this.dataService.updateTask(task).subscribe({
      next: () => {
        this.loadData();
        if (this.selectedCategory) {
          this.onSelectCategory(this.selectedCategory);
        }
      },
      error: error => {
        console.error('Failed to update task:', error);
      },
    });
  }

  onDeleteTask(task: ITask) {
    this.dataService.deleteTask(task).subscribe({
      next: () => {
        this.updateTasks();
        if (this.selectedCategory) {
          this.onSelectCategory(this.selectedCategory);
        }
      },
      error: error => {
        console.error('Failed to delete task:', error);
      },
    });
  }

  private updateTasks(): void {
    this.tasks$ = this.dataService.searchTasksByFilters(
      this.selectedCategory,
      this.searchTaskText,
      this.statusFilter,
      this.priorityFilter
    );
  }

  onFilterTasksByStatus($event: null | boolean) {
    this.statusFilter = $event;
    this.updateTasks();
  }

  onSearchTasksByTitle($event: string | null) {
    this.searchTaskText = $event;
    this.updateTasks();
  }
}
