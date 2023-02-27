import React, { useState } from 'react'
import ReactStars from 'react-rating-stars-component'
import BreadCrumb from '../components/BreadCrumb'
import Color from '../components/Color'
import Container from '../components/Container'
import Meta from '../components/Meta'
import ProductCard from '../components/ProductCard'

const OurStore = () => {
    const [grid, setGrid] = useState(4);
    return (
        <>
            <Meta title="Cửa hàng" />
            <BreadCrumb title="Cửa hàng" />
            <Container class1="store-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-3">
                        <div className="filter-card mb-3">
                            <h3 className="filter-title">Danh mục</h3>
                            <div>
                                <ul className="ps-0">
                                    <li>Đồng hồ</li>
                                    <li>TV</li>
                                    <li>Máy ảnh</li>
                                    <li>Laptop</li>
                                </ul>
                            </div>
                        </div>
                        <div className="filter-card mb-3">
                            <h3 className="filter-title">Bộ lọc:</h3>
                            <div>
                                <h5 className="sub-title">Khả dụng</h5>
                                <div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id=""
                                        />
                                        <label className="form-check-label" htmlFor="">
                                            Còn hàng (1)
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id=""
                                        />
                                        <label className="form-check-label" htmlFor="">
                                            Hết hàng (0)
                                        </label>
                                    </div>
                                </div>
                                <h5 className="sub-title">Giá tiền</h5>
                                <div className="d-flex align-items-center gap-10">
                                    <div className="form-floating">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="floatingInput"
                                            placeholder="Từ"
                                        />
                                        <label htmlFor="floatingInput">Từ</label>
                                    </div>
                                    <div className="form-floating">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="floatingInput1"
                                            placeholder="Đến"
                                        />
                                        <label htmlFor="floatingInput1">Đến</label>
                                    </div>
                                </div>
                                <h5 className="sub-title">Màu sắc</h5>
                                <div>
                                    <Color />
                                </div>
                                <h5 className="sub-title">Kích cỡ</h5>
                                <div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="color-1"
                                        />
                                        <label className="form-check-label" htmlFor="color-1">
                                            S (2)
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value=""
                                            id="color-2"
                                        />
                                        <label className="form-check-label" htmlFor="color-2">
                                            M (2)
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="filter-card mb-3">
                            <h3 className="filter-title">Tags</h3>
                            <div>
                                <div className="product-tags d-flex flex-wrap align-items-center gap-10">
                                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                                        Tai nghe
                                    </span>
                                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                                        Laptop
                                    </span>
                                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                                        Điện thoại
                                    </span>
                                    <span className="badge bg-light text-secondary rounded-3 py-2 px-3">
                                        Loa
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="filter-card mb-3">
                            <h3 className="filter-title">Gợi ý</h3>
                            <div>
                                <div className="random-products mb-3 d-flex">
                                    <div className="w-50">
                                        <img
                                            src="images/watch.jpg"
                                            className="img-fluid"
                                            alt="watch"
                                        />
                                    </div>
                                    <div className="w-50">
                                        <h5>
                                            Smart Watch
                                        </h5>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={4}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                        <b>2.000.000đ</b>
                                    </div>
                                </div>
                                <div className="random-products d-flex">
                                    <div className="w-50">
                                        <img
                                            src="images/watch.jpg"
                                            className="img-fluid"
                                            alt="watch"
                                        />
                                    </div>
                                    <div className="w-50">
                                        <h5>
                                            Smart Watch
                                        </h5>
                                        <ReactStars
                                            count={5}
                                            size={24}
                                            value={4}
                                            edit={false}
                                            activeColor="#ffd700"
                                        />
                                        <b>2.000.000đ</b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="filter-sort-grid mb-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center gap-10">
                                    <p className="mb-0 d-block" style={{ width: "160px" }}>
                                        Sắp xếp theo:
                                    </p>
                                    <select
                                        name=""
                                        defaultValue={"manula"}
                                        className="form-control form-select"
                                        id=""
                                    >
                                        <option value="manual">Phổ biến</option>
                                        <option value="best-selling">Bán chạy nhất</option>
                                        <option value="title-ascending">A-Z</option>
                                        <option value="title-descending">Z-A</option>
                                        <option value="price-ascending">Giá thấp đến cao</option>
                                        <option value="price-descending">Giá cao đến thấp</option>
                                        <option value="created-ascending">Mới nhất</option>
                                        <option value="created-descending">Cũ nhất</option>
                                    </select>
                                </div>
                                <div className="d-flex align-items-center gap-10">
                                    <p className="totalproducts mb-0">21 sản phẩm</p>
                                    <div className="d-flex gap-10 align-items-center grid">
                                        <img
                                            onClick={() => {
                                                setGrid(3);
                                            }}
                                            src="images/gr4.svg"
                                            className="d-block img-fluid"
                                            alt="grid"
                                        />
                                        <img
                                            onClick={() => {
                                                setGrid(4);
                                            }}
                                            src="images/gr3.svg"
                                            className="d-block img-fluid"
                                            alt="grid"
                                        />
                                        <img
                                            onClick={() => {
                                                setGrid(6);
                                            }}
                                            src="images/gr2.svg"
                                            className="d-block img-fluid"
                                            alt="grid"
                                        />

                                        <img
                                            onClick={() => {
                                                setGrid(12);
                                            }}
                                            src="images/gr.svg"
                                            className="d-block img-fluid"
                                            alt="grid"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="products-list pb-5">
                            <div className="d-flex gap-10 flex-wrap">
                                <ProductCard grid={grid} />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default OurStore