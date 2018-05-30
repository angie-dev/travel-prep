import { Component, Input } from '@angular/core';
import { Template } from './template';
import { Item } from './item';

import { ListDataService } from './list.data.service';

@Component({
    selector: `div-item-actions`,
    templateUrl: './list-item_actions.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [ListDataService]
})

export class ListItemActionsComponent {

    @Input() list: Template;
    public new_current_action: any;

    constructor( private _listDataService: ListDataService ) { 
        this._listDataService.currentList$.subscribe(list => this.list = list);
    }

    filterDo(cat_id: number): Item[]{
        return this.list.categories[cat_id].items.filter(item => item.act);
    }

    testFilterDo(cat_id: number): boolean{
        return this.list.categories[cat_id].items.some(item => item.act);
    }

    deleteActionFromItem(cat_id: number, item_id: number, action_id: number): void{
        this.list.categories[cat_id].items[item_id].current_actions.splice(action_id, 1);
        this._updateList();
    }

    private _updateList(){
        this._listDataService.updateList(this.list);
    }

}