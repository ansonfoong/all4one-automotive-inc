import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from './services/backend.service';
import { MatSidenav } from '@angular/material';
import { SidenavService } from './services/sidenav.service';

interface Route {
  name,
  url
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public name: string;
  public currentPath: string = '';
  public links: Array<Route> = [
    { name: 'Home', url: '/' },
    { name: 'Careers', url: '/careers' },
    { name: 'Jobs', url: '/jobs' }
  ];
  private authorizedRoutes: Array<Route> = [
    { name: 'Dashboard', url: '/dashboard' },
    { name: 'Settings', url: '/settings' },
    { name: 'Logout', url: '/logout'}
  ]
  constructor(private router: Router,
    private service: BackendService) {
    router.events.subscribe((url : any) => {
      this.currentPath = router.url;
    }, err => console.log(err),
    () => console.log("Done."))
  }
  ngOnInit() {
    this.service.isAuthorized().subscribe((data : any) => {
    this.name = data.name;
      this.links = this.links.concat(this.authorizedRoutes);
    }, err => console.log(err), () => {
      console.log("Done.");
    });
  }
  
}
