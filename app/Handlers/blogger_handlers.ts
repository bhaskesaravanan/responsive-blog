import express from 'express';
const router = express.Router();
import Blog from "../models/schema";
import {getUserBlogs, getBlogById, fetchUserBlogByPagination} from "../services/blogService";

router.get("/", function (req: any, res: any) {
    res.render("index");
  });

//fetch blogs
router.get("/fetch", async(req, res)=> {
    try {
        let userId = req.query.userId as string;
        const blogs = await getUserBlogs(userId);
        if(!blogs.length) {
            return res.status(404).json({
                success: false,
                error: 'blogs not found for the user',
            })
        }
        return res.status(200).json({
            success: true,
            blogs: blogs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'server got failed',
            message: error
        });
    }
})

//fetch blogs
router.get("/fetchBatch", async(req, res)=> {
    try {
        let userId = req.query.userId as string;
        let _id = req.query.previousId as string || "";
        let mode = req.query.mode as string || "gt"
        const blogs = await fetchUserBlogByPagination(userId, _id, mode);
        if(!blogs.length) {
            return res.status(404).json({
                success: false,
                error: 'blogs not found for the user',
            })
        }
        return res.status(200).json({
            success: true,
            blogs: blogs
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'server got failed',
            message: error
        });
    }
})

//save new blogs
router.post("/save", async(req, res) => {
    const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        body: req.body.blog,
        userId: req.body.userId,
    })
    try {
        const newBlog = await blog.save();
        return res.status(201).json({success: true, blog: newBlog})
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'server got failed',
            message: error
        })
    }
})

//update exist blog
router.patch("/save/:id", fetchBlog, async(req: any, res: any)=> {
    res.blog.title = req.body.title;
    res.blog.author = req.body.author;
    res.blog.body = req.body.blog;
    try {
        const newBlog = await res.blog.save();
        return res.status(200).json({success: true, blog: newBlog})
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'server got failed',
            message: error
        })
    }
});

router.delete("/delete/:id", fetchBlog, async(req: any, res: any) => {
    try {
        res.blog.remove();
        return res.status(200).json({success: true})
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'server got failed',
            message: error
        })
    }
})

async function fetchBlog(req:{params:{id:string}}, res:any, next: any) {
    let blog: object|null;
    try {
        let blogId = req.params.id;
        blog = await getBlogById(blogId);

        if(!blog) {
            return res.status(404).json({
                success: false,
                error: 'blogs not found for the user',
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'server got failed',
            message: error
        })
    }
    res.blog = blog;
    next(); 
}

module.exports = router;