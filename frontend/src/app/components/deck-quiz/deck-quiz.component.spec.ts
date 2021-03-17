import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckQuizComponent } from './deck-quiz.component';

describe('DeckQuizComponent', () => {
  let component: DeckQuizComponent;
  let fixture: ComponentFixture<DeckQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
