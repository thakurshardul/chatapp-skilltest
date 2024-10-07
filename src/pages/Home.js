import React from 'react'
import SideBar  from '../components/LeftView/SideBar';
import ChatPanel from '../components/RightView/ChatPanel';


const Home= ()=>{
    return (
        <div className='home'>
            <div className='container'>
                <SideBar/>
                <ChatPanel/>
            </div>
        </div>
    )
}

export default Home;