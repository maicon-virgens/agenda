import { FastifyInstance } from "fastify";
import { ContactUseCase } from "../usercases/contact.usecase.js";
import { ContactCreate } from "../interfaces/contacts.interface.js";
import { authMiddleware } from "../middleware.ts/aut.middleware.js";


export async function contactRoutes(fastity: FastifyInstance){

    const contactUseCase = new ContactUseCase();

    fastity.addHook('preHandler', authMiddleware);

    fastity.post<{ Body: ContactCreate }>('/',async (req, reply)=>{

        const {name, email, phone} = req.body;

        const {emailUser} = req.headers['email'];

        try {
            const data = await contactUseCase.create({
                name,
                email,
                phone,
                userEmail: emailUser,
            });

            return reply.send(data);
            
        } catch (error) {
            reply.send(error);
        }
    });

}