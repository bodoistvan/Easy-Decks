import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckInfoHeaderComponent } from './deck-info-header.component';

describe('DeckInfoHeaderComponent', () => {
  let component: DeckInfoHeaderComponent;
  let fixture: ComponentFixture<DeckInfoHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckInfoHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckInfoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
