import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';


@Component({
  selector: 'app-listing-brand',
  templateUrl: './listing-brand.component.html',
  styleUrls: ['./listing-brand.component.css']
})

export class ListingBrandComponent implements OnInit {

 // ===============================Declarations=========================
 public brandData: any = [];
 public detail_skip_array: any = ["_id"];
 public brandData_skip: any = ["_id","description_html","description","created_at","brand"];
 public brandData_modify_header: any = {"brand name":"Brand Name",
"parent category":"Parent Category","priority":"Priority","status":"Status"};
public tableName: any = 'brands';
public UpdateEndpoint: any = "addorupdatedata";
public deleteEndpoint: any = "deletesingledata";
 public user_cookie: any='';
 public searchingEndpoint: any = "datalist";
 public editUrl: any = 'inventory/manage-inventory/brand/edit';
 apiUrl: any = "https://r245816wug.execute-api.us-east-1.amazonaws.com/dev/api/";
 public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
 public search_settings: any =
   {
     selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
     textsearch: [{ label: "Search By brand name...", field: 'brand_name' }]
   };
 // ====================================================================
   /*Showing Image in the Modal*/
   public pendingmodelapplicationarray_detail_datatype: any=[{
     key: "image",
     value: 'image',
     fileurl: 'https://s3.us-east-2.amazonaws.com/crmfiles.influxhostserver/files/'             // Image path 
   }]


  constructor(private http: HttpServiceService, private cookieService: CookieService,
    private router: Router, public activatedRoute: ActivatedRoute) {
    this.user_cookie = cookieService.get('jwtToken');
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(resolveData => {
      this.brandData = resolveData.brandList.res;
    });
  }

}
