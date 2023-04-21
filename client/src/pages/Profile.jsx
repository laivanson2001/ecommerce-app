import React, { useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Container from "../components/Container";
import { object, string } from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/user/userSlice";
import { FiEdit } from "react-icons/fi";

const profileSchema = object({
	name: string().required("Tên không được để trống"),
	email: string().email("Email không hợp lệ").required("Email trống"),
	mobile: string().required("Số điện thoại không được để trống"),
});

const Profile = () => {
	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.auth);

	const [editUser, setEditUser] = useState(true);

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			name: user.name,
			mobile: user.mobile,
			email: user.email,
		},
		validationSchema: profileSchema,
		onSubmit: (values) => {
			dispatch(updateUser(values));
			setEditUser(true);
		},
	});

	return (
		<>
			<BreadCrumb title='Trang cá nhân' />
			<Container class1='cart-wrapper home-wrapper-2 py-5'>
				<div className='row'>
					<div className='col-12'>
						<div className='d-flex align-content-center justify-content-between'>
							<h3>Cập nhật tài khoản</h3>
							<FiEdit
								className='fs-4'
								onClick={() => setEditUser(false)}
								role='button'
							/>
						</div>
					</div>
					<div className='col-12'>
						<form onSubmit={formik.handleSubmit}>
							<div className='mb-3'>
								<label htmlFor='name' className='form-label'>
									Họ tên
								</label>
								<input
									type='text'
									className='form-control'
									id='name'
									name='name'
									defaultValue={formik.values.name}
									onChange={formik.handleChange("name")}
									onBlur={formik.handleBlur("name")}
									disabled={editUser}
								/>
								<div className='error'>
									{formik.touched.name && formik.errors.name}
								</div>
							</div>
							<div className='mb-3'>
								<label htmlFor='mobile' className='form-label'>
									Số điện thoại
								</label>
								<input
									type='text'
									className='form-control'
									id='mobile'
									name='mobile'
									defaultValue={formik.values.mobile}
									onChange={formik.handleChange("mobile")}
									onBlur={formik.handleBlur("mobile")}
									disabled={editUser}
								/>
								<div className='error'>
									{formik.touched.mobile &&
										formik.errors.mobile}
								</div>
							</div>
							<div className='mb-3'>
								<label
									htmlFor='exampleInputEmail1'
									className='form-label'
								>
									Email
								</label>
								<input
									type='email'
									className='form-control'
									id='email'
									name='email'
									defaultValue={formik.values.email}
									onChange={formik.handleChange("email")}
									onBlur={formik.handleBlur("email")}
									disabled={editUser}
								/>
								<div className='error'>
									{formik.touched.email &&
										formik.errors.email}
								</div>
							</div>
							{!editUser && (
								<button
									type='submit'
									className='btn btn-primary'
								>
									Lưu lại
								</button>
							)}
						</form>
					</div>
				</div>
			</Container>
		</>
	);
};

export default Profile;
