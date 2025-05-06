import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SqlQueryObservableService } from '../../services/sql-query-observable.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sql-window',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sql-window.component.html',
  styleUrl: './sql-window.component.css'
})
export class SqlWindowComponent implements OnInit, OnDestroy {
  sqlQuery: string = '';
  private subscription: Subscription | null = null;
  isCopied: boolean = false;

  constructor(private sqlQueryService: SqlQueryObservableService) {}

  ngOnInit(): void {
    // Subscribe to the SQL query observable
    this.subscription = this.sqlQueryService.currentSqlQuery$.subscribe(query => {
      this.sqlQuery = query;
      // Reset copy status when new SQL is received
      this.isCopied = false;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  copyToClipboard(): void {
    if (!this.sqlQuery) return;
    
    navigator.clipboard.writeText(this.sqlQuery).then(() => {
      this.isCopied = true;
      
      // Reset the "Copied!" message after 3 seconds
      setTimeout(() => {
        this.isCopied = false;
      }, 3000);
    });
  }
}
