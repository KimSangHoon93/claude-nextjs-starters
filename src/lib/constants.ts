import type { InvoiceStatus } from '@/types/invoice';

export const NOTION_API_VERSION = '2022-06-28';

export const DEFAULT_TAX_RATE = 10;

export const DEFAULT_CURRENCY = 'KRW';

export const DATE_FORMAT = 'YYYY-MM-DD';

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
    draft: '임시저장',
    sent: '발송됨',
    accepted: '수락됨',
    rejected: '거절됨',
    expired: '만료됨',
};
