import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { Link } from 'react-router-dom'

const ProductCart = () => {
    return (
        <div className='col-3'>
            <Link className="product-card position-relative">
                <div className="wishlist-icon position-absolute">
                    <Link>
                        <img src="images/wish.svg" alt="" />
                    </Link>
                </div>
                <div className="product-image">
                    <img src="images/watch.jpg" alt="" />
                    <img src="images/watch.jpg" alt="" />
                </div>
                <div className="">
                    <div className="product-details">
                        <h6 className='brand'>Apple</h6>
                        <h5 className='product-title'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta</h5>
                        <ReactStars count={5} size={24} activeColor='#ffd700' value={4} edit={false} />
                        <p className='price'>2.000.000đ</p>
                    </div>
                </div>
                <div className="action-bar position-absolute">
                    <div className="d-flex flex-column gap-15">
                        <Link>
                            <img src="images/prodcompare.svg" alt="" />
                        </Link>
                        <Link>
                            <img src="images/view.svg" alt="" />
                        </Link>
                        <Link>
                            <img src="images/add-cart.svg" alt="" />
                        </Link>

                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProductCart