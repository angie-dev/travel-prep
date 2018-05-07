import { Component, OnInit } from '@angular/core';
import { Template } from './template';
import { ListService } from './list.service';
import { Item } from './item';
import { Category} from './category';

@Component({
    selector: `my-list`,
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers: [ListService]
})

export class ListComponent implements OnInit {

    public list;
    public result;
    public list_name;
    public saved_lists;
    public new_action;
    public editmode = false;
    public new_item: Item;
    public new_category: Category;

    constructor( 
        private _listService: ListService
    ) { 
        this.list = new Template();
        this.new_item = new Item();
        this.new_category = new Category();
    }
    
    loadDefault(): void {
        this._listService.loadDefault()
            .then(list => this.list=list) ;
    }

    changeEvent(cat_id: number, item_id : number){
        console.log('entering change event');
        var _category: Category = this.list.categories[cat_id];
        var _item = _category.items[item_id];
        _item.take =! _item.take;
        _category.take = false;
        (_item.take)?  _category.items_count+=1 : _category.items_count-=1;
        (_category.items_count >= 1)? _category.has_items = true : _category.has_items = false;
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
    }

    filterTake(cat_id: number): Item[]{
        return this.list.categories[cat_id].items.filter(item => item.take);
    }

    filterDo(cat_id: number): Item[]{
        return this.list.categories[cat_id].items.filter(item => item.act);
    }

    testFilterDo(cat_id: number): boolean{
        return this.list.categories[cat_id].items.some(item => item.act);
    }

    deleteItem(cat_id: number, item_id:number): void{
        this.list.categories[cat_id].items.splice(item_id, 1);
    }

    addItem(cat_id: number, item_name: string, default_action: string): void{
        this.new_item.name = item_name;
        this.new_item.default_action = default_action;
        this.list.categories[cat_id].items.push(this.new_item);
        this.new_item = new Item();
    }

    deleteCat(cat_id: number){
        this.list.categories.splice(cat_id, 1);
    }

    addCat(cat_name: string): void{
        this.new_category.name = cat_name;
        this.list.categories.push(this.new_category);
        this.new_category = new Category();
    }

    addCustomAction(custom_action: string): void{
        this.new_action = new Object();
        this.new_action.name = custom_action;
        this.list.custom_actions.push(this.new_action);
        this.new_action = null;
    }

    removeCustomAction(custom_action_id: number): void{
        this.list.custom_actions.splice(custom_action_id, 1);
    }

    trackByFn(index, item){
        return index;
    }

    ngOnInit(): void{
        this.loadDefault();
        this.getLists();
        this.list_name = 'default-list';
    }

    showMe(): void{
        document.getElementById("json").innerHTML = JSON.stringify(this.list, undefined, 2);
    }

    loadList(name: string): void{
        this._listService.loadList(name).subscribe(
            data => { console.log(data) ; this.list = data ; this.list_name = name.split(".", 2)[0]},
            err => { console.log(err); },
            () => console.log('retrieved list ' + this.list)
        );
    }

    saveList(name : string): void{
        var savedlist;
        this._listService.saveList(this.list, name).subscribe(
            data => { savedlist = data},
            err => { console.log(err) ; this.result = false },
            () => { console.log('done calling save API ' + savedlist) ; this.result = true}
        );
    }

    getLists(){
        this._listService.getLists().subscribe(
            data => { this.saved_lists = data },
            err => console.log(err),
            () => console.log('done retrieving lists: ' + this.saved_lists)
        );
    }

}