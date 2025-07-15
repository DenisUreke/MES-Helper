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

  findReferencedEntities(procedureName: string): string {
    if (!procedureName) return '';

    const sql = `SELECT 
    dre.referenced_schema_name,
    dre.referenced_entity_name,
    dre.referenced_minor_name,
    dre.is_ambiguous,
    o.type_desc AS referenced_entity_type
    FROM sys.dm_sql_referenced_entities('${procedureName}', 'OBJECT') AS dre
    LEFT JOIN sys.objects AS o
    ON OBJECT_ID(QUOTENAME(dre.referenced_schema_name) + '.' + QUOTENAME(dre.referenced_entity_name)) = o.object_id;`.trim();

    return sql;
  }

  findProceduresByVariable(variableName: string): string {
    if (!variableName) return '';

    const sql = `SELECT OBJECT_NAME(sm.object_id) AS procedure_name, sm.definition
    FROM sys.sql_modules AS sm
    JOIN sys.objects AS o ON sm.object_id = o.object_id
    WHERE sm.definition LIKE '%${variableName}%';`.trim();

    return sql;
  }

  findProceduresReferencingProcedure(procedureName: string): string {
    if (!procedureName) return '';

    const sql = `SELECT OBJECT_NAME(object_id) AS procedure_name 
    FROM sys.sql_modules
    WHERE definition LIKE '%${procedureName}%'
    AND OBJECTPROPERTY(object_id, 'IsProcedure') = 1;`.trim();

    return sql;
  }

  findProceduresByColumnName(columnName: string): string {
    if (!columnName) return '';

    const sql = `SELECT OBJECT_NAME(sm.object_id) AS procedure_name 
    FROM sys.sql_modules sm
    JOIN sys.objects o ON sm.object_id = o.object_id
    WHERE sm.definition LIKE '%${columnName}%'
    AND o.type = 'P';`.trim();

    return sql;
  }

  findRecentlyModifiedProcedures(daysBack: number): string {
    if (!daysBack || daysBack < 0) return '';

    return `SELECT name, modify_date
    FROM sys.procedures
    WHERE DATEDIFF(DAY, modify_date, GETDATE()) <= ${daysBack};`.trim();
  }

  findObjectsUsingEntity(entityName: string): string {
  if (!entityName) return '';

  return `SELECT 
    OBJECT_NAME(referencing_id) AS referencing_object,
    referenced_entity_name
    FROM sys.sql_expression_dependencies
    WHERE referenced_entity_name = '${entityName}';`.trim();
}




}
