import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService) { }


  ngOnInit(): void {
  }

  onLogout(){
    this.authService.logout();
  }

  

}
