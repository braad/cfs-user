import React, {useState} from 'react';
// import logo from './logo.svg';
// import './App.css';
import UserMenu from './Components/UserMenu';
import UserList from './Components/UserList';
import { CreateUserComponent } from './Components/CreateUser';

type CurrentPage = 'list' | 'create';

function App() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>('list');

  return (

    <div style={{ padding: '20px' }}>
      {currentPage === 'list' ? (
        <div>
          <button onClick={() => setCurrentPage('create')} style={{ float: 'right' }}>
            + Create New User
          </button>
          <UserList />
        </div>
      ) : (
        <CreateUserComponent onBack={() => setCurrentPage('list')} />
      )}
    </div>
  );
}

export default App;
