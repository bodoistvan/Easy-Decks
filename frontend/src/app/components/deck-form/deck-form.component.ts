import {  Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlagInfo } from 'src/app/interfaces/flag-info';
import { DecksService } from 'src/app/services/decks.service';
import { FlagInfoService } from 'src/app/services/flag-info.service';
import { YouSureComponent } from '../you-sure/you-sure.component';

@Component({
  selector: 'app-deck-form',
  templateUrl: './deck-form.component.html',
  styleUrls: ['./deck-form.component.sass']
})
export class DeckFormComponent implements OnInit {

  @Input() formType:string = "create";

  public flagInfo:FlagInfo[] = [];

  constructor(
    private fb: FormBuilder, 
    private deckService:DecksService, 
    private route:ActivatedRoute,
    private router:Router,
    private flagInfoService:FlagInfoService,
    private modalService: NgbModal
    ) { }

  private deckId?:string;
  
  public selectedCardId:string = "";

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.deckId = params["id"];
      this.selectedCardId = params["selected"];
      
      if (this.deckId !=null){
        this.deckService.getDeckInfoByIdAll(this.deckId).subscribe(data => {
          for(let i = 0; i < data.cards.length; i++){
            this.addCards();
          }
          this.deckForm.patchValue(data);
          this.deckForm.get("name")?.disable(); 
          this.deckForm.get("lang1")?.disable(); 
          this.deckForm.get("lang2")?.disable(); 

        }, err => console.error(err));
      }
   })

   this.flagInfoService.getFlagInfo().subscribe(data=> this.flagInfo = data);

  }

  get deckName(){
    return this.deckForm.get("name");
  }

  public testBool = false;

  testbutton(){
    this.testBool = !this.testBool;
  }


  deleteButtonClick(i:number){


    let fg = this.cards.at(i) as FormGroup;

    let card = fg.value;

    console.log(card);
    if ( card.action === undefined){

      fg.addControl('action', new FormControl("delete"));

    } else {
      if (card.action == "delete"){

        if (this.cards.at(i).get(`lang1`)?.dirty || this.cards.at(i).get(`lang2`)?.dirty) {

          card.action = "update";

        } else {

          card.action = "none";

        }
 
      } else{
          card.action="delete";
        }
      fg.patchValue(card)
    } 
  }

  isCardShouldBeDeleted(index:number):boolean{

    const action = this.cards.at(index).value.action || "";
    if (action == "delete")
      return true; 

    return false;

  }

  getCardActionAt(index:number, lang?:number):number {
    //0 none
    //1 delete
    //2 update
    //3 create
    
    const action = this.cards.at(index).value.action || "";

    if (action == "delete")
      return 1;

    if ( this.cards.at(index).value.id == "")
      return 3;

    if (lang != undefined) {
      if ( this.cards.at(index).get(`lang${lang}`)?.dirty )
        return 2;
    }
   
    return 0;
    
  }

  get isModify():boolean{
      let id = this.deckForm.get("id") as FormControl;
      return id.value !== "";
  }

  public deckForm = this.fb.group({
    id: [''],
    name: ['', [ Validators.required, Validators.minLength(6) ]],
    lang1: ['hu'],
    lang2: ['gb'],
    difficulty: [3],
    public: ['false'],
    cards: this.fb.array([
      this.fb.group({
        id: "",
        lang1: "",
        lang2: "",
        action: "none"
      })
    ])
  });
  
  get cards(){
    return this.deckForm.get('cards') as FormArray;
  }
  
  addCards(){
    this.cards.push(
      this.fb.group({
        id: "",
        lang1: "",
        lang2: "",
        action: "none"
      })
    )
  }
  
  get lang1(){
    return this.deckForm.get('lang1')?.value;
  }

  get lang2(){
    return this.deckForm.get('lang2')?.value;
  }


  debugMyCode(param:any){
   console.log(param); 
  }

  modelChanged(i:number){
    console.log("changed")
    let count = this.cards.length;
    if (count - 1 === i) {
      this.addCards();
    }

    let fg = this.cards.at(i) as FormGroup;

    let card = fg.value;

    if( card.action === undefined){
      fg.addControl('action', new FormControl("update"));
    } else {
      if (card.id == ""){
        card.action = "create"
      } else {
        card.action = "update";
      }
      
    }
    fg.patchValue(card);
  }

  onSubmitCreate():void {
    this.deckName?.markAsTouched();
 
    if (this.deckForm.valid == true){
      this.deckService.createDeck(this.deckForm.value).subscribe( rep => {
        this.router.navigate(["home"]);
      });
    }


    
  }

  onCancelCreate():void {
    this.router.navigate(["home"]);
  }

  onSubmitDelete():void {

    const modalRef = this.modalService.open(YouSureComponent, {centered: true});
    modalRef.componentInstance.text = "Are you sure you want to delete this deck?"
    modalRef.componentInstance.onSubmit.subscribe(() => this.deleteDeck());
    //modalRef.componentInstance.onSubmit = this.deleteDeck.bind(this);
    console.log(modalRef.componentInstance);

    //this.deckService.deleteDeckById(this.deckId!).subscribe( rep => console.log(rep));
  }

  deleteDeck(){
    console.log("deleting...");
  }

  onSubmitPatch():void {
    console.log(this.deckId!);
    this.deckService.patchDeckById(this.deckId!, this.deckForm.value).subscribe(
      newData => {
        const cards = this.deckForm.get("cards") as FormArray;
        cards.clear();

        for(let i = 0; i < newData.cards.length + 1; i++){
          this.addCards()
        }

        this.deckForm.patchValue(newData);
      }
    );
  }

  setDifValue(val : number){
    this.deckForm.patchValue({difficulty: val});
  }

}
