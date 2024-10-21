//parte mais interna do codigo

export interface Contact{
    id: string;
    name: string;
    email: string;
    phone: String;
    userId: String;
}

export interface ContactCreate{
    name: string;
    email: string;
    phone: String;
    userEmail: String;
}

export interface ContactCreateData{
    name: string;
    email: string;
    phone: String;
    userId: String;
}



export interface ContactRepository{
    create(data: ContactCreateData): Promise<Contact>;
    findByEmailOrPhone(email: string, phone: string): Promise<Contact | null>
}

