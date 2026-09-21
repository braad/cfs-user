import React from 'react';

type CurrentPage = 'list' | 'create';

interface UserMenuProps {
  activeMenu: CurrentPage;
  onSelectMenu: (menu: CurrentPage) => void;
}

// Simple menu consisting of two options, List and Add, with the active option disabled

const UserMenu = ({activeMenu, onSelectMenu}:UserMenuProps) => {
  return (
    <nav className="navbar">
        <div>
            <button
                onClick={() => onSelectMenu('list')}
                style={{width: '60px', height: '25px, padding', marginRight: '10px'}}
                disabled={activeMenu === 'list'}
            >
                List
            </button>
            <button
                onClick={() => onSelectMenu('create')}
                style={{width: '60px', height: '25px'}}
                disabled={activeMenu === 'create'}
            >
                Add
            </button>
        </div>
    </nav>
    );
};

export default UserMenu;