import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferencedEntitiesFormComponent } from './referenced-enteties-form.component';

describe('ReferencedEntetiesFormComponent', () => {
  let component: ReferencedEntitiesFormComponent;
  let fixture: ComponentFixture<ReferencedEntitiesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferencedEntitiesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReferencedEntitiesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
