import React from 'react'
import Marquee from 'react-fast-marquee'
import { Link } from 'react-router-dom'
import BlogCard from '../components/BlogCard'

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
            <section className='home-wrapper-2 py-5'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className="service d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-15">
                                    <img src="images/service.png" alt="" />
                                    <div className="">
                                        <h6>Miễn phí vận chuyển</h6>
                                        <p className='mb-0'>Tất cả đơn hàng từ 2.000.000đ</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-15">
                                    <img src="images/service-02.png" alt="" />
                                    <div className="">
                                        <h6>Ưu đãi hàng ngày</h6>
                                        <p className='mb-0'>Tiết kiệm lên đến 25%</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-15">
                                    <img src="images/service-03.png" alt="" />
                                    <div className="">
                                        <h6>Hỗ trợ 24/7</h6>
                                        <p className='mb-0'>Mua sắm mọi lúc</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-15">
                                    <img src="images/service-04.png" alt="" />
                                    <div className="">
                                        <h6>Giá cả hợp lý</h6>
                                        <p className='mb-0'>Hàng từ nhà sản xuất</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center gap-15">
                                    <img src="images/service-05.png" alt="" />
                                    <div className="">
                                        <h6>Thanh toán an toàn</h6>
                                        <p className='mb-0'>Bảo mật 100%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='home-wrapper-2 py-5'>
                <div className='container-xxl'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className="categories d-flex justify-content-between align-items-center flex-wrap">
                                <div className="d-flex gap-30 align-items-center">
                                    <div className="">
                                        <h6>Máy ảnh</h6>
                                        <p>10 sản phẩm</p>
                                    </div>
                                    <img src="images/camera.jpg" alt="" />
                                </div>
                                <div className="d-flex gap-30 align-items-center">
                                    <div className="">
                                        <h6>Smart TV</h6>
                                        <p>10 sản phẩm</p>
                                    </div>
                                    <img src="images/tv.jpg" alt="" />
                                </div>
                                <div className="d-flex gap-30 align-items-center">
                                    <div className="">
                                        <h6>Tai nghe</h6>
                                        <p>10 sản phẩm</p>
                                    </div>
                                    <img src="images/headphone.jpg" alt="" />
                                </div>
                                <div className="d-flex gap-30 align-items-center">
                                    <div className="">
                                        <h6>Máy ảnh</h6>
                                        <p>10 sản phẩm</p>
                                    </div>
                                    <img src="images/camera.jpg" alt="" />
                                </div>
                                <div className="d-flex gap-30 align-items-center">
                                    <div className="">
                                        <h6>Máy ảnh</h6>
                                        <p>10 sản phẩm</p>
                                    </div>
                                    <img src="images/camera.jpg" alt="" />
                                </div>
                                <div className="d-flex gap-30 align-items-center">
                                    <div className="">
                                        <h6>Smart TV</h6>
                                        <p>10 sản phẩm</p>
                                    </div>
                                    <img src="images/tv.jpg" alt="" />
                                </div>
                                <div className="d-flex gap-30 align-items-center">
                                    <div className="">
                                        <h6>Tai nghe</h6>
                                        <p>10 sản phẩm</p>
                                    </div>
                                    <img src="images/headphone.jpg" alt="" />
                                </div>
                                <div className="d-flex gap-30 align-items-center">
                                    <div className="">
                                        <h6>Máy ảnh</h6>
                                        <p>10 sản phẩm</p>
                                    </div>
                                    <img src="images/camera.jpg" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='home-wrapper-2 marque-wrapper py-5'>
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <div className="marquee-inner-wrapper card-wrapper">
                                <Marquee className='d-flex'>
                                    <div className="mx-4 w-25">
                                        <img src="images/brand-01.png" alt="" />
                                    </div>
                                    <div className="mx-4 w-25">
                                        <img src="images/brand-02.png" alt="" />
                                    </div>
                                    <div className="mx-4 w-25">
                                        <img src="images/brand-03.png" alt="" />
                                    </div>
                                    <div className="mx-4 w-25">
                                        <img src="images/brand-04.png" alt="" />
                                    </div>
                                    <div className="mx-4 w-25">
                                        <img src="images/brand-05.png" alt="" />
                                    </div>
                                    <div className="mx-4 w-25">
                                        <img src="images/brand-06.png" alt="" />
                                    </div>
                                    <div className="mx-4 w-25">
                                        <img src="images/brand-07.png" alt="" />
                                    </div>
                                    <div className="mx-4 w-25">
                                        <img src="images/brand-08.png" alt="" />
                                    </div>
                                </Marquee>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='home-wrapper-2 blog-wrapper py-5'>
                <div className="container-xxl">
                    <div className="row">
                        <div className="col-12">
                            <h3 className="section-heading">Tin tức mới</h3>
                        </div>
                        <div className="col-3">
                            <BlogCard />
                        </div>
                        <div className="col-3">
                            <BlogCard />
                        </div>
                        <div className="col-3">
                            <BlogCard />
                        </div>
                        <div className="col-3">
                            <BlogCard />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home