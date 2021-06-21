import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsInfoSentComponent } from './reports-info-sent.component';

describe('ReportsInfoSentComponent', () => {
  let component: ReportsInfoSentComponent;
  let fixture: ComponentFixture<ReportsInfoSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsInfoSentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsInfoSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
