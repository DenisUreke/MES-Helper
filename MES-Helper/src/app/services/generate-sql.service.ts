import { Injectable } from '@angular/core';
import { SqlQueryObservableService } from './sql-query-observable.service';


@Injectable({
  providedIn: 'root'
})
export class GenerateSqlService {

  constructor(private sqlQueryService: SqlQueryObservableService) { }

  /**
 * Find tables that have two specific columns
 * @param column1 First column name to match
 * @param column2 Second column name to match
 * @returns SQL query string
 */
  findTablesWithTwoSpecificColumns(column1: string, column2: string): string {
    if (!column1 || !column2) {
      return '';
    }

    const sql = `SELECT DISTINCT s.name AS SchemaName, t.name AS TableName
FROM sys.tables t
JOIN sys.schemas s ON s.schema_id = t.schema_id
INNER JOIN sys.columns col1 ON col1.object_id = t.object_id
INNER JOIN sys.columns col2 ON col2.object_id = t.object_id
WHERE col1.name = '${column1}' AND col2.name = '${column2}'
ORDER BY s.name, t.name;`;

    return sql;
  }

  /**
 * Find tables with columns of specific data type
 * @param columnName Name of the column
 * @param dataType Data type to match
 * @returns SQL query string
 */

  findTablesByColumnAndDataType(columnName: string, dataType: string): string {
    if (!columnName || !dataType) {
      return '';
    }

    const sql = `SELECT s.name AS SchemaName, t.name AS TableName
  FROM sys.tables t
  JOIN sys.schemas s ON s.schema_id = t.schema_id
  INNER JOIN sys.columns c ON c.object_id = t.object_id
  INNER JOIN sys.types ty ON ty.user_type_id = c.user_type_id
  WHERE c.name = '${columnName}' AND ty.name = '${dataType}'
  ORDER BY s.name, t.name;`;

    return sql;
  }

  /**
   * Find tables that contain a specific column
   * @param columnName The name of the column to search for
   * @returns SQL query string
   */
  findTablesByColumnName(columnName: string): string {
    if (!columnName) {
      return '';
    }

    const sql = `SELECT s.name AS SchemaName, t.name AS TableName
FROM sys.columns c
JOIN sys.tables t ON c.object_id = t.object_id
JOIN sys.schemas s ON t.schema_id = s.schema_id
WHERE c.name = '${columnName}'
ORDER BY s.name, t.name;`;

    return sql;
  }

  findTablesByColumnPattern(pattern: string): string {
    if (!pattern) {
      return '';
    }

    const sql = `SELECT s.name AS SchemaName, t.name AS TableName, c.name AS ColumnName
  FROM sys.tables t
  JOIN sys.schemas s ON s.schema_id = t.schema_id
  INNER JOIN sys.columns c ON c.object_id = t.object_id
  WHERE c.name LIKE '%${pattern}%'
  ORDER BY s.name, t.name, c.name;`;

    return sql;
  }
}
