import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableUsageFormComponent } from './variable-usage-form.component';

describe('VariableUsageFormComponent', () => {
  let component: VariableUsageFormComponent;
  let fixture: ComponentFixture<VariableUsageFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariableUsageFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VariableUsageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
