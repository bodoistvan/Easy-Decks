import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.sass']
})
export class RegisterPageComponent implements OnInit {

  constructor(private authService : AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  public userForm = this.fb.group({
    nickname: [""],
    mail: [""],
    password: [""],
    repassword: [""]
  });

  onRegister(){
    const user = this.userForm.value;
    this.authService.registerUser(user).subscribe();
  }

}
