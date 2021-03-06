import { Component, OnInit, Input } from '@angular/core';
import { Template } from './template';
import { Item } from './item';
import { Category} from './category';

import { ListCrudComponent } from './list-crud.component';
import { ListTakeComponent } from './list-take.component';
import { ListItemActionsComponent } from './list-item_actions.component';
import { ListCustomActionsComponent } from './list-custom_actions.component';

import { ListDataService } from './list.data.service';

@Component({
    selector: `my-list`,
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [ListDataService]
})

export class ListComponent {

    @Input() list: Template;
    
    public new_current_action;
    public editmode = false;
    public new_item: Item;
    public new_category: Category;

    constructor( private _listDataService: ListDataService ) { 
        this._listDataService.currentList$.subscribe(list => this.list = list);
        this.new_item = new Item();
        this.new_category = new Category();
    }

    private _updateList(){
        this._listDataService.updateList(this.list);
        //console.log("ListComponent: " + JSON.stringify(this.list, undefined, 2));
    }

}