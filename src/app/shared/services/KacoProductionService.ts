import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs/Observable';
import { Injectable, Inject, Optional, OpaqueToken } from '@angular/core';
import { Http, Headers, ResponseContentType, Response } from '@angular/http';

import * as moment from 'moment';
export const API_BASE_URL = new OpaqueToken('API_BASE_URL');

@Injectable()
export class KacoProductionService {
    handleError: any;
    private http: Http;
    private baseUrl: string;
    private baseUrlLogin: string;
    protected jsonParseReviver: (key: string, value: any) => any = undefined;

    // tslint:disable-next-line:max-line-length
    constructor(@Inject(Http) http: Http, @Optional() @Inject(API_BASE_URL) baseUrl?: string, @Optional() @Inject(API_BASE_URL) _baseUrlLogin?: string) {
        this.http = http;
        this.baseUrl = baseUrl ? baseUrl : 'http://localhost:59505';
        this.baseUrlLogin = _baseUrlLogin;
        // tslint:disable-next-line:prefer-const
        let prueba: string;
    }

 ObtenerDatosProduccion(): Observable<SystemMeasuredDataDTO[]>
 // tslint:disable-next-line:one-line
 {
    let url = this.baseUrl + '/api/ImportProductionData/System/Production';
    url = url.replace(/[?&]$/, '');

    const options_ = {
        method: 'get',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Aplication-Language': 'application/json',
            'Authorization': 'bearer ' + sessionStorage.getItem('access_token')
        })
    };
    return this.http.request(url, options_).flatMap((response_) => {
        return this.processProduction(response_);
    }).catch((response_: any) => {
        if (response_ instanceof Response) {
            try {
                return this.processProduction(response_);
            } catch (e) {
                return <Observable<SystemMeasuredDataDTO[]>><any>Observable.throw(e);
            }
        // tslint:disable-next-line:curly
        } else
            return <Observable<SystemMeasuredDataDTO[]>><any>Observable.throw(response_);
    });
}


protected processProduction(response: Response): Observable<SystemMeasuredDataDTO[]> {
    const status = response.status;

    const _headers: any = response.headers ? response.headers.toJSON() : {};
    if (status === 200) {
        const _responseText = response.text();
        let result200: any = null;
        const resultData200 = _responseText === '' ? null : JSON.parse(_responseText, this.jsonParseReviver);
        if (resultData200 && resultData200.constructor === Array) {
            result200 = [];
            // tslint:disable-next-line:curly
            for (const item of resultData200)
                result200.push(SystemMeasuredDataDTO.fromJS(item));
        }
        return Observable.of(result200);
    } else if (status !== 200 && status !== 204) {
        const _responseText = response.text();
        return throwException('An unexpected server error occurred.', status, _responseText, _headers);
    }
    return Observable.of<SystemMeasuredDataDTO[]>(<any>null);
}

}

export interface ISystemMeasuredDataDTO {
    Id: string;
    SystemId: string;
    Performance: string;
    EnergyYesterday: string;
    ValueEnergyYesterday: string;
    EnergyLatest: string;
    ValueEnergyLatest: string;
    Nombre: string;
}

export class SystemMeasuredDataDTO implements ISystemMeasuredDataDTO {

    Id: string;
    SystemId: string;
    Performance: string;
    EnergyYesterday: string;
    ValueEnergyYesterday: string;
    EnergyLatest: string;
    ValueEnergyLatest: string;
    Nombre: string;
    constructor(data?: ISystemMeasuredDataDTO) {
        if (data) {
            // tslint:disable-next-line:prefer-const
            for (let property in data) {
                // tslint:disable-next-line:curly
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }


        init(data ?: any) {
            if (data) {
                this.Id = data['Id'];
                this.SystemId = data['SystemId'];
                this.Performance = data['Performance'];
                this.EnergyYesterday = data['EnergyYesterday'];
                this.ValueEnergyYesterday = data['ValueEnergyYesterday'];
                this.EnergyLatest = data['EnergyLatest'];
                this.ValueEnergyLatest = data['ValueEnergyLatest'];
                this.Nombre = data['Nombre'];
            }
        }

    // tslint:disable-next-line:member-ordering
    static fromJS(data: any): SystemMeasuredDataDTO {
        const result = new SystemMeasuredDataDTO();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['Id'] = this.Id;
        data['Performance'] = this.Performance;
        data['EnergyYesterday'] = this.EnergyYesterday;
        data['ValueEnergyYesterday'] = this.ValueEnergyYesterday;
        data['EnergyLatest'] = this.EnergyLatest;
        data['ValueEnergyLatest'] = this.ValueEnergyLatest;
        data['Nombre'] = this.Nombre;
        return data; }
}

export class SwaggerException extends Error {
    message: string;
    status: number;
    response: string;
	// tslint:disable-next-line:indent
	headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
		// tslint:disable-next-line:indent
		super();

        this.message = message;
        this.status = status;
        this.response = response;
		// tslint:disable-next-line:indent
		this.headers = headers;
        this.result = result;
    }

    // tslint:disable-next-line:member-ordering
    protected isSwaggerException = true;

    // tslint:disable-next-line:member-ordering
    static isSwaggerException(obj: any): obj is SwaggerException {
        return obj.isSwaggerException === true;
    }
}

// tslint:disable-next-line:max-line-length
function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): Observable<any> {
    // tslint:disable-next-line:curly
    if (result !== null && result !== undefined)
        return Observable.throw(result);
    // tslint:disable-next-line:curly
    else
        return Observable.throw(new SwaggerException(message, status, response, headers, null));
}

function blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
        const reader = new FileReader();
        reader.onload = function() {
            observer.next(this.result);
            observer.complete();
        }
        reader.readAsText(blob);
    });
}
