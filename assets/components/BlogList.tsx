import React, {useEffect, useReducer} from 'react';
import * as Apis from '../Apis';

type blogs = {
    author: string,
    body: string,
    createdDate: string,
    deleted: boolean,
    title: string,
    updatedDate: string,
    userId: string,
    _id: string,
    _v: number
}

type state = {
    blogLists: Array<blogs>,
    offset: number,
    mode: string
}
type action = {
    type: string,
    blogs: [],
    offset: number,
    mode: string
}
const blogReducer = (state: state, action: action) => {
    switch (action.type) {
        case "addBlogs":
            return{
                ...state,
                blogLists: action.blogs,
                offset: action.offset, 
            };
    
        default:
            return {...state};
    }
}

interface blogListProps {
    userId: string
}

const initialState = {
    blogLists: [],
    offset: 0,
    mode: ""
}
export default function BlogList(props: blogListProps) {
    const [blogData, dispatch] = useReducer(blogReducer, initialState);
   
    useEffect(()=> {
        fetchBlogs();
    }, []);

    async function fetchBlogs() {
        let res = await Apis.getAllPosts(props.userId);
        console.log(res);
        if(!res||!res.success){
            console.log('fetching blog got failed');
            return
        }
        dispatch({
            type: "addBlogs",
            blogs: res.blogs,
            offset: res.blogs.length,
            mode: 'gt'
        });
        
    }
    return(
        <div className="post-container">
            {
                blogData.blogLists.map((blog, index)=> {
                    let updatedDate = new Date(blog.updatedDate);
                    let dateString = `${updatedDate.getDate()} ${updatedDate.toLocaleString('default',{
                        month: 'short'
                    })} ${updatedDate.getFullYear()}`
                    let body = {__html: blog.body}
                    return(
                        <div className="posts" key={index}>
                            <div className="blog-content">
                                <div className="post-img">
                                    <img src="../public/images/blog-new.png" alt="blog image"/>
                                </div>
                                <div className="post-content">
                                    <h3>{blog.title}</h3>
                                    <p className="read-more">Read more...</p>
                                    <p dangerouslySetInnerHTML={body}/>
                                    <p className="post-date">{dateString}</p>
                                </div>
                            </div> 
                        </div>
                    )
                })
            }   
        </div>
    )
}