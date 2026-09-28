import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaveOperation } from './save-operation';

describe('SaveOperation', () => {
  let component: SaveOperation;
  let fixture: ComponentFixture<SaveOperation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveOperation],
    }).compileComponents();

    fixture = TestBed.createComponent(SaveOperation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
