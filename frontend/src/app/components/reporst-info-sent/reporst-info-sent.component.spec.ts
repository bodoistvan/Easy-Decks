import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporstInfoSentComponent } from './reporst-info-sent.component';

describe('ReporstInfoSentComponent', () => {
  let component: ReporstInfoSentComponent;
  let fixture: ComponentFixture<ReporstInfoSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporstInfoSentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporstInfoSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
