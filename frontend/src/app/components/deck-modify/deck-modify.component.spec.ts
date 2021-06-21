import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeckModifyComponent } from './deck-modify.component';

describe('DeckModifyComponent', () => {
  let component: DeckModifyComponent;
  let fixture: ComponentFixture<DeckModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeckModifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeckModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
