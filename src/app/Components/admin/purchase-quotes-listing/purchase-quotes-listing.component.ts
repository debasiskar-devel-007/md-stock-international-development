import { Component, OnInit,Inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpServiceService } from '../../../services/http-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
export interface DialogData {
  data: any;
  alldata:any
  rout:any;
}

@Component({
  selector: 'app-purchase-quotes-listing',
  templateUrl: './purchase-quotes-listing.component.html',
  styleUrls: ['./purchase-quotes-listing.component.css']
})
export class PurchaseQuotesListingComponent implements OnInit {
 public flage:number=0;
  // displayed: string[] = ['date', 'medical_partner', 'sales_rep','quoted_by', 'status', 'action'];
  displayed: string[] = ['date','Quote_ID', 'medical_partner','sales_rep', 'quoted_by', 'status', 'action'];
  public recentlyAdded:any=[];
    

  constructor(public dialog: MatDialog,public activatedRoute:ActivatedRoute,public http:HttpServiceService,public router: Router) {
    //console.log(this.activatedRoute.snapshot.url[2].path);
    if(this.activatedRoute.snapshot.url[2].path=='inventorylistingquote'){
      this.flage=1;
    }
   }

  ngOnInit() {
    if(this.activatedRoute.snapshot.url[2].path=='inventorylistingquote'){
     this.displayed = ['date','Quote_ID', 'status', 'action'];
    }
    if(this.activatedRoute.snapshot.url[0].path=='admin' &&this.activatedRoute.snapshot.url[2].path=='inventorylistingquote'){
      this.displayed = ['date','Quote_ID','medical_partner','sales_rep','status','action'];
    }
        this.activatedRoute.data.subscribe(resolveData => {
      this.recentlyAdded=resolveData.purchasequotelist.res;
     //console.log(resolveData.purchasequotelist);
    });
  }
/** quote details view*/
viewQuoteDetails(quoteid:any,hospiid:any){
 
  if(this.router.routerState.snapshot.url=='/admin/managequotes/purchasequote/list'){
    // console.log("purchase Quote");
    this.router.navigateByUrl('/admin/quote-view/' + quoteid+'/'+hospiid);
  }
  if(this.router.routerState.snapshot.url=='/salesrep/managequotes/purchasequote/list'){
    // console.log("purchase Quote");
    this.router.navigateByUrl('/admin/quote-view/' + quoteid+'/'+hospiid);
  }
  if(this.router.routerState.snapshot.url=='/hospital/managequotes/purchasequote/list'){
    // console.log("purchase Quote");
    this.router.navigateByUrl('/admin/quote-view/' + quoteid+'/'+hospiid);
  }
 
  if(this.activatedRoute.snapshot.url[2].path=='inventorylistingquote'){
    //console.log("inventory-listing-view");
    this.router.navigateByUrl('/admin/inventory-listing-view/' + quoteid+'/'+hospiid);
   }


    /**purchase comparision for admin */
  if(this.router.routerState.snapshot.url=='/admin/managequotes/purchasquotelisting/list'){
    //console.log("purchasquotelisting");
    this.router.navigateByUrl('/admin/quote-comparison-view/' + quoteid+'/'+hospiid);
  }
   /**purchase comparision for salesrep */
   if(this.router.routerState.snapshot.url=='/salesrep/managequotes/purchasquotelisting/list'){
    //console.log("purchasquotelisting");
    this.router.navigateByUrl('/admin/quote-comparison-view/' + quoteid+'/'+hospiid);
  }
  /**purchase comparision for hospital */
  if(this.router.routerState.snapshot.url=='/hospital/managequotes/purchasquotelisting/list'){
    //console.log("purchasquotelisting");
    this.router.navigateByUrl('/admin/quote-comparison-view/' + quoteid+'/'+hospiid);
  }

  /**package quote view */
  if(this.activatedRoute.snapshot.url[1].path=='package'){
    //console.log("purchasquotelisting");
    this.router.navigateByUrl('/admin/quote-package-view/' + quoteid+'/'+hospiid);
  }
}

addPurchasequotes(){
  if(this.activatedRoute.snapshot.url[2].path=='inventorylistingquote'){
    this.router.navigateByUrl('/admin/inventory/inventorylistingquote/add');
  }

  if(this.activatedRoute.snapshot.url[2].path=='purchasquotelisting'){
    this.router.navigateByUrl('/admin/inventory/purchase-comparison-search-list');
  }
  if(this.activatedRoute.snapshot.url[2].path=='purchasequote'){
    this.router.navigateByUrl('/inventory');
  }
  /**add package */
  if(this.activatedRoute.snapshot.url[1].path=='package'){
    this.router.navigateByUrl('//admin/package');
  }
}
/**send email */
email(element:any,rout:any){
  console.log(element);
  const dialogRef = this.dialog.open(emailModal, {
    panelClass:'emailModal',
     data: {alldata: element,rout}
    
   });

   dialogRef.afterClosed().subscribe(result => {
          
   });
}
editforroute(element:any){
  
  this.router.navigateByUrl('/admin/inventory/inventorylistingquote/edit/'+element._id)
}
}

/**Modal component */
@Component({
  selector: 'dialog-overview',
  templateUrl: 'email.html',
  styleUrls: ['./purchase-quotes-listing.component.css']
})
export class emailModal {
 public email:FormGroup;
 public rout:any;
  constructor(public dialogRef: MatDialogRef<emailModal>,@Inject(MAT_DIALOG_DATA) public data: DialogData,
              public formBuilder: FormBuilder,public activatedRoute:ActivatedRoute,public router: Router,public http:HttpServiceService,
              public _snackBar:MatSnackBar) {
                this.email = this.formBuilder.group({
                  id:[data.alldata._id],
                  emailto:[data.alldata.email,Validators.required],
                  cc:[data.alldata.salesrepemail,Validators.required],
                  body:['']
                });
                this.rout=data.rout;
      //console.log(data);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  /**send email */
  onSubmit(){
    let datasource:any='';
    if(this.rout=='purchasequote'){
      datasource='quote-details_view';
    }
    if(this.rout=='inventorylistingquote'){
      datasource='quote_listing_details_view';
    }

    let postEmailBody={
      "source": datasource,
    "id":this.email.value.id,
    "recipient": [this.email.value.emailto],
    "ccrecipient": [this.email.value.cc],
    "emailbody":this.email.value.body
    };
    //console.log(postEmailBody);
    this.http.httpViaPost('purchasequotemailforsalesrep',postEmailBody).subscribe((res:any)=>{
      //console.log(res);
      if(res.status==1){
        this._snackBar.open(res.msg,'', {
          duration: 2000,
        });
      }
      this.dialogRef.close();
    })
  }

  
}