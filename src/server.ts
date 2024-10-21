import fastify, { FastifyInstance } from "fastify";
import { contactRoutes } from './routes/contact.routes.js'
import {userRoutes} from './routes/user.routes.js';

const app: FastifyInstance = fastify();

app.register(userRoutes, {
    prefix: '/users'
});

app.register(contactRoutes, {
    prefix: '/contacts',
});

app.listen({port: 3100}).then(()=>{
    console.log('HTTP server running!');
}); 