import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

// Components
import { TableWithSameColumns1Component } from './components/table-with-same-columns-1/table-with-same-columns-1.component';
import { TableWithSameColumns2Component } from './components/table-with-same-columns-2/table-with-same-columns-2.component';
import { TableWithColumnPatternComponent } from './components/table-with-column-pattern/table-with-column-pattern.component';
import { TableByColumnAndDatatypeComponent } from './components/table-by-column-and-datatype/table-by-column-and-datatype.component';
import { ReferencedEntitiesFormComponent } from './components/referenced-enteties-form/referenced-enteties-form.component';
import { VariableUsageFormComponent } from './components/variable-usage-form/variable-usage-form.component';
import {ProceduresReferencingFormComponent} from './components/procedures-referencing-form/procedures-referencing-form.component';
import { ProceduresUsingColumnFormComponent } from './components/procedures-using-column-form/procedures-using-column-form.component';
import { RecentProceduresFormComponent } from './components/recent-procedures-form/recent-procedures-form.component';
import { ObjectsUsingEntityFormComponent } from './components/objects-using-entity-form/objects-using-entity-form.component';
import { XmlParserModalComponent } from './components/xml-parser-modal/xml-parser-modal.component';
import { SqlWindowComponent } from './components/sql-window/sql-window.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { MesHeaderComponent } from './components/mes-header/mes-header.component';

// Service
import { DropDownBarService } from './services/drop-down-bar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule,
    TableWithSameColumns1Component,
    TableWithSameColumns2Component, 
    SqlWindowComponent, 
    DropDownComponent,
    MesHeaderComponent,
    TableWithColumnPatternComponent,
    TableByColumnAndDatatypeComponent,
    ReferencedEntitiesFormComponent,
    VariableUsageFormComponent,
    ProceduresReferencingFormComponent,
    ProceduresUsingColumnFormComponent,
    RecentProceduresFormComponent,
    ObjectsUsingEntityFormComponent,
    XmlParserModalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'MES-Helper';
  currentFormId: string = '';
  showXmlParser = false;
  private subscription: Subscription | null = null;
  
  constructor(private dropdownService: DropDownBarService) {}
  
  ngOnInit(): void {
    // Get initial form selection
    this.currentFormId = this.dropdownService.getCurrentFormId();
    
    // Subscribe to changes in form selection
    this.subscription = this.dropdownService.currentForm$.subscribe(formId => {
      this.currentFormId = formId;
    });
  }
  
  ngOnDestroy(): void {
    // Clean up subscription
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}