const assert = require('assert');
const Post = require('../model/Post');
//
// describe('Creating documents', () => {
//     it('creates a pokemon', (done) => {
//         //assertion is not included in mocha so
//         //require assert which was installed along with mocha
//         const poke = new Pokemon({ name: 'Pickachu' });
//         poke.save() //takes some time and returns a promise
//             .then(() => {
//                 assert(!poke.isNew); //if poke is saved to db it is not new
//                 done();
//             });
//     });
// });

describe('Creating Documents', () => {
  it('Creating a Post', (done) => {

    const newPost = new Post({
      user: '5c85a3ef4f194c319c21d6d6',
      text: 'Hello World',
      name: 'Random User',
    });

    newPost.save()
    .then(() => {
      assert(!newPost.isNew);
      done();
    })
    .catch(err => console.log(err))
  })
})
