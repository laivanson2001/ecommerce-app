import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'

const Header = () => {
    return (
        <>
            <header className='header-top-strip py-3'>
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-6">
                            <p className='text-white mb-0'>Miễn phí vận chuyển đơn hàng từ 2.000.000đ</p>
                        </div>
                        <div className="col-6">
                            <p className='text-end text-white mb-0'>SĐT: <a className='text-white' href="tel:+84348232305">0348232305</a></p>
                        </div>
                    </div>
                </div>
            </header>
            <header className='header-upper py-3'>
                <div className="container-xxl">
                    <div className="row align-items-center">
                        <div className="col-2">
                            <h2>
                                <Link to='/' className='text-white'>Atomic</Link>
                            </h2>
                        </div>
                        <div className="col-5">
                            <div className="input-group">
                                <input type="text" className="form-control py-2" placeholder="Tìm kiếm sản phẩm..." aria-label="Recipient's username" aria-describedby="basic-addon2" />
                                <span className="input-group-text p-3" id="basic-addon2">
                                    <BsSearch className='fs-6' />
                                </span>
                            </div>
                        </div>
                        <div className="col-5">
                            <div className="header-upper-links d-flex align-items-center justify-content-between">
                                <div className="">
                                    <Link className='d-flex align-items-center gap-10 text-white'>
                                        <img src="images/compare.svg" alt="" />
                                        <p className='mb-0'>So sánh</p>
                                    </Link>
                                </div>
                                <div className="">
                                    <Link className='d-flex align-items-center gap-10 text-white'>
                                        <img src="images/wishlist.svg" alt="" />
                                        <p className='mb-0'>Yêu thích</p>
                                    </Link>
                                </div>
                                <div className="">
                                    <Link className='d-flex align-items-center gap-10 text-white'>
                                        <img src="images/user.svg" alt="" />
                                        <p className='mb-0'>Tài khoản</p>
                                    </Link>
                                </div>
                                <div className="">
                                    <Link className='d-flex align-items-center gap-10 text-white'>
                                        <img src="images/cart.svg" alt="" />
                                        <div className="d-flex flex-column gap-10">
                                            <span className='badge bg-white text-dark'>0</span>
                                            <p className='mb-0'>100000đ</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <header className='header-bottom py-3'>
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="menu-bottom d-flex align-items-center gap-30">
                                <div className="">
                                    <div className="dropdown">
                                        <button className="btn btn-secondary dropdown-toggle bg-transparent border-0 d-flex gap-15 align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src="images/menu.svg" alt="" />
                                            <span className='me-5 d-inline-block'>Danh mục</span>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item text-white" to="/">Action</Link></li>
                                            <li><Link className="dropdown-item text-white" to="/">Another action</Link></li>
                                            <li><Link className="dropdown-item text-white" to="/">Something else here</Link></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="menu-link ">
                                    <div className="d-flex align-items-center gap-15">
                                        <NavLink to='/'>Trang chủ</NavLink>
                                        <NavLink to='/product'>Cửa hàng</NavLink>
                                        <NavLink to='/blogs'>Tin tức</NavLink>
                                        <NavLink to='/contact'>Liên hệ</NavLink>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header