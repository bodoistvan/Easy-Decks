import { TestBed } from '@angular/core/testing';

import { CardStatService } from './card-stat.service';

describe('CardStatService', () => {
  let service: CardStatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardStatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
