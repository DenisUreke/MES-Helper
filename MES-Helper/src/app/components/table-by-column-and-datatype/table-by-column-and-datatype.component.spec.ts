import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableByColumnAndDatatypeComponent } from './table-by-column-and-datatype.component';

describe('TableByColumnAndDatatypeComponent', () => {
  let component: TableByColumnAndDatatypeComponent;
  let fixture: ComponentFixture<TableByColumnAndDatatypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableByColumnAndDatatypeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableByColumnAndDatatypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
