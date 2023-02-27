import React from "react";
import { Link } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import CustomInput from "../components/CustomInput";

const Login = () => {
  return (
    <>
      <Meta title={"Đăng nhập"} />
      <BreadCrumb title='Đăng nhập' />

      <Container class1='login-wrapper py-5 home-wrapper-2'>
        <div className='row'>
          <div className='col-12'>
            <div className='auth-card'>
              <h3 className='text-center mb-4'>Đăng Nhập</h3>
              <form
                action=''
                className='d-flex flex-column gap-15'
              >
                <CustomInput
                  type='email'
                  name='email'
                  placeholder='Email'
                />
                <CustomInput
                  type='password'
                  name='password'
                  placeholder='Mật khẩu'
                />
                <div>
                  <Link to='/forgot-password' className="ms-3 text-decoration-underline">
                    Quên mật khẩu?
                  </Link>
                  <div className='mt-3 d-flex justify-content-center gap-15 align-items-center'>
                    <button
                      className='button border-0'
                      type='submit'
                    >
                      Đăng nhập
                    </button>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <p className="m-0">Bạn chưa có tài khoản? {' '}
                      <Link
                        to='/signup'
                        className='text-decoration-underline'
                      >
                        Đăng ký
                      </Link></p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
