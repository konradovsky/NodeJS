import { GraphQLServer} from 'graphql-yoga';


// Example users array

const users = [{
    id: '1',
    name: 'koyo',
    email: 'koyo@bun.bun',
    age: 13
},
{
    id: '13',
    name: 'polly',
    email: 'polly@bun.bun',
    age: 12
},
{
    id: '53',
    name: 'micke',
    email: 'micke@bun.bun',
}]
const posts = [{
    id: '43',
    title: 'Vue is awesome',
    body: 'Lorem ipsum 1',
    published: true
},
{
    id: '3',
    title: 'Vuex',
    body: 'Lorem ipsum vuex ssd',
    published: true
},
{
    id: '243',
    title: 'GraphQl',
    body: 'Lorem ipsum dasd',
    published: false
}]
// Type definitions / Application schema
const typeDefs = `
    type Query {
        users(query:String): [User!]!
        posts(query:String): [Post!]!
        me: User!
        post: Post!
    }
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
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
        users(parent, args, ctx, info){
            if(!args.query){
                return users
            } 
            return users.filter(user => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent,args,ctx,info){
            if(!args.query){
                return posts
            }
            return posts.filter(post => {
                return post.title.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        me() {
            return {
                id: '32',
                name: 'Konrad',
                email: "konrad.trade@gmail.com",
                age: 23
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