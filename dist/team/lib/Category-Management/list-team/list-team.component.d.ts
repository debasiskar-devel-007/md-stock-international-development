import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
export declare class ListTeamComponent implements OnInit {
    router: Router;
    alldata: any;
    addPageVal: any;
    searchingendpoint: any;
    sourcenameViaapp: any;
    tokenVal: any;
    deleteendpointVal: any;
    addupdate: any;
    serverUrlData: any;
    editRouteval: any;
    manageRoute: any;
    alldata_skip: any;
    alldata_modify_header: any;
    status: any;
    search_settings: any;
    TeamData: any;
    EditRoute: any;
    addButtonRoute: any;
    manageButtonRoute: any;
    UpdateRoute: any;
    Token: any;
    SourceName: any;
    SearchEndpoint: any;
    DeleteEndpoint: any;
    serverUrl: any;
    constructor(router: Router);
    ngOnInit(): void;
    addButton(): void;
    manageTeamButton(): void;
}