import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  @Input() shouldBeActive:string = "home";

  public sites =  
  [{
    id: 0,
    name: "Home",
    url: "home"
  },
  {
    id: 1,
    name: "Profile",
    url: "profile"
  },
  {
    id: 2,
    name: "Reports",
    url: "reports"
  },
  {
    id: 3,
    name: "Explore",
    url: "explore"
  },
  {
    id: 4,
    name: "Logout",
    url: "logout"
  }
  ]

  constructor(private authService:AuthService, private router: Router) { }

  public siteOnClick( url:string ){

    if (url == "logout") {
      this.authService.logout()
      return;
    }
      
    this.router.navigate([url]);
  }

  ngOnInit(): void {
  }

  onLogout(){
    this.authService.logout();
  }

  

}
