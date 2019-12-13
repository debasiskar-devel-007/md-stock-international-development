import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpServiceService } from 'src/app/services/http-service.service';
@Component({
  selector: 'app-addinventorylistingquote',
  templateUrl: './addinventorylistingquote.component.html',
  styleUrls: ['./addinventorylistingquote.component.css']
})
export class AddinventorylistingquoteComponent implements OnInit {
  // ======================declarations=================
  public brand_name_array: any = [];
  public addinventorylistingquoteForm: FormGroup;
  public inventory_category_array: any = [];
  public header_txt: any = "Add Listing Inventory";
  public btn_text: any = "SUBMIT";
  public condition: any;
  public action: any;
  public defaultData: any;
  public successMessage: any = "Submitted Successfully!!!";
  public yom_flag: boolean = false;
  public ErrCode: boolean;
  public fullImagePath: any;
  public imageName: any;
  public imageType: any;
  public img_flag: any = false;
  public add_field_flag: boolean = false;
  public i_count: number = 0;
  public dummy_array: any;
  public attr_name: any;
  public attr_value: any;
  public a_name: string;
  public a_value: string;
  public temp_array: any = [];
  public items: FormArray;
  public active_hospital_list: any = [];
  public imageErrCode: boolean = false;
   //image upload 
   public configData: any = {
    baseUrl: "https://fileupload.influxhostserver.com/",
    endpoint: "uploads",
    size: "51200", // kb
    format: ["jpg", "jpeg", "png"], // use all small font
    type: "inventory-file",
    path: "files",
    prefix: "_inventory-file",
    formSubmit: false,
    conversionNeeded: 0,
    bucketName: "crmfiles.influxhostserver"
  }

  constructor(public formBuilder: FormBuilder, public cookieService: CookieService,
    public http: HttpServiceService, public router: Router,
    public activatedRoute: ActivatedRoute, public dialog: MatDialog) { 

      this.activatedRoute.params.subscribe(params => {
        if (params['_id'] != null) {
          this.action = "edit";
          this.condition = { id: params._id };
          this.activatedRoute.data.subscribe(resolveData => {
            this.defaultData = resolveData.inventoryList.res[0];
          });
        }
        else
          this.action = "add";
      });
       //generating the form
    this.generateForm();
  
  }

  ngOnInit() {
        //getting the inventory category
        this.getInventoryCategory();

        /** getting the active hospitals **/
        this.getActiveHospital();
    
        // Case 
        switch (this.action) {
          case 'add':
            /* Button text */
            this.btn_text = "SUBMIT";
            break;
          case 'edit':
            /* Button text */
            this.btn_text = "UPDATE";
            this.successMessage = "One row updated";
            this.setDefaultValue(this.defaultData);
            this.header_txt = "Edit Brand Information";
            this.img_flag = true;
            break;
        }
  }

  // =====================generate form=====================
  generateForm() {
    this.addinventorylistingquoteForm = this.formBuilder.group({
      product_name: ['', [Validators.required]],
      source: ["",[Validators.required]],
      brand_name: ["",[Validators.required]],
      inventory_category: ["",[Validators.required]],
      sku: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      saleprice:['',Validators.required],
      description: ['', [Validators.required]],
      inventory_image: [],
      condition: ['New',],
      yom: [],
      items: new FormArray([]),
      dynamic_attributes: [],
      status: [],

    });
  }
  // =======================================================





  // ===================================Setting the default Value========================
  setDefaultValue(defaultValue) {
    this.addinventorylistingquoteForm.patchValue({
      product_name: defaultValue.product_name,
      brand_name: defaultValue.brand_name,
      inventory_category: defaultValue.inventory_category,
      sku: defaultValue.sku,
      description: defaultValue.description,
      condition: defaultValue.condition,
      status: defaultValue.status,
      inventory_image: defaultValue.inventory_image,
      quantity: defaultValue.quantity,
      saleprice:defaultValue.saleprice,
      source: this.defaultData.source

    })
    this.fullImagePath = defaultValue.inventory_image.basepath + defaultValue.inventory_image.image;
    this.imageName = defaultValue.inventory_image.name;
    this.imageType = defaultValue.inventory_image.type;
    this.getBrandName(defaultValue.inventory_category);
    for (let i = 0; i < this.defaultData.items.length; i++) {
      if (this.defaultData.items[i] != null) {
        this.addItemWithData(this.defaultData.items[i]);
      }
    }
  }
  // ===================================================================================



  /** blur function **/
  inputBlur(val: any) {
    this.addinventorylistingquoteForm.controls[val].markAsUntouched();
  }

