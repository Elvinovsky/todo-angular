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
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditTaskDialogComponent } from './dialog/edit-task-dialog/edit-task-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatOptionModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { TaskRepository } from './data/dao/interface/TaskRepository';
import { CategoryRepository } from './data/dao/interface/CategoryRepository';
import { PriorityRepository } from './data/dao/interface/PriorityRepository';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { DateFormatPipe } from './pipe/date-format.pipe';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { TaskApi } from './data/dao/impl/server/TaskApi';
import { CategoryApi } from './data/dao/impl/server/CategoryApi';
import { PriorityApi } from './data/dao/impl/server/PriorityApi';

registerLocaleData(localeRu);
@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent,
    EditTaskDialogComponent,
    ConfirmDialogComponent,
    DateFormatPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    DataService,
    { provide: TaskRepository, useClass: TaskApi },
    { provide: CategoryRepository, useClass: CategoryApi },
    { provide: PriorityRepository, useClass: PriorityApi },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
