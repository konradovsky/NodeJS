import { GraphQLServer} from 'graphql-yoga';
import uuidv4 from 'uuid/v4'
const users = [{
    id: '1',
    name: 'koyo',
    email: 'koyo@bun.bun',
    age: 13,
},
{
    id: '2',
    name: 'polly',
    email: 'polly@bun.bun',
    age: 12,
},
{
    id: '3',
    name: 'micke',
    email: 'micke@bun.bun',
    age: 55,
},
{
    id: '4',
    name: 'spirit',
    email: 'spirit@bun.bun',
    age: 22,
}]
const posts = [{
    id: '43',
    title: 'Vue is awesome',
    body: 'Lorem ipsum 1',
    published: true,
    author: '1'
},
{
    id: '3',
    title: 'Vuex',
    body: 'Lorem ipsum vuex ssd',
    published: true,
    author: '2'
},
{
    id: '243',
    title: 'GraphQl',
    body: 'Lorem ipsum dasd',
    published: false,
    author: '3'
}]
const comments = [{
    id: '1',
    author: '1',
    post: '43',
    text: 'Kill Bill Vol. 1'
},{
    id: '2',
    author: '2',
    post: '43',
    text: 'Kill Bill Vol. 2'
},{
    id: '3',
    author: '3',
    post: '43',
    text: 'Pulp Fiction'
},{
    id: '4',
    author: '4',
    post: '243',
    text: 'H8full Eight'
},{
    id: '5',
    author: '1',
    post: '243',
    text: 'Bękarty Wojny'
}]

// Type definitions / Application schema
const typeDefs = `
    type Query {
        users(query:String): [User!]!
        posts(query:String): [Post!]!
        comments(query:String): [Comment!]!
    }
    type Mutation {
        createUser(data: CreateUserInput!): User!
        createPost(data: CreatePostInput!): Post!
        createComment(data: CreateCommentInput!): Comment!
    }
    input CreateUserInput {
        name: String!, 
        email: String!, 
        age: Int
    }
    input CreatePostInput {
        title: String!, 
        body: String!, 
        published: Boolean!, 
        author: String!
    }
    input CreateCommentInput {
        text: String!, 
        author: String!, 
        post: String!
    }
    type Comment {
        id: ID!
        author: User!
        text: String!
        post: Post!
    }
    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }
    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }
`
// Resorvers
const resolvers = {
    Query: {
        comments(parent, args, ctx, info) {
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
    Mutation: {
        createUser(parent, args, ctx, info){
            const usedEmail = users.some(user => user.email === args.data.email)

            if(usedEmail) {
                throw new Error('This email is already used')
            }

            const user = {
                id: uuidv4(),
                ...args.data
            }

            users.push(user);
            return user;
        },
        createPost(parent, args, ctx, info){
            const existAuthor = users.some(user => user.id === args.data.author)

            if(!existAuthor){
                throw new Error('Author does not exist')
            }

            const post = {
                id: uuidv4(),
                ...args.data
            }

            posts.push(post)

            return post
        },
        createComment(parent, args, ctx, info){
            const existAuthor = users.some(user => user.id === args.data.author) 
            const existPost = posts.some(post => post.id === args.data.post && post.published)   

            if(!existAuthor && !existPost){
                throw new Error('Author does not exist')
            }

            const comment = {
                id: uuidv4(),
                ...args.data
            }

            comments.push(comment)

            return comment

            
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find(user => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment => {
                return comment.post === parent.id
            })
        }
    },
    User: {
        posts(parent, args, ctx, info){
            return posts.filter(post => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter(comment => {
                return comment.author === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info){
            return users.find(user => {
                return user.id === parent.author
            }) 
        },
        post(parent, args, ctx, info){
            return posts.find(post => {
                return post.id === parent.post
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('Server\'s up');
});