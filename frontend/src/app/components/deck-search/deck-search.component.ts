import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlagInfo } from 'src/app/interfaces/flag-info';
import { FlagInfoService } from 'src/app/services/flag-info.service';

@Component({
  selector: 'app-deck-search',
  templateUrl: './deck-search.component.html',
  styleUrls: ['./deck-search.component.sass']
})
export class DeckSearchComponent implements OnInit {
  
  
  public flagInfo:FlagInfo[] = [];

  constructor(private flagInfoService:FlagInfoService, private fb:FormBuilder, private router:Router, private route:ActivatedRoute) { }

  public searchForm = this.fb.group({
    name: [""],
    lang1 : ["hu"],
    lang2 : ["gb"]
  })

  ngOnInit(): void {
        this.flagInfoService.getFlagInfo().subscribe(data => this.flagInfo = data);
        console.log("get: " + this.flagInfo);
        this.route.queryParams.subscribe(params => {

          const lang1 = params["lang1"];
          const lang2 = params["lang2"];
          const name = params["name"];
    
          const queryParams = {name: name, lang1: lang1, lang2:lang2 }
          this.searchForm.setValue(queryParams);
          
        });
  }

  onSearchSubmit(){
    const searhQuery = this.searchForm.value;

    this.router.navigate(["home"], {queryParams : { name: searhQuery.name, lang1: searhQuery.lang1, lang2: searhQuery.lang2 } });
  }


}
