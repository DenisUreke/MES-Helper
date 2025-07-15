import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenerateSqlService } from '../../services/generate-sql.service';
import { SqlQueryObservableService } from '../../services/sql-query-observable.service';
import { DropDownBarService } from '../../services/drop-down-bar.service';

@Component({
  selector: 'app-procedures-referencing-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './procedures-referencing-form.component.html',
  styleUrl: './procedures-referencing-form.component.css'
})
export class ProceduresReferencingFormComponent implements OnInit {
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
      procedureName: ['', Validators.required]
    });

    const option = this.dropdownService.getFormOptionById('proceduresReferencingProcedure');
    if (option) this.description = option.description;
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const { procedureName } = this.form.value;
    const sql = this.sqlService.findProceduresReferencingProcedure(procedureName);
    this.queryObservable.updateSqlQuery(sql);
  }
}

