import React from 'react';

export default function TodoList({ todo }) {
  return (
    <>
      <li>
        <label>
          <input type='checkbox' checked={todo.isChecked} />
          <span>{todo.content}</span>
        </label>
      </li>
    </>
  );
}
