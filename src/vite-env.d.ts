/// <reference types="vite/client" />

declare module '*?raw' {
    const content: string;
    export default content;
}

declare module 'jspdf' {
  export class jsPDF {
    constructor(options?: any);
    internal: {
      pageSize: {
        getWidth(): number;
        getHeight(): number;
      };
    };
    setFillColor(r: number, g: number, b: number): this;
    setDrawColor(r: number, g: number, b: number): this;
    setTextColor(r: number, g: number, b: number): this;
    setFont(fontName: string, fontStyle?: string): this;
    setFontSize(size: number): this;
    rect(x: number, y: number, w: number, h: number, style?: string): this;
    line(x1: number, y1: number, x2: number, y2: number): this;
    text(text: string | string[], x: number, y: number, options?: any): this;
    splitTextToSize(text: string, maxW: number): string[];
    addPage(): this;
    setPage(pageNumber: number): this;
    getNumberOfPages(): number;
    save(filename: string): void;
  }
}
