import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUpPage() {
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

  const addAccount = async (e) => {
    e.preventDefault();

    const account = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
    };

    try {
      const res = await fetch(
        'https://pre-onboarding-selection-task.shop/auth/signup',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(account),
        }
      );

      if (res.status === 201) {
        console.log('회원가입 성공');
        navigate('/signin');
      } else {
        console.log(`요청실패, status는 ${res.status}`);
      }
    } catch (err) {
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
      <h1>회원 가입</h1>
      <form onSubmit={addAccount} className='sign-form'>
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
          data-testid='signup-button'
        >
          회원가입
        </button>
      </form>
    </>
  );
}
