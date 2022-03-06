import React from 'react';

interface blogHeadProps {
    name: string
}
export default function BlogHead(props: blogHeadProps) {
    return(
        <div className="main-header">
            <div className="blog-header">
                <h1>{`${props.name} blog`}</h1>
            </div>
            <div className="new-post">
                <div className="new-post-btn">
                    <span className="material-icons">
                     add
                    </span>
                    <span className="btn-name">New Post</span>
                </div>
            </div>
        </div>
    )
}