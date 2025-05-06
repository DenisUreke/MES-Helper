import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenerateSqlService } from '../../services/generate-sql.service';
import { SqlQueryObservableService } from '../../services/sql-query-observable.service';
import { DropDownBarService } from '../../services/drop-down-bar.service';

@Component({
  selector: 'app-table-with-column-pattern',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './table-with-column-pattern.component.html',
  styleUrl: './table-with-column-pattern.component.css'
})
export class TableWithColumnPatternComponent implements OnInit {
  patternForm!: FormGroup;
  description: string = '';
  
  constructor(
    private fb: FormBuilder,
    private generateSqlService: GenerateSqlService,
    private sqlQueryObservable: SqlQueryObservableService,
    private dropdownService: DropDownBarService
  ) {}
  
  ngOnInit(): void {
    // Initialize form
    this.patternForm = this.fb.group({
      pattern: ['', Validators.required]
    });
    
    // Get description from service
    const formOption = this.dropdownService.getFormOptionById('columnPattern');
    if (formOption) {
      this.description = formOption.description;
    }
  }
  
  onSubmit(): void {
    if (this.patternForm.invalid) {
      return;
    }
    
    const { pattern } = this.patternForm.value;
    const sqlQuery = this.generateSqlService.findTablesByColumnPattern(pattern);
    this.sqlQueryObservable.updateSqlQuery(sqlQuery);
  }
}
