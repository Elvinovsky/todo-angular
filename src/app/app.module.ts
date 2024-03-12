import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTooltip } from '@angular/material/tooltip';
import { CategoriesComponent } from './components/categories/categories.component';
import { HttpService } from './services/http.service';
import { TasksComponent } from './components/tasks/tasks.component';
import { FormsModule } from '@angular/forms';
import {
  CdkColumnDef,
  CdkHeaderCell,
  CdkHeaderCellDef,
} from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@NgModule({
  declarations: [AppComponent, CategoriesComponent, TasksComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatTooltip,
    FormsModule,
    CdkHeaderCell,
    CdkColumnDef,
    CdkHeaderCellDef,
    MatTableModule,
    MatCheckbox,
    MatIcon,
    MatIconButton,
  ],
  providers: [provideAnimationsAsync(), HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
