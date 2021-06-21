import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckSubscribeButtonComponent } from './deck-subscribe-button.component';

describe('DeckSubscribeButtonComponent', () => {
  let component: DeckSubscribeButtonComponent;
  let fixture: ComponentFixture<DeckSubscribeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckSubscribeButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckSubscribeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
