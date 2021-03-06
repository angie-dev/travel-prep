import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

import { AppComponent }  from './app.component';
import { ListComponent } from './list.component';
import { ListHeaderComponent } from './list-header.component';
import { ListCrudComponent } from './list-crud.component';
import { ListTakeComponent } from './list-take.component';
import { ListItemActionsComponent } from './list-item_actions.component';
import { ListCustomActionsComponent } from './list-custom_actions.component';

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  declarations: [ AppComponent, ListComponent, ListHeaderComponent, ListCrudComponent, ListTakeComponent, ListItemActionsComponent, ListCustomActionsComponent ],
  providers: [ ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
