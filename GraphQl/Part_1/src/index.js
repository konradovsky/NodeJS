import { GraphQLServer} from 'graphql-yoga';

// Type definitions / Application schema
const typeDefs = `
    type Query {
        greeting(name: String): String!
        add(a: Float!, b:Float!): Float
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
        add(parent, args, ctx, info){
            if(args.a && args.b){
                return args.a + args.b
            } else {
                return null
            }
        },
        greeting(parent, args, ctx, info){
            if(args.name){
                return `Hello ${args.name}!`
            } else {
                return 'Hello'
            }
        },
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