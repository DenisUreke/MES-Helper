import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWithSameColumns1Component } from './table-with-same-columns-1.component';

describe('TableWithSameColumns1Component', () => {
  let component: TableWithSameColumns1Component;
  let fixture: ComponentFixture<TableWithSameColumns1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableWithSameColumns1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableWithSameColumns1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
