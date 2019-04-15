const mongoose = require('mongoose');
const { Schema } =  mongoose;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  bio: {
    type: String
  },
  recipesStored: [
    {
      title: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      instructions: {
        type: String,
        required: true
      },
      readyInMinutes: {
        type: String,
        required: true
      },
      id: {
        type: String,
        required: true
      },
      servings: {
        type: String,
        required: true
      }
    }
  ]
})

const Profile = mongoose.model('profiles', profileSchema);

module.exports = Profile;
