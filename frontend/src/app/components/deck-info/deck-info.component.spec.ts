import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckInfoComponent } from './deck-info.component';

describe('DeckInfoComponent', () => {
  let component: DeckInfoComponent;
  let fixture: ComponentFixture<DeckInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
