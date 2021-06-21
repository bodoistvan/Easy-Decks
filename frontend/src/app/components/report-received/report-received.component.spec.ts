import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportReceivedComponent } from './report-received.component';

describe('ReportReceivedComponent', () => {
  let component: ReportReceivedComponent;
  let fixture: ComponentFixture<ReportReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportReceivedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
