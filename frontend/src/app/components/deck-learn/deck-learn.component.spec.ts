import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckLearnComponent } from './deck-learn.component';

describe('DeckLearnComponent', () => {
  let component: DeckLearnComponent;
  let fixture: ComponentFixture<DeckLearnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckLearnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckLearnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
