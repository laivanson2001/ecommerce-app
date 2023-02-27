import React from 'react'
import { Link } from 'react-router-dom';

const BlogCard = () => {
    return (
        <div className="blog-card">
            <div className="card-image">
                <img src="images/blog-1.jpg" className="img-fluid w-100" alt="blog" />
            </div>
            <div className="blog-content">
                <p className="date">24 tháng 02, 2023</p>
                <h5 className="title">Lorem ipsum dolor sit amet</h5>
                <p className="desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quaerat
                    accusamus official
                </p>
                <Link to="/blog/:id" className="button">
                    Xem thêm
                </Link>
            </div>
        </div>
    );
}

export default BlogCard