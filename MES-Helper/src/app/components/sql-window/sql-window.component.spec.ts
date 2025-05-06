import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlWindowComponent } from './sql-window.component';

describe('SqlWindowComponent', () => {
  let component: SqlWindowComponent;
  let fixture: ComponentFixture<SqlWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SqlWindowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SqlWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
