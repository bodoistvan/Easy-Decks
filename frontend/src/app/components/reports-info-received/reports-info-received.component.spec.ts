import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsInfoReceivedComponent } from './reports-info-received.component';

describe('ReportsInfoReceivedComponent', () => {
  let component: ReportsInfoReceivedComponent;
  let fixture: ComponentFixture<ReportsInfoReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportsInfoReceivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsInfoReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
