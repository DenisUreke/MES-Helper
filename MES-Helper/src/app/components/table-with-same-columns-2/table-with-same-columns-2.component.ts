import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenerateSqlService } from '../../services/generate-sql.service';
import { SqlQueryObservableService } from '../../services/sql-query-observable.service';
import { DropDownBarService } from '../../services/drop-down-bar.service';

@Component({
  selector: 'app-table-with-same-columns-2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './table-with-same-columns-2.component.html',
  styleUrl: './table-with-same-columns-2.component.css'
})
export class TableWithSameColumns2Component implements OnInit {
  columnForm!: FormGroup;
  description: string = '';
  
  constructor(
    private fb: FormBuilder,
    private generateSqlService: GenerateSqlService,
    private sqlQueryObservable: SqlQueryObservableService,
    private dropdownService: DropDownBarService
  ) {}
  
  ngOnInit(): void {
    // Initialize form
    this.columnForm = this.fb.group({
      column1: ['', Validators.required],
      column2: ['', Validators.required]
    });
    
    // Get description from service
    const formOption = this.dropdownService.getFormOptionById('tablesWithTwoColumns');
    if (formOption) {
      this.description = formOption.description;
    }
  }
  
  onSubmit(): void {
    if (this.columnForm.invalid) {
      return;
    }
    
    const { column1, column2 } = this.columnForm.value;
    const sqlQuery = this.generateSqlService.findTablesWithTwoSpecificColumns(column1, column2);
    this.sqlQueryObservable.updateSqlQuery(sqlQuery);
  }
}