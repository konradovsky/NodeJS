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

const db = {
    users,
    posts,
    comments
}

export {db as default}