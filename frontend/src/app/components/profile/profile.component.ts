import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FlagInfo } from 'src/app/interfaces/flag-info';
import { UserInfo } from 'src/app/interfaces/user-info';
import { FlagInfoService } from 'src/app/services/flag-info.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  constructor(
    private fb:FormBuilder,
    private flagInfoService:FlagInfoService,
    private userService:UserService
    ) { }

  public flagInfo?:FlagInfo[];
  public userInfo?:UserInfo;

  ngOnInit(): void {
    this.flagInfoService.getFlagInfo().subscribe((data)=>{
      this.flagInfo = data;
      this.voiceForm.get("name")?.patchValue(this.flagInfo[0].dataName);
      this.refreshDefault()
    });

    this.userService.getUserInfo().subscribe((data)=> {
      this.userInfo = data;
      this.refreshDefault()
    })
  }

  getVoices():Array<{name:string, voice:string}> {
    const selectedFlag = this.voiceForm.get("name")?.value;
    if (selectedFlag != undefined && this.flagInfo != undefined) {
      const flag = this.flagInfo.find(f => f.dataName == selectedFlag);
      if (flag != undefined) {
        return flag.voices;
      }
    }
    return [];
  }

  onLanguageSelect(){
   this.refreshDefault();
  }

  refreshDefault(){
    if (this.userInfo != undefined && this.flagInfo != undefined){
      const selectedFlag = this.voiceForm.get("name")?.value;

      if (selectedFlag != undefined){
        const voice = this.userInfo.voices[selectedFlag];
        if (voice != undefined){
          this.voiceForm.get("voice")?.patchValue(voice);
        }
      }
    }
  }



  public voiceForm = this.fb.group({
    name: [""],
    voice: [""], 
  })

}
