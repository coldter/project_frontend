export interface User {
    _id?: string;
    name: string;
    email: string;
    password: string;
    created_at?: string;
}

export interface Login {
    token: string;
    user: User;
}
