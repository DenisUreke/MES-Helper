import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceduresUsingColumnFormComponent } from './procedures-using-column-form.component';

describe('ProceduresUsingColumnFormComponent', () => {
  let component: ProceduresUsingColumnFormComponent;
  let fixture: ComponentFixture<ProceduresUsingColumnFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProceduresUsingColumnFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProceduresUsingColumnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
