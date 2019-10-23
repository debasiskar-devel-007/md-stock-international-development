import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit() {
  }

  toAdminManagement(event: any) {
    console.log(event);
    if (event == 1)
      this.router.navigateByUrl('admin-management/list');
    else if (event == 2)
      this.router.navigateByUrl('admin/medicalpartners-management/list');
      else if (event == 3)
      this.router.navigateByUrl('admin/salesrep-management/list');
  }
}
