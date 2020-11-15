const {ApolloServer, PubSub} = require('apollo-server');
const mongoose = require('mongoose');
const { MONGO_URI } = require('./configs');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const pubSub = new PubSub()
const server = new ApolloServer({typeDefs,resolvers,context:({req}) => ({req,pubSub})});

mongoose.connect(MONGO_URI,{ useNewUrlParser: true , useUnifiedTopology: true })
.then(() =>{
    console.log('connected to db');
    return server.listen({port:9090})})
.then(res =>{
    console.log('server running on'+res.url);
})