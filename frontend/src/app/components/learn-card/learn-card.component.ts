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

  private audio?:ArrayBuffer;

  constructor(
    private soundService:SoundService
  ) { }

  ngOnInit(): void {
  }

  async onSoundClick(){

    if( this.id != undefined && this.index != undefined){
      if (this.audio == undefined){
        this.soundService.getCardSound( this.id, this.index).subscribe(async(data) =>{
          this.audio = data;

          const context = new AudioContext()
          const buffer = await context.decodeAudioData(this.audio.slice(0));
          const source = context.createBufferSource();
          source.buffer = buffer;
          source.connect(context.destination);
          //this.source.loop = true;
          source.start();
          console.log(source);
          
        })
      } else {
        const context = new AudioContext()
          
          const buffer = await context.decodeAudioData(this.audio.slice(0));
          const source = context.createBufferSource();
          source.buffer = buffer;
          source.connect(context.destination);
          //this.source.loop = true;
          source.start();
      }
      
    }
  }

}
