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
    public editmode = false;

    constructor( 
        private _listService: ListService
    ) { 
        this.list = new Template();
    }
    
    loadDefault(): void {
        this._listService.loadDefault()
            .then(list => this.list=list) ;
    }

    changeEvent(cat_id: number, item : Item){
        var _category: Category = this.list.categories[cat_id];
        item.take =! item.take;
        _category.take = false;
        (item.take)?  _category.items_count+=1 : _category.items_count-=1;
        (_category.items_count >= 1)? _category.has_items = true : _category.has_items = false;
    }

    toggleAll(cat_id: number, toggle: boolean): void{
        var _category: Category = this.list.categories[cat_id];
        _category.items.forEach((t: Item) => {
            toggle? _category.items_count+=1 : _category.items_count-=1; 
            t.take = toggle; 
            t.act = false; 
            t.pack = false } )
        _category.has_items = toggle;
    }

    filterTake(cat_id: number): Item[]{
        return this.list.categories[cat_id].items.filter(item => item.take);
    }

    filterDo(cat_id: number): Item[]{
        return this.list.categories[cat_id].items.filter(item => item.act);
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