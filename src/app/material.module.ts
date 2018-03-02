import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material';
import { MatSelectModule  } from '@angular/material';
import { MatExpansionModule } from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatCardModule, MatListModule, MatCheckboxModule, MatIconModule, MatSelectModule, MatExpansionModule],
  exports: [MatButtonModule, MatToolbarModule, MatCardModule, MatListModule, MatCheckboxModule, MatIconModule, MatSelectModule, MatExpansionModule],
})
export class MaterialModule { }