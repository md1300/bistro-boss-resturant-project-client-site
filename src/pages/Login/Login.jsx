import React, { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../provider/AuthProdiver';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2'
import SocialLogin from '../../Components/SocialLogin/SocialLogin';

const Login = () => {
  
  const [disabled, setDisabled] = useState(true)
  const { signIn, } = useContext(AuthContext)
  const location=useLocation()
  const navigate=useNavigate()

  const from=location.state?.from.pathname || '/'

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, [])

  const handleLoginButton = e => {
    e.preventDefault()
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log({ email, password })
    signIn(email, password)
      .then(result => {
        Swal.fire("successfully log in");
        console.log(result.user)
        navigate(from,{replace:true})
      })
      .catch(error => console.log(error.message))
  }

  const handleCaptchaValidate = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false)
    }
    else {
      setDisabled(true)
    }

  }
  return (
    <>
      <Helmet>
        <title>bistro Boss | Log in</title>
      </Helmet>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content grid lg:grid-cols-2 gap-3 p-10 ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
              quasi. In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleLoginButton} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input type="text"  onBlur={handleCaptchaValidate} name='captcha' placeholder="type the captcha above" className="input input-bordered" required />
                
              </div>
              <p className='btn btn-link'><small><Link to='/signUp'>new here ? create a new account</Link></small></p>
              <div className="form-control mt-6">
                <input  className="btn  btn-primary" disabled={disabled} type="submit" value="Login" />
              </div>
            </form>
            <div className="divider"></div>
            <div className='p-8'>
            <SocialLogin/>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;