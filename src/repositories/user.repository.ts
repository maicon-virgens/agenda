//realizar as operações no banco de dados
//contato direto com o prisma
import { prisma } from "../database/prisma-client.js";
import {User, UserCreate, UserRepository} from "../interfaces/user.interface.js";

class UserRepositoryPrisma implements UserRepository{
    async create(data: UserCreate): Promise<User> {
        
        const result = await prisma.user.create({
          data: {
            name: data.name,
            email: data.email,
          },
        });
        return result;
    }
    async findByEmail(email: string): Promise<User | null>{
        const result = await prisma.user.findFirst({
            where:{
                email,
            }
        });

        return result || null;

    }
}

export {UserRepositoryPrisma}