import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    
  }

  public myForm = this.fb.group({
    dif : [2]
  })

  public setDifValue(param:number){
    this.myForm.get("dif")?.patchValue(param);
  }
}
