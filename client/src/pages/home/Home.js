import React from 'react'
import Allposts from '../../components/allPosts/Allposts'
import Sidebar from '../../components/sidebar/Sidebar'
import './home.css'

export default function Home() {
    return (
        <div>
            <div className="homePage">
                <Allposts/>
                <Sidebar/>
            </div>
            <footer><b>@Copyright 2021 by treepetch</b></footer>
        </div>
    )
}
