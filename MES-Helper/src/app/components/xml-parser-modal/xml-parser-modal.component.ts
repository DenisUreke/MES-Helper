import { Component, EventEmitter, Output, ViewEncapsulation  } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-xml-parser-modal',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, FormsModule],
  templateUrl: './xml-parser-modal.component.html',
  styleUrl: './xml-parser-modal.component.css'
})
export class XmlParserModalComponent {
  @Output() close = new EventEmitter<void>();
  xmlInput: string = '';
  parsedHtml!: SafeHtml;

  error: string = '';

  constructor(private sanitizer: DomSanitizer) {}


convertXmlToTextFormat(): void {
  try {
    const parser = new DOMParser();
    const xml = parser.parseFromString(this.xmlInput, 'text/xml');
    const obj = this.xmlToJson(xml);
    const htmlLines = this.flattenToLines(obj);
    this.parsedHtml = this.sanitizer.bypassSecurityTrustHtml(htmlLines.join('\n'));
    this.error = '';
  } catch (e) {
    this.error = 'Failed to parse XML.';
    this.parsedHtml = '';
  }
}


  private xmlToJson(xml: Node): any {
    const obj: any = {};
    if (xml.nodeType === 1 && xml instanceof Element) {
      // Attributes
      if (xml.attributes.length > 0) {
        for (let j = 0; j < xml.attributes.length; j++) {
          const attribute = xml.attributes.item(j);
          if (attribute) {
            obj[`@${attribute.nodeName}`] = attribute.nodeValue;
          }
        }
      }
    }

    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const item = xml.childNodes.item(i);
        if (!item) continue;

        if (item.nodeType === 3) {
          const text = item.textContent?.trim();
          if (text) return text;
        } else if (item.nodeType === 1) {
          const nodeName = item.nodeName;
          const value = this.xmlToJson(item);
          if (obj[nodeName]) {
            if (!Array.isArray(obj[nodeName])) {
              obj[nodeName] = [obj[nodeName]];
            }
            obj[nodeName].push(value);
          } else {
            obj[nodeName] = value;
          }
        }
      }
    }

    return obj;
  }

  private flattenToLines(obj: any, indent: number = 0): string[] {
    const lines: string[] = [];
    const spacing = '  '.repeat(indent);

    if (typeof obj === 'string') {
      lines.push(`${spacing}<span class="key">value</span>: <span class="value">${obj}</span>`);
      return lines;
    }

    for (const key in obj) {
      const value = obj[key];
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        lines.push(`${spacing}<span class="key">${key}</span>:`);
        lines.push(...this.flattenToLines(value, indent + 1));
      } else if (Array.isArray(value)) {
        value.forEach((item) => {
          lines.push(`${spacing}<span class="key">${key}</span>:`);
          lines.push(...this.flattenToLines(item, indent + 1));
        });
      } else {
        lines.push(`${spacing}<span class="key">${key}</span>: <span class="value">${value}</span>`);
      }
    }

    return lines;
  }
}
