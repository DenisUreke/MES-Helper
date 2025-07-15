import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GenerateSqlService } from '../../services/generate-sql.service';
import { SqlQueryObservableService } from '../../services/sql-query-observable.service';
import { DropDownBarService } from '../../services/drop-down-bar.service';

@Component({
  selector: 'app-variable-usage-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './variable-usage-form.component.html',
  styleUrl: './variable-usage-form.component.css'
})
export class VariableUsageFormComponent implements OnInit {
  form!: FormGroup;
  description = '';

  constructor(
    private fb: FormBuilder,
    private sqlService: GenerateSqlService,
    private queryObservable: SqlQueryObservableService,
    private dropdownService: DropDownBarService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      variableName: ['', Validators.required]
    });

    const option = this.dropdownService.getFormOptionById('variableUsage');
    if (option) this.description = option.description;
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const { variableName } = this.form.value;
    const sql = this.sqlService.findProceduresByVariable(variableName);
    this.queryObservable.updateSqlQuery(sql);
  }
}
