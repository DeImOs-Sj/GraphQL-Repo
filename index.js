import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { ApolloServerPluginInlineTrace } from "apollo-server-core";

import db from "./_db.js"

const resolvers = {
    Query: {
        games() {
            return db.games
        },
        reviews() {
            return db.reviews
        },
        authors() {
            return db.authors
        }
    }
}

//server setup 
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginInlineTrace()],

})

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log('server ready at port ', 4000)