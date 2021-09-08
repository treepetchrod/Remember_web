import React from 'react'
import "./mystory.css"
import Myposts from '../../components/myPosts/Myposts'
import Sidebar from '../../components/sidebar/Sidebar'

export default function MyStory() {
    return (
        <div className="myStory">
            <Myposts/>
            <Sidebar/>
        </div>
    )
}
