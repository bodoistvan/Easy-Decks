import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyDeckComponent } from './modify-deck.component';

describe('ModifyDeckComponent', () => {
  let component: ModifyDeckComponent;
  let fixture: ComponentFixture<ModifyDeckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyDeckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
