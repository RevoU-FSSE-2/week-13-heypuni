
export type ProductForm = Omit<Product, 'id' >

export interface Product {
    id: string;
    name: string;
    is_active: boolean;
}

export interface GetProductResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

export interface LoginResponse {
    email: string;
    password: string;
}

export interface RegisterResponse {
    name: string;
    email: string;
    password: string;
}