import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoList from '../components/TodoList';

export default function TodoListPage() {
  const todoInput = useRef('');
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const createTodo = async (e) => {
    e.preventDefault();

    const todo = {
      todo: todoInput.current.value,
    };

    const accessToken = JSON.parse(localStorage.getItem('JWT')).access_token;

    try {
      const res = await fetch(
        'https://pre-onboarding-selection-task.shop/todos',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(todo),
        }
      );

      if (res.status === 201) {
        const data = await res.json();
        console.log('성공', data);
      } else {
        console.log(`요청실패, status는 ${res.status}`);
      }
    } catch (err) {
      console.error(`요청실패, 에러는 ${err}`);
    }

    // TodoList를 다시 가져오고, input은 비워준다.
    getTodo();
    todoInput.current.value = '';
  };

  const getTodo = async () => {
    const accessToken = JSON.parse(localStorage.getItem('JWT')).access_token;

    try {
      const res = await fetch(
        'https://pre-onboarding-selection-task.shop/todos',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.status === 200) {
        const data = await res.json();
        console.log('성공', data);
        setTodos(data);
      } else {
        console.log(`요청실패, status는 ${res.status}`);
      }
    } catch (err) {
      console.error(`요청실패, 에러는 ${err}`);
    }
  };

  const logout = () => {
    localStorage.removeItem('JWT');
    navigate('/');
  };

  useEffect(() => {
    // 마운트 시에 TodoList를 가져온다.
    getTodo();
  }, []);

  useEffect(() => {
    if (localStorage.getItem('JWT') === null) {
      navigate('/signin');
    }
  });

  return (
    <>
      <h1>해야할 일</h1>
      <form onSubmit={createTodo}>
        <input
          ref={todoInput}
          data-testid='new-todo-input'
          type='text'
          placeholder='할일을 작성하세요!'
        />
        <button data-testid='new-todo-add-button'>추가</button>
      </form>
      <>
        {todos.map((el) => (
          <TodoList
            key={el.id}
            id={el.id}
            todo={el.todo}
            isCompleted={el.isCompleted}
            setTodos={setTodos}
            todos={todos}
          />
        ))}
      </>
      <button onClick={logout}>로그아웃</button>
    </>
  );
}
