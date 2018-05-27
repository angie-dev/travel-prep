import { Injectable } from '@angular/core';
import { DEFAULT_TEMPLATE } from './template-default';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Template } from './template';

@Injectable()
export class ListDataService{

    private _listSource = new BehaviorSubject<Template>(DEFAULT_TEMPLATE);

    currentList$ = this._listSource.asObservable();

    constructor(){ }

    updateList(list: Template){
        this._listSource.next(list);
        //console.log("DataService: " + JSON.stringify(list, undefined, 2 ));
    }

}