import type { Invoice } from './invoice';

export interface PdfGenerationOptions {
    filename?: string;
    orientation?: 'portrait' | 'landscape';
}

export interface PdfTemplateProps {
    invoice: Invoice;
    options?: PdfGenerationOptions;
}
