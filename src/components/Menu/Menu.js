import React from 'react';
import './Menu.css';

const Menu = () => {
    return(<nav className={'menu'}>
        <button>Import</button>
        <button>Export</button>
        <button>Delete</button>
    </nav>);
};

export default Menu;
