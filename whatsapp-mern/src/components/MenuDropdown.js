import React from 'react';
import '../css/dropdown.css'

const MenuDropDown = (props) => {
    return (
        <div className="dropdown">
            {props.children}
        </div>
    )
}

export default MenuDropDown