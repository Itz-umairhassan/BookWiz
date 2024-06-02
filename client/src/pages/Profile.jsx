import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImageLight from '../assets/img/create-account-office.jpeg';
import ImageDark from '../assets/img/create-account-office-dark.jpeg';
import { GithubIcon, TwitterIcon } from '../icons';
import { Input, Label, Button } from '@windmill/react-ui';
import { Context } from '../context/Context';

function Profile() {
  const {user,dispatch}=useContext(Context);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success,setSuccess]=useState(false);


 console.log("error",errorMessage)


  const navigate = useNavigate();
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  console.log(formData.username)
 
  const handleSubmit = async (event) => {
    event.preventDefault();

    if(!formData || !formData.username || !formData.email || !formData.password){
      setErrorMessage("Please fill all the fields")
      return;
    }
    dispatch({ type: "UPDATE_START" });
    try {
      setLoading(true);
      setErrorMessage(null);
      const updatedUser={
        userId:user._id,
        username:formData.username,
        email:formData.email,
        password:formData.password
      } 
      
      const res = await axios.put(`/api/auth/profile/${updatedUser.userId}`, updatedUser, {
        headers: { 'Content-Type': 'application/json' },
      });
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      console.log(res);
      setSuccess(true)
      
    } catch (error) {
      setErrorMessage(error.response.data['message']);
      dispatch({ type: "UPDATE_FAILURE" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full items-center max-w-4xl mx-auto overflow-hidden  rounded-lg shadow-xl">
        <div className="flex flex-col  mt-10 justify-center overflow-y-auto md:flex-row">
     
          <main className="flex items-center dark:bg-gray-800 justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Update account
              </h1>
              {errorMessage && (
                <p className="text-red-600">{errorMessage}</p>
              )}
              <form onSubmit={handleSubmit}>
              <Label>
                  <span>Username</span>
                  <Input
                    id="username"
                    name="email"
                    className="mt-1"
                    type="text"
                    placeholder={user.username}
                    onChange={handleChange}
                  />
                </Label>
                <Label>
                  <span>Email</span>
                  <Input
                    id="email"
                    name="email"
                    className="mt-1"
                    type="email"
                    placeholder={user.email}
                    onChange={handleChange}
                  />
                </Label>
                <Label className="mt-4">
                  <span>Password</span>
                  <Input
                    id="password"
                    name="password"
                    className="mt-1"
                    placeholder="***************"
                    type="password"
                    onChange={handleChange}
                  />
                </Label>

                <Label className="mt-6" check>
                  <Input type="checkbox" />
                  <span className="ml-2">
                    I agree to the <span className="underline">privacy policy</span>
                  </span>
                </Label>
                <Button type="submit" block className="mt-4" disabled={loading}>
                  {loading ? 'Creating account...' : 'Update'}
                </Button>
              </form>

            {success && (
              <div className='  ml-10 mt-4 items-center justify-center'>
                <span 
                
              style={{  color: "#53ff1a",fontSize:'15px', textAlign: "center", marginTop: "10px" }}
            >
              Profile has been updated...
            </span>
                </div>
            
          )}
             
              <hr className="my-8" />
            
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Profile;
