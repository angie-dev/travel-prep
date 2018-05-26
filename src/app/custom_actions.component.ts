import { Component, OnInit, Input } from '@angular/core';
import { Template } from './template';

import { ListDataService } from './list.data.service';

@Component({
    selector: `div-custom-actions`,
    templateUrl: './custom_actions.component.html',
    providers: [ListDataService]
})

export class CustomActionsComponent implements OnInit {

    @Input() list: Template;

    public new_custom_action: any;

    constructor( private _listDataService: ListDataService) {
        this.new_custom_action = new Object();
        this.new_custom_action = null;
    }

    ngOnInit(){
        this._listDataService.currentList$.subscribe( list => this.list = list);
        this._updateList();
    }
 
    addCustomAction(custom_action: string): void{
        this.list.custom_actions.push({name: custom_action, done: false}) && this._updateList();
        this.new_custom_action = null; 
    }

    removeCustomAction(custom_action_id: number): void{
        this.list.custom_actions.splice(custom_action_id, 1) && this._updateList();
    }

    private _updateList(){
        this._listDataService.updateList(this.list);
        //console.log('CustomActions: ' + JSON.stringify(this.list, undefined, 2));
    }

}