import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// @angular/material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { HighChartsComponent } from './high-charts/high-charts.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

// component

import { HomeComponent } from './home/home.component';
import { UploadCSVComponent } from './upload-csv/upload-csv.component';
import { DataTableComponent } from './data-table/data-table.component';
import { Preview } from './upload-csv/upload-csv.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UploadCSVComponent,
    DataTableComponent,
    HighChartsComponent,
    Preview
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatIconModule,
    MatProgressBarModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
