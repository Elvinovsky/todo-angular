import { Injectable } from '@angular/core';
import { ICategory, IPriority, ITask } from '../models';
import { TaskRepository } from '../data/dao/interface/TaskRepository';
import { CategoryRepository } from '../data/dao/interface/CategoryRepository';
import { PriorityRepository } from '../data/dao/interface/PriorityRepository';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private taskRepository: TaskRepository,
    private categoryRepository: CategoryRepository,
    private priorityRepository: PriorityRepository
  ) {}

  getAllCategories() {
    return this.categoryRepository.getAll();
  }

  getAllPriorities() {
    return this.priorityRepository.getAll();
  }
  getAll() {
    return this.taskRepository.getAll();
  }

  searchTasksByFilters(
    category?: ICategory | null,
    searchText?: string | null,
    status?: boolean | null,
    priority?: IPriority | null
  ) {
    return this.taskRepository.search(category, searchText, status, priority);
  }

  updateTask(task: ITask) {
    return this.taskRepository.update(task);
  }

  deleteTask(task: ITask) {
    return this.taskRepository.deleteById(task.id);
  }

  updateCategory(category: ICategory) {
    return this.categoryRepository.update(category);
  }

  deleteCategory(category: ICategory) {
    return this.categoryRepository.deleteById(category.id);
  }
}
