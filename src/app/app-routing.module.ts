import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { ListHeaderComponent } from './list-header.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ListHeaderComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}