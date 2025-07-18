import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// Define a type for the form options
export interface FormOption {
  id: string;
  name: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class DropDownBarService {
  // Define the available form options
  private formOptions: FormOption[] = [
    {
      id: 'tablesByColumnName',
      name: 'Find Tables with Specific Column',
      description: 'Locate tables that contain a specific column name'
    },
    {
      id: 'tablesWithTwoColumns',
      name: 'Find Tables with Two Specific Columns',
      description: 'Locate tables that contain two specific column names'
    },
    {
      id: 'columnDataType',
      name: 'Find Tables by Column and Data Type',
      description: 'Locate tables with columns of a specific data type'
    },
    {
      id: 'columnPattern',
      name: 'Find Tables by Column Pattern',
      description: 'Find tables with columns matching a specific pattern'
    },
    {
      id: 'referencedEntities',
      name: 'Find Procedure Dependencies',
      description: 'Get objects the procedure depends on and uses'
    },
    {
      id: 'variableUsage',
      name: 'Find Procedure that Uses a Specific Variable',
      description: 'Find stored procedures that use a specific variable name'
    },
    {
      id: 'proceduresReferencingProcedure',
      name: 'Find Procedures Referencing Another Procedure',
      description: 'Find stored procedures that call or reference a specific procedure'
    },
    {
      id: 'proceduresUsingColumn',
      name: 'Find Procedures Using Column Name',
      description: 'Find stored procedures that reference a specific column name'
    },
    {
      id: 'recentProcedures',
      name: 'Find Recently Modified Procedures',
      description: 'List stored procedures modified in the last 30 days'
    },
    {
      id: 'objectsUsingEntity',
      name: 'Find Objects Using a Table or Procedure',
      description: 'List stored procedures, views, or functions that reference a specific table or procedure'
    }


  ];

  // Rest of your service code remains the same
  private selectedFormSource = new BehaviorSubject<string>(this.formOptions[0].id);
  currentForm$: Observable<string> = this.selectedFormSource.asObservable();

  constructor() { }

  selectForm(formId: string): void {
    if (this.formOptions.some(option => option.id === formId)) {
      this.selectedFormSource.next(formId);
    }
  }

  getFormOptions(): FormOption[] {
    return [...this.formOptions];
  }

  getFormOptionById(id: string): FormOption | undefined {
    return this.formOptions.find(option => option.id === id);
  }

  getCurrentFormId(): string {
    return this.selectedFormSource.getValue();
  }
}
