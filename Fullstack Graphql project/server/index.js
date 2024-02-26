const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const { default: axios } = require('axios')

async function startServer() {
    const app = express();
    const server = new ApolloServer({
        typeDefs: `
        type User{
                id: ID!,
                name:String!
                username:String!
                phone:Int!
                website:String!
                email:String

        }
            type Todo {
                id: ID!,
                title: String!
                completed: Boolean
                user:User
               

            }
            type Query {
                getTodos: [Todo]
                getAllUser:[User]
                getUserId(id:ID!):User
            }
        `,
        resolvers: {

            Todo: {
                user:async (todo) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.id}`)).data,
            },


            Query: {
                getTodos: async () => (await axios.get('https://jsonplaceholder.typicode.com/todos')).data,
                getAllUser: async () => (await axios.get('https://jsonplaceholder.typicode.com/users')).data,
                getUserId:async (parent,{id}) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data,
            }
        }
    });

    await server.start();

    app.use(bodyParser.json());
    app.use(cors());

    app.use("/graphql", expressMiddleware(server));
    app.listen(8000, () => console.log('Server started at 8000'));
}

startServer();