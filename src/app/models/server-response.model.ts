export interface ServerResponse<T> {
    status: boolean;
    message: string;
    error?: any;
    data?: T;
}
