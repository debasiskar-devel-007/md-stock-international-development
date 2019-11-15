import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from 'src/app/services/http-service.service';


@Component({
  selector: 'app-listing-inventory-cat',
  templateUrl: './listing-inventory-cat.component.html',
  styleUrls: ['./listing-inventory-cat.component.css']
})
export class ListingInventoryCatComponent implements OnInit {

  public user_cookie:any;

 // ===============================Declarations for category=========================
 inventoryCategoryData: any = [];
 inventoryCategoryData_skip: any = ["_id","description_html","description","created_at"];
 inventoryCategoryData_modify_header: any = {"category name":"Category Name",
"parent category":"Parent Category","priority":"Priority","status":"Status"};
 tableName: any = 'inventory_category';
 UpdateEndpoint: any = "addorupdatedata";
 deleteEndpoint: any = "deletesingledata";

 searchingEndpoint: any = "datalist";
 editUrl: any = 'inventory/manage-inventory/inventory-category/edit';
 apiUrl: any = "https://r245816wug.execute-api.us-east-1.amazonaws.com/dev/api/";
 status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
 public search_settings: any =
   {
     selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
     textsearch: [{ label: "Search By category name...", field: 'category_name' }]
   };
 // ====================================================================

// ===============================Declarations for brand=========================
public brandData: any = [];
brandData_skip: any = ["_id","description_html","description","created_at"];
brandData_modify_header: any = {"brand name":"Brand Name",
"parent category":"Parent Category","priority":"Priority","status":"Status"};
public tableNameBrand: any = "brands";
UpdateEndpointBrand: any = "addorupdatedata";
public deleteEndpointBrand: any = "deletesingledata";
public token : any = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJleHAiOjE1NzM5MDc1NDcsImlhdCI6MTU3MzgyMTE0N30.SDcX65zMYn8Hhaf1PtkjhshtTUbyL82Dz0hTjEIicYE"
searchingEndpointBrand: any = "datalist";
editUrlBrand: any = 'inventory/manage-inventory/brand/edit';
apiUrlBrand: any = "https://r245816wug.execute-api.us-east-1.amazonaws.com/dev/api/";
statusBrand: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
public search_settingsBrand: any =
  {
    selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }],
    textsearch: [{ label: "Search By brand name...", field: 'brand_name' }]
  };
// ====================================================================

   /*Showing Image in the Modal*/
   pendingmodelapplicationarray_detail_datatype: [{
     key: "image",
     value: 'image',
     fileurl: 'https://s3.us-east-2.amazonaws.com/crmfiles.influxhostserver/files/'             // Image path 
   }]




  constructor(private http: HttpServiceService, private cookieService: CookieService,
    private router: Router, public activatedRoute: ActivatedRoute) {
    this.user_cookie = cookieService.get('jwtToken');
    console.log("tokennnnnnnnnnn",this.user_cookie);
    // this.getBrandList();
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(resolveData => {
      console.log(resolveData.inventoryCatList.data)
      this.inventoryCategoryData = resolveData.inventoryCatList.data.inventory;
      this.brandData = resolveData.inventoryCatList.data.brands;
      // console.log(this.inventoryCategoryData)
    });  
           
  }

    //getting the brand list
    //  getBrandList()
    //  {
    //         var data :any;
    //         data={ 'source':'brands_view','token': this.cookieService.get('jwtToken') };

    //         this.http.httpViaPost('datalist',data).subscribe(res=>{
    //           let brandData:any;
    //           brandData=res.res
    //                 console.log("+++++++++++++++++",brandData);
    //         });
 
    //  }

}
