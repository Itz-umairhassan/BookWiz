import React from 'react';
import './main.css';
import { assets } from '../../assets/assets';

const Main = () => {
    return (
        <div className='main'>
            <div className='nav'>
                <p>BookWiz</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container">
                <div className="greet">
                    <p><span>Welcome to BookWiz.</span></p>
                    <p>Let's chat with your personal documents !</p>
                </div>

                <div className="cards">
                    <div className="card">
                        <p>What is article 6 in Pakistan constitution ?</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>

                    <div className="card">
                        <p>Who is soverign in Pakistan Law.</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div>

                    <div className="card">
                        <p>Brainstorm team bonding activities for our work retreat</p>
                        <img src={assets.message_icon} alt="" />
                    </div>

                    <div className="card">
                        <p>Improve the readability of the following code</p>
                        <img src={assets.code_icon} alt="" />
                    </div>

                </div>
                <div className="main-bottom">
                    <div className="search-box">
                        <input type="text"  placeholder='Enter a prompt Here '/>
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <div className="bottom-info">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi similique fuga ad?
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
