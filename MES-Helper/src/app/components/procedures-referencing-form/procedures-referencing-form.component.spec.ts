import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceduresReferencingFormComponent } from './procedures-referencing-form.component';

describe('ProceduresReferencingFormComponent', () => {
  let component: ProceduresReferencingFormComponent;
  let fixture: ComponentFixture<ProceduresReferencingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProceduresReferencingFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProceduresReferencingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
