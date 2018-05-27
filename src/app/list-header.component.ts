import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Template } from './template';
import { ListFileService } from './list.file.service';
import { ListDataService } from './list.data.service';
import { Item } from './item';
import { Category } from './category';

import { ListComponent } from './list.component';

@Component({
    selector: `app-header`,
    templateUrl: './list-header.component.html',
    providers: [ListFileService, ListDataService]
})

export class ListHeaderComponent implements OnInit{

    public list: Template;
    public saved_lists: string[];
    public file_name: string;

    constructor( 
        private _listFileService: ListFileService,
        private _listDataService: ListDataService
    ) { 
        this.list = new Template();
    }

    ngOnInit(): void{
        this._listDataService.currentList$.subscribe(list => this.list = list);
        this.getLists();
        this.file_name = 'default-list';
    }
    
    loadList(name: string): void{
        this._listFileService.loadList(name).subscribe(
            data => { this.list = data ; this.file_name = name.split(".", 2)[0]; this._updateList()},
            err => { console.log(err); },
            () => console.log('retrieved list ' + this.list)
        );
    }

    saveList(name : string): void{
        var _listIsSaved;
        this._listFileService.saveList(this.list, name).subscribe(
            res => { _listIsSaved = res},
            err => { console.log(err) },
            () => { console.log('done calling save API ' + _listIsSaved) ; this.getLists(); }
        );
    }

    getLists(){
        this._listFileService.getLists().subscribe(
            data => { this.saved_lists = data },
            err => console.log(err),
            () => console.log('done retrieving lists: ' + this.saved_lists)
        );
    }

    private _updateList(){
        this._listDataService.updateList(this.list);
    }


}