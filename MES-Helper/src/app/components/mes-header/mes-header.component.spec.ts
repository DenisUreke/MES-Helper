import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesHeaderComponent } from './mes-header.component';

describe('MesHeaderComponent', () => {
  let component: MesHeaderComponent;
  let fixture: ComponentFixture<MesHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
