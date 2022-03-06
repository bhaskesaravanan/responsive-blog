import mongoose from 'mongoose';
const {Schema}  = mongoose;

const blogSchema= new Schema({
    title: String,
    author: String,
    body: String,
    createdDate: {type: Date, default: Date.now()},
    updatedDate: {type: Date, default: Date.now(), set:()=>Date.now()},
    deleted: {type: Boolean, default: false},
    userId: String,
})

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
