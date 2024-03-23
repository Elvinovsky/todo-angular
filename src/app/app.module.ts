import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CategoriesComponent } from './components/categories/categories.component';
import { DataService } from './services/data.service';
import { TasksComponent } from './components/tasks/tasks.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginator } from '@angular/material/paginator';
import { TaskDAOArray } from './data/dao/impl/TaskDAOArray';
import { CategoryDAOArray } from './data/dao/impl/CategoryDAOArray';
import { PriorityDAOArray } from './data/dao/impl/PriorityDAOArray';

@NgModule({
  declarations: [AppComponent, CategoriesComponent, TasksComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatCheckbox,
    MatIcon,
    MatIconButton,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatPaginator,
  ],
  providers: [
    provideAnimationsAsync(),
    DataService,
    TaskDAOArray,
    CategoryDAOArray,
    PriorityDAOArray,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
