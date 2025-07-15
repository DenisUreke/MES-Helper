import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentProceduresFormComponent } from './recent-procedures-form.component';

describe('RecentProceduresFormComponent', () => {
  let component: RecentProceduresFormComponent;
  let fixture: ComponentFixture<RecentProceduresFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentProceduresFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecentProceduresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
