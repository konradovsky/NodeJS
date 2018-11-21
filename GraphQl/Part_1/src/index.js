import { GraphQLServer} from 'graphql-yoga';

// Type definitions / Application schema
const typeDefs = `
    type Query {
        post: Post!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
    }
`
// Resorvers
const resolvers = {
    Query: {
        post() {
            return {
                id: '44521-xdcs3423-cxcvsa1234-344-51cfxsav',
                title: 'World War II',
                body: 'Lorem ipsum',
                published: true
            }
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