import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignInPage() {
  const API_URL = 'https://www.pre-onboarding-selection-task.shop';
  const navigate = useNavigate();
  const emailInput = useRef('');
  const passwordInput = useRef('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const checkInputs = () => {
    if (emailInput.current.value.includes('@')) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }

    if (passwordInput.current.value.length >= 8) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  const login = async (e) => {
    e.preventDefault();

    const account = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
    };

    try {
      const res = await fetch(`${API_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(account),
      });

      if (res.status === 200) {
        const data = await res.text();
        localStorage.setItem('JWT', data);
        navigate('/todo');
      } else {
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
        console.log(`요청실패, status는 ${res.status}`);
      }
    } catch (err) {
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
      console.error(`요청실패, 에러는 ${err}`);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('JWT') !== null) {
      navigate('/todo');
    }
  });

  return (
    <>
      <h1>로그인</h1>
      <form onSubmit={login} className='sign-form'>
        <input
          type='email'
          ref={emailInput}
          onChange={checkInputs}
          placeholder='이메일을 입력하세요'
          data-testid='email-input'
        />
        <input
          type='password'
          ref={passwordInput}
          onChange={checkInputs}
          placeholder='비밀번호를 입력하세요'
          data-testid='password-input'
        />
        <button
          className='btn'
          type='submit'
          disabled={!isEmailValid || !isPasswordValid}
          data-testid='signin-button'
        >
          로그인
        </button>
      </form>
    </>
  );
}
