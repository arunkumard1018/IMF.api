export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface Gadget {
    id: string;
    name: string;
    codename: string;
    status: string;
    decommissionedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}