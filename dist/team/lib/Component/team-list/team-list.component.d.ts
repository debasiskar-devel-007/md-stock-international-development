import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
export declare class TeamListComponent implements OnInit {
    router: Router;
    DataList: any;
    serverUrlData: any;
    tokenVal: any;
    DelEndpoint: any;
    editroute: any;
    updatendpoint: any;
    collectionName: any;
    searchingSource: any;
    searchingEndpoint: any;
    addPageRoute: any;
    allData: any;
    data_skip: any;
    data_modify_header: any;
    search_settings: any;
    pendingmodelapplicationarray_detail_datatype: any;
    serverUrl: any;
    Token: any;
    DeleteEndpoint: any;
    EditRoute: any;
    UpdateEndpoint: any;
    SourceName: any;
    SearchSourceName: any;
    SearchEndpoint: any;
    AddPageRoute: any;
    constructor(router: Router);
    ngOnInit(): void;
    addButton(): void;
}