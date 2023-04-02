import React, { useRef, useState } from 'react';

export default function TodoList({ id, todo, isCompleted, setTodos, todos }) {
  const checkBox = useRef();
  const todoSpan = useRef();
  const [isChecked, setIsChecked] = useState(isCompleted);

  const updateCheckBox = async () => {
    const todo = {
      todo: todoSpan.current.innerText,
      isCompleted: !isChecked,
    };

    const accessToken = JSON.parse(localStorage.getItem('JWT')).access_token;

    try {
      const res = await fetch(
        `https://pre-onboarding-selection-task.shop/todos/${id}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(todo),
        }
      );

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
      const res = await fetch(
        `https://pre-onboarding-selection-task.shop/todos/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

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
          <span ref={todoSpan}>{todo}</span>
        </label>
        <button data-testid='modify-button'>수정</button>
        <button onClick={deleteTodo} data-testid='delete-button'>
          삭제
        </button>
      </li>
    </>
  );
}
