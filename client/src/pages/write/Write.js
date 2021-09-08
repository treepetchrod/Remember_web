import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Writepost from '../../components/writepost/Writepost'
import './write.css'

export default function Write() {
    return (
        <div className="writePage">
            <Writepost/>
            <Sidebar/>
        </div>
    )
}