  // ======================submit form=======================
  onSubmit() {
    
    /** marking as untouched **/
    for (let x in this.addinventorylistingquoteForm.controls) {
      this.addinventorylistingquoteForm.controls[x].markAsTouched();
    }
    var item: any = this.addinventorylistingquoteForm.value.items
    this.addinventorylistingquoteForm.value.dynamic_attributes = [];
    for (let loop = 0; loop < item.length; loop++) {
      var data: any = {};
      data[item[loop].label_name] = item[loop].label_value;
      this.addinventorylistingquoteForm.value.dynamic_attributes.push(data);
    }


    // Image File Upload Works 
    if (this.configData.files) {

      if (this.configData.files.length > 1) { this.ErrCode = true; return; }
      this.addinventorylistingquoteForm.value.inventory_image =
        {
          "basepath": this.configData.files[0].upload.data.basepath + '/' + this.configData.path + '/',
          "image": this.configData.files[0].upload.data.data.fileservername,
          "name": this.configData.files[0].name,
          "type": this.configData.files[0].type
        };
    } else {
      this.addinventorylistingquoteForm.value.inventory_image = false;
      this.imageErrCode = true;
      if (this.action == 'edit')
        this.addinventorylistingquoteForm.value.inventory_image = this.defaultData.inventory_image;
    }

    if (this.addinventorylistingquoteForm.invalid) {
      return;
    }
    else {

      //status
      if (this.addinventorylistingquoteForm.value.status) {
        this.addinventorylistingquoteForm.value.status = parseInt("1");
      }
      else {
        this.addinventorylistingquoteForm.value.status = parseInt("0");
      }



      delete this.addinventorylistingquoteForm.value.confirmpassword;



      /* start process to submited data */
      let postData: any = {
        "source": 'inventories',
        "data": Object.assign(this.addinventorylistingquoteForm.value, this.condition),
        // "token": this.cookieService.get('jwtToken'),
        "sourceobj": ["brand_name", "inventory_category"],

      };

      this.http.httpViaPost('addorupdatedata', postData).subscribe((response: any) => {

        if (response.status == "success") {
          // this.openDialog(this.successMessage);
          // setTimeout(() => {
          //   this.dialogRef.close();
          // }, 2000);


          this.router.navigateByUrl('inventory/inventory-list/list');
        } else {
          alert("Some error occurred. Please try again.");
        }
      }, (error) => {
        alert("Some error occurred. Please try again.");
      });
    }
  }
  // ========================================================






  //getting the brand name

  getBrandName(index: any) {
    //console.log(index);
    var data: any;
    data = {
      'source': 'category_view',
      'token': this.cookieService.get('jwtToken'),
      condition: {
        _id_object: index
      }
    };
    this.http.httpViaPost("datalist", data).subscribe(response => {
      //console.log("getBrandName response",response);
      let result: any;
      result = response.res;
      this.brand_name_array = result[0].brand_data;
    });
  }

  // clear image in InventoryComponent//
  clear_image() {
    this.img_flag = false;
  }


  //getting the brand name


  getInventoryCategory() {
    var data: any;
    data = {
      'source': 'inventory_category',
      'token': this.cookieService.get('jwtToken')
    };
    this.http.httpViaPost("datalist", data).subscribe(response => {
      let result: any;
      result = response;
      this.inventory_category_array = result.res;
    });
  }

  /** get active hospital list **/
  getActiveHospital() {
    var data: any;
    data = {
      'source': 'users_view',
      'token': this.cookieService.get('jwtToken'),
      'condition': {
        'type': 'hospital',
        status: 1
      }
    };
    this.http.httpViaPost("datalist", data).subscribe(response => {
      let result: any;
      result = response.res;
      this.active_hospital_list = result
    });
  }


  createItem(item_array: any): FormGroup {
    if (item_array != null) {
      return this.formBuilder.group({
        label_name: [item_array.label_name],
        label_value: [item_array.label_value]
      });
    }
    if (item_array == null) {
      return this.formBuilder.group({
        label_name: '',
        label_value: ''
      });
    }
  }

  addItem(): void {
    this.items = this.addinventorylistingquoteForm.get('items') as FormArray;
    this.items.push(this.createItem(null));
  }

  addItemWithData(val: any): void {
    this.items = this.addinventorylistingquoteForm.get('items') as FormArray;
    this.items.push(this.createItem(val));
  }

/**plus */
plus(){

}
minus(){

}
  trackByFn(index) {
    return index;
  }
}