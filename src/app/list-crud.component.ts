import { Component, OnInit, Input } from '@angular/core';
import { Template } from './template';
import { Item } from './item';
import { Category} from './category';

import { ListDataService } from './list.data.service';

@Component({
    selector: `div-list-crud`,
    templateUrl: './list-crud.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [ListDataService]
})

export class ListCrudComponent {

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
    
    changeEvent(cat_id: number, item_id : number){
        console.log('entering change event');
        var _category: Category = this.list.categories[cat_id];
        var _item = _category.items[item_id];
        _item.take =! _item.take;
        _category.take = false;
        (_item.take)?  _category.items_count+=1 : _category.items_count-=1;
        (_category.items_count >= 1)? _category.has_items = true : _category.has_items = false;
        this._updateList();
    }

    toggleAll(cat_id: number, toggle: boolean): void{
        var _category: Category = this.list.categories[cat_id];
        _category.items.forEach((t: Item) => {
            toggle? _category.items_count+=1 : _category.items_count-=1; 
            t.take = toggle;
            if (toggle == false) {
                t.act = false;
                t.pack = false;
            } 
        } )
        _category.has_items = toggle;
        this._updateList();
    }

    deleteItem(cat_id: number, item_id:number): void{
        this.list.categories[cat_id].items.splice(item_id, 1);
        this._updateList();
    }

    addItem(cat_id: number, item_name: string, default_action: string): void{
        this.new_item.name = item_name;
        this.new_item.default_action = default_action;
        this.new_item.current_actions = [];
        this.list.categories[cat_id].items.push(this.new_item);
        this.new_item = new Item();
        this._updateList();
    }

    deleteCat(cat_id: number){
        this.list.categories.splice(cat_id, 1);
        this._updateList();
    }

    addCat(cat_name: string): void{
        this.new_category.name = cat_name;
        this.new_category.has_items = false;
        this.new_category.items_count = 0;
        this.new_category.take = false;
        this.new_category.items = [];
        this.list.categories.push(this.new_category);
        this.new_category = new Category();
        this._updateList();
    }

    private _updateList(){
        this._listDataService.updateList(this.list);
        //console.log("ListComponent: " + JSON.stringify(this.list, undefined, 2));
    }

    trackByFn(index, item){
        return index;
    }

}