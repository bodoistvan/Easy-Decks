import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSentComponent } from './report-sent.component';

describe('ReportSentComponent', () => {
  let component: ReportSentComponent;
  let fixture: ComponentFixture<ReportSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportSentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
