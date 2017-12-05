import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlankPageRoutingModule } from './blank-page-routing.module';
import { BlankPageComponent } from './blank-page.component';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { PageHeaderModule } from '../../shared';

@NgModule({
  imports: [
    CommonModule,
    Ng2Charts,
    BlankPageRoutingModule
  ],
  declarations: [BlankPageComponent]
})
export class BlankPageModule { }
