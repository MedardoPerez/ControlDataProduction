import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BsElementRoutingModule } from './bs-element-routing.module';
import { BsElementComponent } from './bs-element.component';
import { PageHeaderModule } from './../../shared';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

@NgModule({
    imports: [
        CommonModule,
        BsElementRoutingModule,
        PageHeaderModule,
        Ng2Charts,
    ],
    declarations: [BsElementComponent]
})
export class BsElementModule { }
