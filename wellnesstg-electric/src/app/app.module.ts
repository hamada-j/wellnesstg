import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// @angular/material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { UploadCSVComponent } from './upload-csv/upload-csv.component';
import { DataTableComponent } from './data-table/data-table.component';
import { HighChartsComponent } from './high-charts/high-charts.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UploadCSVComponent,
    DataTableComponent,
    HighChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
