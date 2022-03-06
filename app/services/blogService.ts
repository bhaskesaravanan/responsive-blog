import Blog from "../models/schema";

export async function getUserBlogs(userId: string){
    try {
        const blogs = await Blog.find({userId: userId});
        return blogs
    } catch (error) {
        return []
    }
}

export async function fetchUserBlogByPagination(userId: string, _id:string="", mode:string="gt") {
    interface queries {
        userId:string,
    }
    try {
        let queryParams:any = {
            userId: userId
        }
        if(_id) {
            if(mode==='gt')
                queryParams._id = {$gt: _id}
            else
                queryParams._id = {$lt: _id}
        }
        const blogs = await Blog.find(queryParams).limit(2);
        return blogs;
    } catch (error) {
        return[]    
    }
}

export async function getBlogById(blogId:string) {
    try {
        const blog = await Blog.findById(blogId);
        return blog;
    } catch (error) {
        return null;
    }

}