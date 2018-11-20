import { GraphQLServer} from 'graphql-yoga';

// Type definitions / Application schema
const typeDefs = `
    type Query {
        hello: String!
        name: String
    }
`
// Resorvers
const resolvers = {
    Query: {
        hello() {
            return 'This is my first query'
        },
        name() {
            return 'Konrad Efix'
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('The server is up');
});