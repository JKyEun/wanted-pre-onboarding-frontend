import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <h2>
        <Link to={'/signup'}>회원가입</Link>
      </h2>
      <h2>
        <Link to={'/signin'}>로그인</Link>
      </h2>
    </>
  );
}
