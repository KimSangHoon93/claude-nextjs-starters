export type NotionPropertyType =
    | 'title'
    | 'rich_text'
    | 'number'
    | 'select'
    | 'date'
    | 'relation'
    | 'formula';

export interface NotionRichText {
    plain_text: string;
    href?: string;
}

export interface NotionSelectOption {
    id: string;
    name: string;
    color: string;
}

export interface NotionDateValue {
    start: string;
    end?: string;
}

export type NotionPropertyValue =
    | { type: 'title'; title: NotionRichText[] }
    | { type: 'rich_text'; rich_text: NotionRichText[] }
    | { type: 'number'; number: number | null }
    | { type: 'select'; select: NotionSelectOption | null }
    | { type: 'date'; date: NotionDateValue | null }
    | { type: 'relation'; relation: { id: string }[] }
    | { type: 'formula'; formula: { type: string; string?: string; number?: number } };

export interface NotionPage {
    id: string;
    created_time: string;
    last_edited_time: string;
    properties: Record<string, NotionPropertyValue>;
}
