import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Template } from './template';
import { DEFAULT_TEMPLATE } from './template-default';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json' })
};

@Injectable()
export class ListFileService{

        constructor(
            private _http: HttpClient
        ){ }
    
        loadDefault(): Promise<Template>{
            return Promise.resolve(DEFAULT_TEMPLATE);
        }

        saveList(data: Template, name: string): Observable<boolean>{
            return this._http.put<boolean>('/api/lists/' + name + '.json', data, httpOptions);
        }

        getLists(): Observable<string[]>{
            return this._http.get<string[]>('/api/lists', httpOptions);
        }

        loadList(name: string): Observable<Template>{
            return this._http.get<Template>('/api/lists/'+ name, httpOptions);
        }
}

