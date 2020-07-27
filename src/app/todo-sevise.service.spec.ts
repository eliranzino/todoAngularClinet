import { TestBed } from '@angular/core/testing';

import { TodoSeviseService } from './todo-sevise.service';

describe('TodoSeviseService', () => {
  let service: TodoSeviseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoSeviseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
