import { prisma } from "../database/prisma-client.js";
import { Contact, ContactCreate, ContactRepository, ContactCreateData } from "../interfaces/contacts.interface.js";

class ContactsRepositoryPrisma implements ContactRepository{
    
    create(data: ContactCreateData): Promise<Contact> {
       const result = await prisma.contacts.create({
        data:{
            email: data.email,
            name: data.name,
            phone: data.phone,
            userId: data.userId,
        },
       });

    }



    async findByEmailOrPhone(email: string, phone: string): Promise<Contact | null>{
        const result = await prisma.contacts.findFirst({
            where:{
                OR:[
                    {email},
                    {phone},
                ],
            },
        });

        return result || null;
    }

}

export 'ContactsRepositoryPrisma';