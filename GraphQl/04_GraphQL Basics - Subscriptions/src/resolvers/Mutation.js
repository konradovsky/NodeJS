import uuidv4 from 'uuid/v4'
const Mutation = {
    createUser(parent, args, {db}, info){
        const usedEmail = db.users.some(user => user.email === args.data.email)

        if(usedEmail) {
            throw new Error('This email is already used')
        }

        const user = {
            id: uuidv4(),
            ...args.data
        }

        db.users.push(user);
        return user;
    },
    deleteUser(parent, args, {db}, info){
        const userIndex = db.users.findIndex(user => user.id === args.id)

        if(userIndex === -1) {
            throw new Error('User not found')
        }

        const deletedUsers = db.users.splice(userIndex, 1)

        db.posts = db.posts.filter(post => {
            const match = post.author === args.id

            if(match){
                db.comments = db.comments.filter(comment => comment.author !== args.id)
            }

            return !match
        })

        db.comments = db.comments.filter(comment => comment.author !== args.id)

        return deletedUsers[0]
    },
    updateUser(parent, {id, data}, {db}, info){
        const user = db.users.find(user => user.id === id)

        if(!user){
            throw new Error('User not foud')
        }

        if(typeof data.email === 'string'){
            const emailTaken = db.users.some(user => user.email === data.email)

            if(emailTaken){
                throw new Error('Email is already taken')
            }

            user.email = data.email
        }

        if(typeof data.name === 'string'){
            user.name = data.name
        }

        if(typeof data.age !== 'undefined'){
            user.age = data.age
        }
        return user

    },

    createPost(parent, args, {db}, info){
        const existAuthor = db.users.some(user => user.id === args.data.author)

        if(!existAuthor){
            throw new Error('Author does not exist')
        }

        const post = {
            id: uuidv4(),
            ...args.data
        }

        db.posts.push(post)

        return post
    },
    deletePost(parent, args, {db}, info){
        const existPost = db.posts.findIndex(post => post.id === args.id)

        if(existPost === -1){
            throw new Error('Post doesn\'t exist')
        }

        const deletedPost = db.posts.splice(existPost, 1)            

        db.comments = db.comments.filter(comment => comment.post !== args.id)

        return deletedPost[0]
    },
    updatePost(parent, {id, data}, {db}, info){
        const post = db.posts.find(post => post.id === id)
        if(!post){
            throw new Error('Post not foud')
        }
        if(typeof data.title === 'string'){
            post.title = data.title
        }
        if(typeof data.body === 'string'){
            post.body = data.body
        }
        if(typeof data.published === 'boolean'){
            post.published = data.published
        }
        return post
    },

    createComment(parent, args, {db,  pubsub}, info){
        const existAuthor = db.users.some(user => user.id === args.data.author) 
        const existPost = db.posts.some(post => post.id === args.data.post && post.published)   

        if(!existAuthor && !existPost){
            throw new Error('Author does not exist')
        }

        const comment = {
            id: uuidv4(),
            ...args.data
        }

        db.comments.push(comment)
        pubsub.publish(`comment ${args.data.post}`, { comment })

        return comment
    },
    deleteComment(parent, args, {db}, info){
        const existComment = db.comments.findIndex(comment => comment.id === args.id)

        if(existComment === -1){
            throw new Error('Comment doesn\'t exist')
        }

        const deletedComments = db.comments.splice(existComment,1);

        return deletedComments[0]
    },
    updateComment(parent, {id, data}, {db}, info){
        const comment = db.comments.find(comment => comment.id === id)

        if(!comment){
            throw new Error('Comment don\'t found')
        }

        if(typeof data.text === 'string'){
            comment.text = data.text
        }

        return comment
    }
}

export {Mutation as default}