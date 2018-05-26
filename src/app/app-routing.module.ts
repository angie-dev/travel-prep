import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { HeaderComponent } from './header.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: HeaderComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}