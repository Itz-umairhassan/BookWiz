import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import GithubIcon from '../icons/github.svg?react'

import TwitterIcon from '../icons/twitter.svg?react'
import { Label, Input, Button } from '@windmill/react-ui'
import { Context } from '../context/Context.jsx';


function Login() {

  const navigate=useNavigate();
  const [formData,setFormData]=useState();
  const [error,setErrorMessage]=useState(null);

  const {user,dispatch,isFetching}= useContext(Context)
   console.log(dispatch,Context)
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value.trim()})
  }

  const handleSubmit = async (event) => {
    console.log('formData = ', formData);
    event.preventDefault();
    if(!formData || !formData.email || !formData.password){
      return setErrorMessage("Please fill out all fields");
    }

    try {
      setErrorMessage(null);
      const res= await axios.post('/api/auth/signin',formData,{
        headers:{'Content-Type':'application/json'}
      });
      console.log("user credential",res)
       dispatch({type:"LOGIN_SUCCESS",payload:res.data});
       console.log(user)
      console.log('res = ', res)
      if(res.status==200){
        navigate('/app/folders',{replace:true});
      }

    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data["message"]);
      
    }
  };


  console.log(user)
  return (
  
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Login</h1>
              <Label>
                <span>Email</span>
                <Input className="mt-1" id="email" name="email" type="email" placeholder="john@doe.com"   onChange={handleChange} />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input className="mt-1" id="password" name="password" type="password" placeholder="***************"   onChange={handleChange}/>
              </Label>

              <Button onClick={handleSubmit} className="mt-4" block tag={Link} to="/app">
                Log in
              </Button>

              <hr className="my-8" />
              {/* <GithubIcon /> */}
              <Button block layout="outline">
                <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Github
              </Button>
              <Button className="mt-4" block layout="outline">
                <TwitterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Twitter
              </Button>

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/signup"
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
