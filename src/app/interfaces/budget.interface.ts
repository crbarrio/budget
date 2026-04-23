export type BudgetOrderBy = 'date' | 'name' | 'total';

export type BudgetOrderDirection = 'asc' | 'desc';

export interface BudgetSort {
    orderBy: BudgetOrderBy;
    direction: BudgetOrderDirection;
}

export interface Budget {
    id: Date;
    name: string;
    telephone: string;
    email: string;
    services: Service[];
    total: number;
}

interface Service {
    id: number;
    price: number;
    name: string;
    subservices?: Subservice[];
}

interface Subservice {
    id: number;
    quantity: number;
    price: number;
    name: string;
}