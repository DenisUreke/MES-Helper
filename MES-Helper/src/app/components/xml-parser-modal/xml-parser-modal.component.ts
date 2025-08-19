import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-xml-parser-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './xml-parser-modal.component.html',
  styleUrls: ['./xml-parser-modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class XmlParserModalComponent {
  @Output() close = new EventEmitter<void>();

  xmlInput1: string = '';
  xmlInput2: string = '';

  parsedHtml1: SafeHtml | null = null;
  parsedHtml2: SafeHtml | null = null;

  // Parsed objects and diff state
  parsedObj1: any = null;
  parsedObj2: any = null;
  diffHtml2: SafeHtml | null = null;

  showSecondInput = false;
  showDiff = false;

  error: string = '';

  constructor(private sanitizer: DomSanitizer) {}

  // Parse and render LEFT
  convertXml1(): void {
    const res = this.tryParseToObj(this.xmlInput1);
    if (!res.ok) {
      this.error = res.error!;
      this.parsedHtml1 = null;
      this.parsedObj1 = null;
      return;
    }
    this.parsedObj1 = res.obj;
    const htmlLines = this.flattenToLines(this.parsedObj1);
    this.parsedHtml1 = this.sanitizer.bypassSecurityTrustHtml(htmlLines.join('\n'));
    this.error = '';
  }

  // Parse and render RIGHT
  convertXml2(): void {
    const res = this.tryParseToObj(this.xmlInput2);
    if (!res.ok) {
      this.error = res.error!;
      this.parsedHtml2 = null;
      this.parsedObj2 = null;
      return;
    }
    this.parsedObj2 = res.obj;
    const htmlLines = this.flattenToLines(this.parsedObj2);
    this.parsedHtml2 = this.sanitizer.bypassSecurityTrustHtml(htmlLines.join('\n'));
    this.error = '';

    // Reset diff when right changes
    this.showDiff = false;
    this.diffHtml2 = null;
  }

  // Toggle diff highlighting on RIGHT vs LEFT
  toggleDiff(): void {
    if (!this.parsedObj1 || !this.parsedObj2) return;
    this.showDiff = !this.showDiff;
    if (this.showDiff) {
      const diffLines = this.diffFlatten(this.parsedObj1, this.parsedObj2);
      this.diffHtml2 = this.sanitizer.bypassSecurityTrustHtml(diffLines.join('\n'));
    }
  }

  // ---------- Parsing helpers ----------

  private tryParseToObj(xmlString: string): { ok: true; obj: any } | { ok: false; error: string } {
    try {
      const obj = this.parseXmlToObj(xmlString);
      return { ok: true, obj };
    } catch {
      return { ok: false, error: 'Failed to parse XML.' };
    }
  }

  private parseXmlToObj(xmlString: string): any {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, 'text/xml');
    const parserErr = xml.getElementsByTagName('parsererror')[0];
    if (parserErr) throw new Error('XML parser error');
    const root = xml.documentElement;
    return this.xmlToJson(root);
  }

  // Safer XML→JSON: only return raw text for true leaf nodes
  private xmlToJson(xml: Node): any {
    // Element node
    if (xml.nodeType === 1 && xml instanceof Element) {
      const obj: any = {};

      // attributes
      if (xml.attributes?.length > 0) {
        for (let j = 0; j < xml.attributes.length; j++) {
          const a = xml.attributes.item(j)!;
          obj[`@${a.nodeName}`] = a.nodeValue;
        }
      }

      // has any element children?
      let hasElementChildren = false;
      for (let i = 0; i < xml.childNodes.length; i++) {
        const n = xml.childNodes.item(i)!;
        if (n.nodeType === 1) { hasElementChildren = true; break; }
      }

      if (hasElementChildren) {
        // recurse into element children only
        for (let i = 0; i < xml.childNodes.length; i++) {
          const n = xml.childNodes.item(i)!;
          if (n.nodeType !== 1) continue; // skip text/whitespace
          const nodeName = n.nodeName;
          const value = this.xmlToJson(n);
          if (obj[nodeName]) {
            if (!Array.isArray(obj[nodeName])) obj[nodeName] = [obj[nodeName]];
            obj[nodeName].push(value);
          } else {
            obj[nodeName] = value;
          }
        }
        return obj;
      }

      // leaf (no element children): aggregate text
      let text = '';
      for (let i = 0; i < xml.childNodes.length; i++) {
        const n = xml.childNodes.item(i)!;
        if (n.nodeType === 3) text += (n.textContent ?? '');
      }
      const trimmed = text.trim();

      // keep both attributes and text if both exist
      if (Object.keys(obj).length > 0) {
        if (trimmed) obj['#text'] = trimmed;
        return obj;
      }

      return trimmed || '';
    }

    // Text node
    if (xml.nodeType === 3) {
      return (xml.textContent ?? '').trim();
    }

    return {};
  }

  // ---------- Rendering helpers ----------

  private flattenToLines(obj: any, indent: number = 0): string[] {
    const lines: string[] = [];
    const spacing = '  '.repeat(indent);

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || obj === null) {
      lines.push(`${spacing}<span class="key">value</span>: <span class="value">${obj === null ? 'null' : obj}</span>`);
      return lines;
    }

    for (const key in obj) {
      const value = obj[key];
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        lines.push(`${spacing}<span class="key">${key}</span>:`);
        lines.push(...this.flattenToLines(value, indent + 1));
      } else if (Array.isArray(value)) {
        lines.push(`${spacing}<span class="key">${key}</span>:`);
        value.forEach((item) => {
          lines.push(...this.flattenToLines(item, indent + 1));
        });
      } else {
        lines.push(`${spacing}<span class="key">${key}</span>: <span class="value">${value}</span>`);
      }
    }

    return lines;
  }

  // Deep-ish equality for primitives/arrays/objects
  private isEqual(a: any, b: any): boolean {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;

    if (typeof a !== 'object' || a === null || b === null) {
      return a === b;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!this.isEqual(a[i], b[i])) return false;
      }
      return true;
    }

    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    for (const k of aKeys) {
      if (!Object.prototype.hasOwnProperty.call(b, k)) return false;
      if (!this.isEqual(a[k], b[k])) return false;
    }
    return true;
  }

  // Diff-aware flattener: render RIGHT with highlights vs LEFT (no "item" labels)
  private diffFlatten(left: any, right: any, indent: number = 0, keyLabel?: string): string[] {
    const lines: string[] = [];
    const spacing = '  '.repeat(indent);

    // Primitive/null on right
    if (typeof right !== 'object' || right === null) {
      const changed = !this.isEqual(left, right);
      const cls = changed ? 'diff diff-changed' : '';
      const safeVal = (right === null ? 'null' : right);
      const label = keyLabel ?? 'value';
      lines.push(`${spacing}<span class="key ${cls}">${label}</span>: <span class="value ${cls}">${safeVal}</span>`);
      return lines;
    }

    // Top-level array on right (no labels)
    if (Array.isArray(right)) {
      const leftArr = Array.isArray(left) ? left : [];
      right.forEach((rItem, i) => {
        const lItem = i < leftArr.length ? leftArr[i] : undefined;
        lines.push(...this.diffFlatten(lItem, rItem, indent));
      });
      return lines;
    }

    // Object on right
    const rightKeys = Object.keys(right);
    for (const k of rightKeys) {
      const rVal = right[k];
      const lVal = (left && typeof left === 'object') ? left[k] : undefined;
      const added = typeof lVal === 'undefined';

      if (typeof rVal !== 'object' || rVal === null) {
        const changed = added || !this.isEqual(lVal, rVal);
        const cls = added ? 'diff diff-added' : (changed ? 'diff diff-changed' : '');
        const safeVal = (rVal === null ? 'null' : rVal);
        lines.push(`${spacing}<span class="key ${cls}">${k}</span>: <span class="value ${cls}">${safeVal}</span>`);
      } else if (Array.isArray(rVal)) {
        const lArr = Array.isArray(lVal) ? lVal : [];
        const headerCls = added ? 'diff diff-added' : '';
        lines.push(`${spacing}<span class="key ${headerCls}">${k}</span>:`);
        rVal.forEach((rItem, i) => {
          const lItem = i < lArr.length ? lArr[i] : undefined;
          lines.push(...this.diffFlatten(lItem, rItem, indent + 1));
        });
      } else {
        const subtreeChanged = added || !this.isEqual(lVal, rVal);
        const cls = subtreeChanged ? (added ? 'diff diff-added' : 'diff diff-changed') : '';
        lines.push(`${spacing}<span class="key ${cls}">${k}</span>:`);
        lines.push(...this.diffFlatten(lVal, rVal, indent + 1));
      }
    }

    return lines;
  }
}
