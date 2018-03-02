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
export class ListService{

        constructor(private http:HttpClient){
            console.log("list service init"); 
        }
    
        loadDefault(): Promise<Template>{
            return Promise.resolve(DEFAULT_TEMPLATE);
        }

        saveList(data: Template, name: string){
            console.log('calling save list with ' + name + '.json');
            return this.http.post('/api/save/' + name + '.json', data, httpOptions);
        }

        getLists(){
            return this.http.get('/api/lists', httpOptions);
        }

        loadList(name: string){
            return this.http.get('/api/load/'+ name, httpOptions )
        }
}

