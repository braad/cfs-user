import {useState} from 'react';
import UserMenu from './Components/UserMenu';
import UserList from './Components/UserList';
import CreateUserComponent from './Components/CreateUser';
import Toaster from './Components/Toaster';

type CurrentPage = 'list' | 'create';

const App = () => {

  const [currentPage, setCurrentPage] = useState<CurrentPage>('list');
  const [toasterMessage, setToasterMessage] = useState<string>('');

  const handleCreateUserSuccess = (userName: string) => {
    setCurrentPage('list');
    setToasterMessage('Created user: ' + userName);
  }

  return (
    <div style={{ padding: '20px', position: 'relative' }}>

      <UserMenu activeMenu={currentPage} onSelectMenu={setCurrentPage} />

      <Toaster message={toasterMessage} />

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
