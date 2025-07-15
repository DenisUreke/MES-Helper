import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerateSqlService } from '../../services/generate-sql.service';
import { SqlQueryObservableService } from '../../services/sql-query-observable.service';
import { DropDownBarService } from '../../services/drop-down-bar.service';

@Component({
  selector: 'app-recent-procedures-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recent-procedures-form.component.html',
  styleUrl: './recent-procedures-form.component.css'
})
export class RecentProceduresFormComponent implements OnInit {
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
      daysBack: [30, [Validators.required, Validators.min(1)]]
    });

    const option = this.dropdownService.getFormOptionById('recentProcedures');
    if (option) this.description = option.description;
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const { daysBack } = this.form.value;
    const sql = this.sqlService.findRecentlyModifiedProcedures(daysBack);
    this.queryObservable.updateSqlQuery(sql);
  }
}
