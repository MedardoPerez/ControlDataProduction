import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { SystemMeasuredDataDTO, KacoProductionService } from 'app/shared/services/KacoProductionService';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';



@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.scss'],
    animations: [routerTransition()]
})
export class BlankPageComponent implements OnInit {
    ListaProduccion: SystemMeasuredDataDTO[];


    constructor(private _kacoService: KacoProductionService, public _router: Router) {
    }

    ngOnInit() {
        this._kacoService.ObtenerDatosProduccion().subscribe((result) => {
            // console.log(result);
            this.ListaProduccion = result;

            this.ListaProduccion.forEach(element => {
                console.log(element.Nombre);
                console.log(element.SystemId);
                console.log(element.Performance);
            });
        }, error => {
            //  console.log(error.status)
            if (error.status == '401') {
                // console.log(error.status);
                // console.log(error.response);
                sessionStorage.clear();
                localStorage.setItem('isLoggedin', 'false');
                this._router.navigate(['/login']);
            }
        });
    }
}
