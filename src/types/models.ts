export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
}

export type GadgetStatus = 'Available' | 'Deployed' | 'Destroyed' | 'Decommissioned';

export interface Gadget {
    id: string;
    userId: string;
    name: string;
    codename: string;
    status: GadgetStatus;
    decommissionedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}