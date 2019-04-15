const mongoose = require('mongoose');
const DB = require('../config/keys').MONGO_URI;

mongoose.Promise = global.Promise;

mongoose.connect(DB, { useNewUrlParser: true })
.then(() => console.log(`Connected to DB`))
.catch(err => console.log(err));

//Called hooks which runs before something.
beforeEach((done) => {
  mongoose.connection.collections.posts.drop(() => {
    //Runs after the drop is completed
    done(); // Everything is done
  })

});
