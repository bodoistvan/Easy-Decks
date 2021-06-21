import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifDotsComponent } from './dif-dots.component';

describe('DifDotsComponent', () => {
  let component: DifDotsComponent;
  let fixture: ComponentFixture<DifDotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DifDotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DifDotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
