import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWithSameColumns2Component } from './table-with-same-columns-2.component';

describe('TableWithSameColumns2Component', () => {
  let component: TableWithSameColumns2Component;
  let fixture: ComponentFixture<TableWithSameColumns2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableWithSameColumns2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableWithSameColumns2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
