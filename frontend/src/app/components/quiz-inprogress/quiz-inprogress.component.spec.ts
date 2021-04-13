import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizInprogressComponent } from './quiz-inprogress.component';

describe('QuizInprogressComponent', () => {
  let component: QuizInprogressComponent;
  let fixture: ComponentFixture<QuizInprogressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizInprogressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizInprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
