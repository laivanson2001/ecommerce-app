import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <section className='home-wrapper-1 py-5'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-6'>
                            <div className="main-banner position-relative">
                                <img className='img-fluid rounded-3' src="images/main-banner-1.jpg" alt="" />
                                <div className="main-banner-content position-absolute">
                                    <h4>Chế độ chuyên nghiệp</h4>
                                    <h5>iPad S23+ Pro</h5>
                                    <div className="price mb-2">
                                        <span className="price-old">23.800.000đ</span><br />
                                        <span className="price-new">20.500.000đ</span>
                                    </div>
                                    <Link className='button'>Mua ngay</Link>
                                </div>
                            </div>
                        </div>
                        <div className='col-6'>
                            <div className="d-flex flex-wrap justify-content-between align-items-center gap-4">
                                <div className="small-banner position-relative">
                                    <img className='img-fluid rounded-3' src="images/catbanner-01.jpg" alt="" />
                                    <div className="small-banner-content position-absolute">
                                        <h4>Siêu giảm giá</h4>
                                        <h5>Laptops Max</h5>
                                        <div className="price mb-2">
                                            <span className="price-old">40.500.000đ</span><br />
                                            <span className="price-new">34.999.000đ</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="small-banner position-relative">
                                    <img className='img-fluid rounded-3' src="images/catbanner-03.jpg" alt="" />
                                    <div className="small-banner-content position-absolute">
                                        <h4>Mới nhất</h4>
                                        <h5>iPad Air</h5>
                                        <div className="price mb-2">
                                            <span className="price-old">14.250.000đ</span><br />
                                            <span className="price-new">13.500.000đ</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="small-banner position-relative">
                                    <img className='img-fluid rounded-3' src="images/catbanner-02.jpg" alt="" />
                                    <div className="small-banner-content position-absolute">
                                        <h4>Giảm 15%</h4>
                                        <h5>Smartwatch 7</h5>
                                        <p>Kiểu dáng mới <br /> phong cách mới</p>
                                    </div>
                                </div>
                                <div className="small-banner position-relative">
                                    <img className='img-fluid rounded-3' src="images/catbanner-04.jpg" alt="" />
                                    <div className="small-banner-content position-absolute">
                                        <h4>Khắc miễn phí</h4>
                                        <h5>AirPods Max</h5>
                                        <p>Tạo sự khác biệt <br /> của bạn</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home