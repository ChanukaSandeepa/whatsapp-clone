import React from 'react';
import '../css/menuitem.css'

const MenuItem = ({ name, onClick }) => {
    return (
        <a href="#" onClick={onClick} className="menu-item">
            {name}
        </a>
    )
}

export default MenuItem
