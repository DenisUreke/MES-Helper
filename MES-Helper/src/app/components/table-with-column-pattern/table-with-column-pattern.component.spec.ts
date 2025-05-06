import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWithColumnPatternComponent } from './table-with-column-pattern.component';

describe('TableWithColumnPatternComponent', () => {
  let component: TableWithColumnPatternComponent;
  let fixture: ComponentFixture<TableWithColumnPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableWithColumnPatternComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableWithColumnPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
