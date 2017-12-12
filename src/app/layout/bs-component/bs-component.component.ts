import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { SystemMeasuredDataDTO, KacoProductionService } from 'app/shared/services/KacoProductionService';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-bs-component',
    templateUrl: './bs-component.component.html',
    styleUrls: ['./bs-component.component.scss'],
    animations: [routerTransition()]
})
// tslint:disable-next-line:one-line
export class BsComponentComponent implements OnInit{
    ListaProduccion: SystemMeasuredDataDTO[];
    ListaSistemas: string[];

    public lineChartData: Array<any> = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
        { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
    ];
    public lineChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions: any = {
        responsive: true
    };
    public lineChartColors: Array<any> = [
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // dark grey
            backgroundColor: 'rgba(77,83,96,0.2)',
            borderColor: 'rgba(77,83,96,1)',
            pointBackgroundColor: 'rgba(77,83,96,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(77,83,96,1)'
        },
        { // grey
            backgroundColor: 'rgba(148,159,177,0.2)',
            borderColor: 'rgba(148,159,177,1)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    constructor(private _kacoService: KacoProductionService, public _router: Router) {
        this.lineChartData.push({ data: [71, 60, 83, 79, 58, 56, 45], label: 'Series D' })
    }

    ngOnInit(): void {
        this._kacoService.ObtenerDatosProduccion().subscribe((result) => {

        // tslint:disable-next-line:member-ordering
        }, error => {
            //  console.log(error.status)
            if (error.status === '401') {
                // console.log(error.status);
                // console.log(error.response);
                sessionStorage.clear();
                localStorage.setItem('isLoggedin', 'false');
                this._router.navigate(['/login']);
            }
        });
    }
}
