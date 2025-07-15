import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectsUsingEntityFormComponent } from './objects-using-entity-form.component';

describe('ObjectsUsingEntityFormComponent', () => {
  let component: ObjectsUsingEntityFormComponent;
  let fixture: ComponentFixture<ObjectsUsingEntityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObjectsUsingEntityFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ObjectsUsingEntityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
