import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTooltip } from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [BrowserModule, AppRoutingModule, MatSlideToggleModule, MatTooltip],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
