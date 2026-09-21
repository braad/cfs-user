import React, {useState} from 'react';
// import logo from './logo.svg';
// import './App.css';
import UserMenu from './Components/UserMenu';
import UserList from './Components/UserList';
import CreateUserComponent from './Components/CreateUser';

type CurrentPage = 'list' | 'create';

const App = () => {

  const [currentPage, setCurrentPage] = useState<CurrentPage>('list');

  const handleCreateUserSuccess = (userName: string) => {
    console.log('created success ', userName);
    setCurrentPage('list');
    // display success toaster
  }

  return (
    <div style={{ padding: '20px' }}>

      <UserMenu activeMenu={currentPage} onSelectMenu={setCurrentPage} />

      {currentPage === 'list' ? (
          <UserList />
      ) : (
        <CreateUserComponent 
          onBack={() => setCurrentPage('list')} 
          onSuccess={handleCreateUserSuccess}
        />
      )}
    </div>
  );
}

export default App;
