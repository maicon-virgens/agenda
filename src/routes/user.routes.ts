import { FastifyInstance } from "fastify";
import { UserCreate } from "../interfaces/user.interface.js";
import { UserUseCase } from "../usercases/user.usercase.js";


export async function userRoutes(fastity: FastifyInstance){

    const userUseCase = new UserUseCase();

    fastity.post<{ Body: UserCreate }>('/',async (req, reply)=>{

        const {name, email} = req.body;
        try {
            const data = await userUseCase.create({
                name,
                email,
            });

            return reply.send(data);
            
        } catch (error) {
            reply.send(error);
        }
    });

    fastity.get('/', (req, reply)=>{
        reply.send({hello: 'world'});

    })

}