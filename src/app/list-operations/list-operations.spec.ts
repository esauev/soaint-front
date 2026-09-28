import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListOperations } from './list-operations';

describe('ListOperations', () => {
  let component: ListOperations;
  let fixture: ComponentFixture<ListOperations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOperations],
    }).compileComponents();

    fixture = TestBed.createComponent(ListOperations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
