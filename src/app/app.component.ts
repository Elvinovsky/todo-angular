import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { ICategory, ITask } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent implements OnInit {
  title = 'todo-client-angular';
  tasks!: ITask[];
  categories: ICategory[] = [];
  selectedCategory?: ICategory;
  constructor(private readonly dataService: DataService) {}
  ngOnInit() {
    this.dataService.getAll().subscribe(tasks => {
      this.tasks = tasks;
    });
    this.dataService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onSelectCategory($event: ICategory) {
    this.selectedCategory = $event;

    this.dataService
      .fillTasksByCategories(this.selectedCategory)
      .subscribe(tasks => (this.tasks = tasks));
  }

  onUpdateTask($event: ITask) {
    console.log($event);
  }
}
