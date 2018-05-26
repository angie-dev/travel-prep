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
import { HeaderComponent } from './header.component';
import { CustomActionsComponent } from './custom_actions.component';

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
  declarations: [ AppComponent, ListComponent, HeaderComponent, CustomActionsComponent ],
  providers: [ ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
