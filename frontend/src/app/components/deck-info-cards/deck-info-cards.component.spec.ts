import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckInfoCardsComponent } from './deck-info-cards.component';

describe('DeckInfoCardsComponent', () => {
  let component: DeckInfoCardsComponent;
  let fixture: ComponentFixture<DeckInfoCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckInfoCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckInfoCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
