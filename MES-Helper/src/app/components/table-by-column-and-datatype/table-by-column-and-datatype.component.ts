import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenerateSqlService } from '../../services/generate-sql.service';
import { SqlQueryObservableService } from '../../services/sql-query-observable.service';
import { DropDownBarService } from '../../services/drop-down-bar.service';

@Component({
  selector: 'app-table-by-column-and-datatype',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './table-by-column-and-datatype.component.html',
  styleUrl: './table-by-column-and-datatype.component.css'
})
export class TableByColumnAndDatatypeComponent implements OnInit {
  columnTypeForm!: FormGroup;
  description: string = '';
  
  constructor(
    private fb: FormBuilder,
    private generateSqlService: GenerateSqlService,
    private sqlQueryObservable: SqlQueryObservableService,
    private dropdownService: DropDownBarService
  ) {}
  
  ngOnInit(): void {
    // Initialize form
    this.columnTypeForm = this.fb.group({
      columnName: ['', Validators.required],
      dataType: ['', Validators.required]
    });
    
    // Get description from service
    const formOption = this.dropdownService.getFormOptionById('columnDataType');
    if (formOption) {
      this.description = formOption.description;
    }
  }
  
  onSubmit(): void {
    if (this.columnTypeForm.invalid) {
      return;
    }
    
    const { columnName, dataType } = this.columnTypeForm.value;
    const sqlQuery = this.generateSqlService.findTablesByColumnAndDataType(columnName, dataType);
    this.sqlQueryObservable.updateSqlQuery(sqlQuery);
  }
}