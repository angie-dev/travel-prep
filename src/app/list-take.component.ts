import { Component, OnInit, Input } from '@angular/core';
import { Template } from './template';
import { Item } from './item';
import { Category} from './category';

import { ListDataService } from './list.data.service';

@Component({
    selector: `div-list-take`,
    templateUrl: './list-take.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [ListDataService]
})

export class ListTakeComponent {

    @Input() list: Template;
    public new_current_action;

    constructor( private _listDataService: ListDataService ) { 
        this._listDataService.currentList$.subscribe(list => this.list = list);

    }
   
    filterTake(cat_id: number): Item[]{
        return this.list.categories[cat_id].items.filter(item => item.take);
    }

    addActionToItem(item: Item, action: string): void{
        action? this.new_current_action = action: this.new_current_action = item.default_action;
        item.current_actions.push({name: this.new_current_action, done: false});
        this.new_current_action = item.default_action;
        item.act = true;
        this._updateList();
    }

    private _updateList(){
        this._listDataService.updateList(this.list);
        //console.log("ListComponent: " + JSON.stringify(this.list, undefined, 2));
    }

}