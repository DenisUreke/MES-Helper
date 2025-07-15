import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlParserModalComponent } from './xml-parser-modal.component';

describe('XmlParserModalComponent', () => {
  let component: XmlParserModalComponent;
  let fixture: ComponentFixture<XmlParserModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmlParserModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(XmlParserModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
