import { Product, User } from "./types";

export type MessageResponse = {
    success:boolean;
    message:string;
};

export type UserResponse = {
    success:boolean;
    message:User;
};

export type AllProductsResponse = {
    success:boolean;
    message:Product[];
};