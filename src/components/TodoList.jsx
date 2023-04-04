import React, { useRef, useState } from 'react';

export default function TodoList({ id, todo, isCompleted, setTodos, todos }) {
  const API_URL = 'https://www.pre-onboarding-selection-task.shop';
  const checkBox = useRef();
  const todoSpan = useRef();
  const modifyInput = useRef('');
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [isModifyMode, setIsModifyMode] = useState(false);

  const updateCheckBox = async () => {
    const todo = {
      todo: todoSpan.current.innerText,
      isCompleted: !isChecked,
    };

    const accessToken = JSON.parse(localStorage.getItem('JWT')).access_token;

    try {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });

      if (res.status === 200) {
        const data = await res.json();
        console.log('성공', data);
        setIsChecked(data.isCompleted);
      } else {
        console.log(`요청실패, status는 ${res.status}`);
      }
    } catch (err) {
      console.error(`요청실패, 에러는 ${err}`);
    }
  };

  const deleteTodo = async () => {
    const accessToken = JSON.parse(localStorage.getItem('JWT')).access_token;

    try {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.status === 204) {
        console.log('성공');
        const newTodo = todos.filter((todo) => todo.id !== id);
        setTodos(newTodo);
      } else {
        console.log(`요청실패, status는 ${res.status}`);
      }
    } catch (err) {
      console.error(`요청실패, 에러는 ${err}`);
    }
  };

  const modifyTodo = async () => {
    const todo = {
      todo: modifyInput.current.value,
      isCompleted: isChecked,
    };

    const accessToken = JSON.parse(localStorage.getItem('JWT')).access_token;

    try {
      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });

      if (res.status === 200) {
        const updatedTodo = await res.json();
        const updatedTodos = todos.map((todo) => {
          if (todo.id === updatedTodo.id) {
            return updatedTodo;
          }
          return todo;
        });
        setTodos(updatedTodos);
        setIsModifyMode((cur) => !cur);
      } else {
        console.log(`요청실패, status는 ${res.status}`);
      }
    } catch (err) {
      console.error(`요청실패, 에러는 ${err}`);
    }
  };

  const convertModifyMode = () => {
    setIsModifyMode((cur) => !cur);
  };

  return (
    <>
      <li>
        <label>
          <input
            ref={checkBox}
            type='checkbox'
            onChange={updateCheckBox}
            checked={isChecked}
          />
          {isModifyMode ? (
            <input
              ref={modifyInput}
              data-testid='modify-input'
              defaultValue={todo}
            />
          ) : (
            <span ref={todoSpan}>{todo}</span>
          )}
        </label>
        {isModifyMode ? (
          <>
            <button onClick={modifyTodo} data-testid='submit-button'>
              제출
            </button>
            <button onClick={convertModifyMode} data-testid='cancel-button'>
              취소
            </button>
          </>
        ) : (
          <>
            <button onClick={convertModifyMode} data-testid='modify-button'>
              수정
            </button>
            <button onClick={deleteTodo} data-testid='delete-button'>
              삭제
            </button>
          </>
        )}
      </li>
    </>
  );
}
