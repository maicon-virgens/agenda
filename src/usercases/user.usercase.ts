//fica todas as regras de negocio
//toda logica

import { User } from "@prisma/client";
import { UserCreate, UserRepository } from "../interfaces/user.interface.js";
import { UserRepositoryPrisma } from "../repositories/user.repository.js";

class UserUseCase{
    private userRepository: UserRepository

    constructor(){
        this.userRepository = new UserRepositoryPrisma();
    }

    async create({ name, email }: UserCreate): Promise<User>{
        
        const virifyIfUserWxists = await this.userRepository.findByEmail(email);

        if(virifyIfUserWxists){
            throw new Error('User already exists');
        }

        const result = await this.userRepository.create({ email, name });

        return result;
    }

}

export {UserUseCase}