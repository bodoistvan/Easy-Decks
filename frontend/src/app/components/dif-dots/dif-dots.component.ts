import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-dif-dots',
  templateUrl: './dif-dots.component.html',
  styleUrls: ['./dif-dots.component.sass']
})
export class DifDotsComponent implements OnInit {

  private valMouseBefore?:number;
  public maxDots: Array<number> = Array(5);

  @Output() setValue: EventEmitter<number> = new EventEmitter();
  @Input() public currentValue: number = 3;
  @Input() isInput: boolean = false;

  constructor() { }

  ngOnInit(): void {
   
  }

  public dotOnMouseOver(dot : number){
    if (this.isInput == true)
      this.currentValue = dot + 1;
  }

  public dotOnClick(dot : number){
    if (this.isInput == true) {
      const val = this.valMouseBefore = dot + 1;
      this.setValue.emit(val);
    }
      
  }

  containerOver(){
    if (this.isInput == true)
      this.valMouseBefore = this.currentValue;
  }

  containerLeave(){
    if (this.isInput == true) {
      this.currentValue = this.valMouseBefore!;
      //this.setValue.emit( this.currentValue ) ;
    }
    
  }

}
