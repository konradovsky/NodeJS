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
    email: 'micke@bun.bun'
}]
const posts = [{
    id: '43',
    title: 'Vue is awesome',
    body: 'Lorem ipsum 1',
    published: true,
    author: '1',
},
{
    id: '3',
    title: 'Vuex',
    body: 'Lorem ipsum vuex ssd',
    published: true,
    author: '13',
},
{
    id: '243',
    title: 'GraphQl',
    body: 'Lorem ipsum dasd',
    published: false,
    author: '53',
}]

const comments = [{
    id: '1',
    text: 'Kill Bill Vol. 1'
},{
    id: '2',
    text: 'Kill Bill Vol. 2'
},{
    id: '3',
    text: 'Pulp Fiction'
},{
    id: '4',
    text: 'H8full Eight'
}]

// Type definitions / Application schema
const typeDefs = `
    type Query {
        users(query:String): [User!]!
        posts(query:String): [Post!]!
        comments: [Comment!]!
    }
    type Comment {
        id: ID!
        text: String!
    }
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }
`
// Resorvers
const resolvers = {
    Query: {
        comments() {
            return comments;
        },
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
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find(user => {
                return user.id === parent.author
            })
        }
    },
    User: {
        posts(parent, args, ctx, info){
            return posts.filter(post => {
                return post.author === parent.id
            })
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