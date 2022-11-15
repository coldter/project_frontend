export interface Student {
    _id?: string;
    name: string;
    department: string;
    address: string;
    joining_year: number;
    year: number;
    passing_year: number;
    email: string;
    phone: number;
    socials?: string[];
    image?: string;
}
