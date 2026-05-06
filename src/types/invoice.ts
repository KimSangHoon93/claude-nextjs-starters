export type InvoiceStatus = 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';

export interface CompanyInfo {
    name: string;
    address: string;
    phone: string;
    email: string;
    businessNumber?: string;
}

export interface ClientInfo {
    name: string;
    address: string;
    phone: string;
    email: string;
    contactPerson?: string;
}

export interface InvoiceItem {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
    note?: string;
}

export interface Invoice {
    id: string;
    notionPageId: string;
    invoiceNumber: string;
    title: string;
    status: InvoiceStatus;
    issueDate: string;
    dueDate: string;
    company: CompanyInfo;
    client: ClientInfo;
    items: InvoiceItem[];
    subtotal: number;
    taxRate: number;
    taxAmount: number;
    total: number;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}
