import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImageLight from '../assets/img/create-account-office.jpeg';
import ImageDark from '../assets/img/create-account-office-dark.jpeg';
import { GithubIcon, TwitterIcon } from '../icons';
import { Input, Label, Button } from '@windmill/react-ui';

function CreateAccount() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  console.log(formData)

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData || !formData.email || !formData.password) {
      return setErrorMessage("Please fill all the fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await axios.post('/api/auth/signup', formData, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(res);
      if (res.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      setErrorMessage(error.response.data['message']);
    } finally {
      setLoading(false);
    }
  };

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
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Create account
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
                    placeholder="johndoe123"
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
                    placeholder="john@doe.com"
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
                  {loading ? 'Creating account...' : 'Create account'}
                </Button>
              </form>
              <hr className="my-8" />
              <Button block layout="outline">
                <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Github
              </Button>
              <Button block className="mt-4" layout="outline">
                <TwitterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Twitter
              </Button>
              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
