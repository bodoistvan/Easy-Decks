import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  public loginForm = this.fb.group({
    email : ["test@test.com"],
    password : ["test123"]
  })

  onLoginSubmit(){
    const value = this.loginForm.value;

    if ( !value.email || !value.password) {
      return;
    }

    this.authService.login( value.email, value.password ).subscribe(res => {
      this.router.navigate(["home"]);
    });
  }



}
