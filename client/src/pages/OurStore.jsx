import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";

const OurStore = () => {
	const dispatch = useDispatch();

	const productState = useSelector((state) => state.product);
	const { product } = productState;

	const [grid, setGrid] = useState(4);
	const [brands, setBrands] = useState([]);
	const [brand, setBrand] = useState(null);
	const [categories, setCategories] = useState([]);
	const [category, setCategory] = useState(null);
	const [tags, setTags] = useState([]);
	const [tag, setTag] = useState(null);
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(0);
	const [sort, setSort] = useState(null);

	const getProducts = () => {
		dispatch(
			getAllProducts({ brand, category, tag, minPrice, maxPrice, sort })
		);
	};

	useEffect(() => {
		getProducts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [brand, category, tag, minPrice, maxPrice, sort]);

	useEffect(() => {
		let brands = [];
		let categories = [];
		let tags = [];
		for (let i = 0; i < product.length; i++) {
			const item = product[i];
			brands.push(item.brand);
			categories.push(item.category);
			tags.push(item.tags);
		}
		setBrands(brands);
		setCategories(categories);
		setTags(tags);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [product]);

	console.log(tag);

	return (
		<>
			<Meta title='Cửa hàng' />
			<BreadCrumb title='Cửa hàng' />
			<Container class1='store-wrapper home-wrapper-2 py-5'>
				<div className='row'>
					<div className='col-3'>
						<div className='filter-card mb-3'>
							<h3 className='filter-title'>Danh mục</h3>
							<div>
								<ul className='ps-0'>
									{categories.length > 0 &&
										categories.map((item, i) => (
											<li
												key={i}
												onClick={() =>
													setCategory(item)
												}
											>
												{item}
											</li>
										))}
								</ul>
							</div>
						</div>
						<div className='filter-card mb-3'>
							<h3 className='filter-title'>Bộ lọc:</h3>
							<div>
								<h5 className='sub-title'>Giá tiền</h5>
								<div className='d-flex align-items-center gap-10'>
									<div className='form-floating'>
										<input
											type='number'
											className='form-control'
											id='floatingInput'
											placeholder='Từ'
											value={minPrice}
											onChange={(e) =>
												setMinPrice(e.target.value)
											}
										/>
										<label htmlFor='floatingInput'>
											Từ
										</label>
									</div>
									<div className='form-floating'>
										<input
											type='number'
											className='form-control'
											id='floatingInput1'
											placeholder='Đến'
											value={maxPrice}
											onChange={(e) =>
												setMaxPrice(e.target.value)
											}
										/>
										<label htmlFor='floatingInput1'>
											Đến
										</label>
									</div>
								</div>
							</div>
						</div>
						<div className='filter-card mb-3'>
							<h3 className='filter-title'>Tags</h3>
							<div>
								<div className='product-tags d-flex flex-wrap align-items-center gap-10'>
									{tags.length > 0 &&
										tags.map((item, i) => (
											<span
												key={i}
												role='button'
												onClick={() => setTag(item)}
												className='badge bg-light text-secondary rounded-3 py-2 px-3'
											>
												{item === "featured"
													? "Phổ biến"
													: item === "special"
													? "Đặc biệt"
													: "Nổi bật"}
											</span>
										))}
								</div>
							</div>
						</div>
						<div className='filter-card mb-3'>
							<h3 className='filter-title'>Thương hiệu</h3>
							<div>
								<div className='product-tags d-flex flex-wrap align-items-center gap-10'>
									{brands.length > 0 &&
										brands.map((item, i) => (
											<span
												key={i}
												role='button'
												onClick={() => setBrand(item)}
												className='badge bg-light text-secondary rounded-3 py-2 px-3'
											>
												{item}
											</span>
										))}
								</div>
							</div>
						</div>
					</div>
					<div className='col-9'>
						<div className='filter-sort-grid mb-4'>
							<div className='d-flex justify-content-between align-items-center'>
								<div className='d-flex align-items-center gap-10'>
									<p
										className='mb-0 d-block'
										style={{ width: "160px" }}
									>
										Sắp xếp theo:
									</p>
									<select
										name=''
										defaultValue={"title-ascending"}
										className='form-control form-select'
										id=''
										onChange={(e) =>
											setSort(e.target.value)
										}
									>
										<option value='title'>A-Z</option>
										<option value='-title'>Z-A</option>
										<option value='price'>
											Giá thấp đến cao
										</option>
										<option value='-price'>
											Giá cao đến thấp
										</option>
										<option value='created'>
											Mới nhất
										</option>
										<option value='-created'>
											Cũ nhất
										</option>
									</select>
								</div>
								<div className='d-flex align-items-center gap-10'>
									<p className='totalproducts mb-0'>
										21 sản phẩm
									</p>
									<div className='d-flex gap-10 align-items-center grid'>
										<img
											onClick={() => {
												setGrid(3);
											}}
											src='images/gr4.svg'
											className='d-block img-fluid'
											alt='grid'
										/>
										<img
											onClick={() => {
												setGrid(4);
											}}
											src='images/gr3.svg'
											className='d-block img-fluid'
											alt='grid'
										/>
										<img
											onClick={() => {
												setGrid(6);
											}}
											src='images/gr2.svg'
											className='d-block img-fluid'
											alt='grid'
										/>

										<img
											onClick={() => {
												setGrid(12);
											}}
											src='images/gr.svg'
											className='d-block img-fluid'
											alt='grid'
										/>
									</div>
								</div>
							</div>
						</div>
						<div className='products-list pb-5'>
							<div className='d-flex gap-10 flex-wrap'>
								<ProductCard
									grid={grid}
									data={product ? product : []}
								/>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
};

export default OurStore;
