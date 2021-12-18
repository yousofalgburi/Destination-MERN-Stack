import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    selectedFile: String,
    likes: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

let Post = mongoose.model('Post', postSchema)

export default Post