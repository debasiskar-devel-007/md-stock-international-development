
import { Component, OnInit } from '@angular/core';
import {HttpServiceService} from '../../../services/http-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public logo: any = './assets/images/logo.png';
  public fromTitle: any = "Login Form";    // This is a From Title
  public fullUrl: any = this.httpServiceService.baseUrl;  // server url
  public endpoint: any = "login";
  public buttonName:any= 'Login';
  public defaultLoginUrl = '/login';

  loading: boolean;
 



  public signUpRouteingUrl: any = {
    "path": "",
    "buttonName": "Don't have an account yet? Contact us",
    "customLink": "/contactus",
    "customURl": ""
  };
  public forgetRouteingUrl: any = {
    "path": "",
    "buttonName": "Forget Password",
    "customLink": "/forgot-password",
  };

  public routerStatus: any;

  constructor(public httpServiceService:HttpServiceService) {
    this.routerStatus = {           // this is use for if login succcess then navigate which page
      "data": [
        {
          "type": "admin",
          "routerNav": "dashboard-admin"
        },
        {
          "type": "salesrep",
          "routerNav": "dashboard-salesrep"
        },
        {
          "type": "hospital",
          "routerNav" : "dashboard-medical-partner"
        }
      ]
    }
  }

  ngOnInit() {
  }

}
