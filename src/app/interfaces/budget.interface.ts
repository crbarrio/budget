export interface Budget {
    id: number;
    name: string;
    telephone: string;
    email: string;
    services: Service[];
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