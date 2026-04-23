export interface NavItem {
    label: string;
    href: string;
    external?: boolean;
}

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags: string[];
    content: string;
}

export interface Feature {
    icon: React.ElementType;
    title: string;
    description: string;
}
