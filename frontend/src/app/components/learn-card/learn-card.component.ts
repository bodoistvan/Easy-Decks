import { MapType } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { SoundService } from 'src/app/services/sound.service';



@Component({
  selector: 'app-learn-card',
  templateUrl: './learn-card.component.html',
  styleUrls: ['./learn-card.component.sass']
})
export class LearnCardComponent implements OnInit {

  @Input() word?:string;
  @Input() id?:string
  @Input() index?:number;

  private audios:Map<string, ArrayBuffer> = new Map();

  constructor(
    private soundService:SoundService
  ) { }

  ngOnInit(): void {

  }
  
  context = new AudioContext()

  async onSoundClick(){

    if( this.id != undefined && this.index != undefined){
      if (this.audios?.get(this.id) == undefined){
        this.soundService.getCardSound( this.id, this.index).subscribe(async(data) =>{
          this.audios?.set(this.id!, data);
          if (this.audios != undefined && this.audios?.get(this.id!) != undefined && this.id != undefined){
            const buffer = await this.context.decodeAudioData(this.audios.get(this.id)!.slice(0));
            const source = this.context.createBufferSource();
            source.buffer = buffer;
            source.connect(this.context.destination);
            source.start();
          }
          
          
        })
      } else {
        if (this.audios != undefined && this.audios?.get(this.id!) != undefined && this.id != undefined){
          const context = new AudioContext()
          const buffer = await context.decodeAudioData(this.audios.get(this.id)!.slice(0));
          const source = context.createBufferSource();
          source.buffer = buffer;
          source.connect(context.destination);
          source.start();
        }
      }
      
    }
  }


  

}
