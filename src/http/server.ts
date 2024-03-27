import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod' //Lib para validação dos dados do body da requisição
import { createPoll } from './routes/create-poll';
import { create } from 'domain';
import { getPoll } from './routes/get-poll';
import { voteOnPoll } from './routes/vote-on-poll';
import cookie from '@fastify/cookie'
import websocket from '@fastify/websocket';
import { pollResults } from './ws/poll-results';

const app = fastify();

app.register(cookie, {
    secret: "my-secret",
    hook: 'onRequest',
});

app.register(websocket);

app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);
app.register(pollResults);

app.listen({ port: 3333}).then(() => {
    console.log('HTTP server running.')
})
