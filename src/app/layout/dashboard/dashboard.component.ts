import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { SystemMeasuredDataDTO, KacoProductionService } from 'app/shared/services/KacoProductionService';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    //  styleUrls: ['./chat.component.scss']
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    ListaProduccion: SystemMeasuredDataDTO[];
    ListaSistemas: string[];
    // bar chart
    public barChartOptions: any = {
        scaleShowVerticalLines: true,
        responsive: true,
        tooltips: {
            enabled: true,
            mode: 'single',
        callbacks: {
            label: function (tooltipItem, data) {
                var label = data.labels[tooltipItem.index];
                var datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                return  datasetLabel + '%';
            }
        }
    }
    };

    public barChartLabels: string[] = [];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = false;

    public barChartData: any[] = [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Performance' },
        // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ];

    public barChartData1: any[] = []

    public colors: Array<any> =
    [
       {
            backgroundColor: '#72B972',
            borderColor: '#72B972',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
       }
    ]

    public lineChartColors: Array<any> = [
        { // grey
            backgroundColor: '#3DA73D',
            borderColor: '#3DA73D',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(100,159,177,0.8)'
        }
        // },
        // { // dark grey
        //     backgroundColor: 'rgba(77,83,96,0.2)',
        //     borderColor: 'rgba(77,83,96,1)',
        //     pointBackgroundColor: 'rgba(77,83,96,1)',
        //     pointBorderColor: '#fff',
        //     pointHoverBackgroundColor: '#fff',
        //     pointHoverBorderColor: 'rgba(105,83,96,1)'
        // },
        // { // grey
        //     backgroundColor: 'rgba(148,159,177,0.2)',
        //     borderColor: 'rgba(148,159,177,1)',
        //     pointBackgroundColor: 'rgba(148,159,177,1)',
        //     pointBorderColor: '#fff',
        //     pointHoverBackgroundColor: '#fff',
        //     pointHoverBorderColor: 'rgba(100,159,177,0.8)'
        // }
    ];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    // events
    public chartClicked(e: any, datasets): void {
         console.log(e);
    }

    public chartHovered(e: any): void {
        //  console.log(e);
    }



    constructor(private _kacoService: KacoProductionService, public _router: Router) {
    }

    ngOnInit() {
         this._kacoService.ObtenerDatosProduccion().subscribe((result) => {
            //  console.log(result);
             this.ListaSistemas = [];
             result.forEach(element => {
                 this.ListaSistemas.push(element.Nombre);
                 this.barChartLabels.push(element.Nombre);
                 this.barChartData1.push(element.Performance);
                 this.barChartData.push(element.Performance);
             });
             this.ListaProduccion = result;
             this.barChartLabels = this.ListaSistemas;
             this.barChartData = this.barChartData1;

            //  console.log(this.barChartData)
            //  console.log(this.barChartLabels);
         }, error => {
         });
    }

    public closeAlert(alert: any) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
