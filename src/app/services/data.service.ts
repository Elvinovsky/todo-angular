import { Injectable } from '@angular/core';
import { ICategory, ITask } from '../models';
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

  fillTasksByCategories(category: ICategory) {
    return this.taskRepository.search(category);
  }

  updateTask(task: ITask) {
    console.log(task);
    return this.taskRepository.update(task);
  }

  deleteTask(task: ITask) {
    return this.taskRepository.deleteById(task.id);
  }
}
