import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import TodoListPage from './pages/TodoListPage';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/todo' element={<TodoListPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
