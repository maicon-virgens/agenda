import { ContactCreate, ContactRepository } from '../interfaces/contacts.interface.js';
import { UserRepository } from '../interfaces/user.interface.js';
import { ContactsRepositoryPrisma } from '../repositories/contacts.repository.js';
import { UserRepositoryPrisma } from '../repositories/user.repository.js';

class ContactUseCase{

    private contactRepository: ContactRepository;
    private userRepository: UserRepository

    constructor(){
        this.contactRepository = new ContactsRepositoryPrisma();
        this.userRepository = new UserRepositoryPrisma;
    }

    async create({email, name, phone, userEmail}: ContactCreate){
        //email do usuario logado
        //buscar o usuario pelo email
        //se não existir, retornar erro
        //se existir, criar contato
        //antes de criar o contato, validar se ele já existe pelo telefone ou email

        const user = await this.userRepository.findByEmail(userEmail);

        if(!user){
            throw new Error('user not found');
        }

        const verifyIfExistsContact = await this.contactRepository.findByEmailOrPhone(email, phone);

        if(verifyIfExistsContact){
            throw new Error('Contact already exists');
        }

        const contact = await this.contactRepository.create({
            email,
            name,
            phone,
            userId: user.id,
        });

        return contact;
    }
}

export {ContactUseCase};