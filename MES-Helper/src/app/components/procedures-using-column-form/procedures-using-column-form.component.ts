import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenerateSqlService } from '../../services/generate-sql.service';
import { SqlQueryObservableService } from '../../services/sql-query-observable.service';
import { DropDownBarService } from '../../services/drop-down-bar.service';

@Component({
  selector: 'app-procedures-using-column-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './procedures-using-column-form.component.html',
  styleUrl: './procedures-using-column-form.component.css'
})
export class ProceduresUsingColumnFormComponent implements OnInit {
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
      columnName: ['', Validators.required]
    });

    const option = this.dropdownService.getFormOptionById('proceduresUsingColumn');
    if (option) this.description = option.description;
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const { columnName } = this.form.value;
    const sql = this.sqlService.findProceduresByColumnName(columnName);
    this.queryObservable.updateSqlQuery(sql);
  }
}
