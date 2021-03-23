import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizResultInfoComponent } from './quiz-result-info.component';

describe('QuizResultInfoComponent', () => {
  let component: QuizResultInfoComponent;
  let fixture: ComponentFixture<QuizResultInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizResultInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizResultInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
