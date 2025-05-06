import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenerateSqlService } from '../../services/generate-sql.service';
import { SqlQueryObservableService } from '../../services/sql-query-observable.service';
import { DropDownBarService } from '../../services/drop-down-bar.service';

@Component({
  selector: 'app-table-with-same-columns-1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './table-with-same-columns-1.component.html',
  styleUrl: './table-with-same-columns-1.component.css'
})
export class TableWithSameColumns1Component implements OnInit {
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
      columnName: ['', Validators.required]
    });
    
    // Get description from service
    const formOption = this.dropdownService.getFormOptionById('tablesByColumnName');
    if (formOption) {
      this.description = formOption.description;
    }
  }
  
  onSubmit(): void {
    if (this.columnForm.invalid) {
      return;
    }
    
    const { columnName } = this.columnForm.value;
    const sqlQuery = this.generateSqlService.findTablesByColumnName(columnName);
    this.sqlQueryObservable.updateSqlQuery(sqlQuery);
  }
}