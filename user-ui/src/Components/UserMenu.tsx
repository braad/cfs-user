import React from 'react';

const UserMenu = () => {
  return (
    <nav className="navbar">
        <ul>
            <li style={{width:100}}>
                <a href="/">User List</a>
            </li>
            <li style={{width:100}}>
                <a href="/userView">New User</a>
            </li>
        </ul>
    </nav>
    );
};

export default UserMenu;