import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const navigate = useNavigate();
  const emailInput = useRef('');
  const passwordInput = useRef('');
  const submitButton = useRef();
  let isEmailValid = false;
  let isPasswordValid = false;

  const checkEmailInput = () => {
    if (emailInput.current.value.includes('@')) {
      isEmailValid = true;
      removeDisabled();
    } else {
      isEmailValid = false;
    }
  };

  const checkPasswordInput = () => {
    if (passwordInput.current.value.length >= 8) {
      isPasswordValid = true;
      removeDisabled();
    } else {
      isPasswordValid = false;
    }
  };

  const removeDisabled = () => {
    if (isEmailValid && isPasswordValid) {
      submitButton.current.disabled = false;
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
        'https://pre-onboarding-selection-task.shop/auth/signin',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(account),
        }
      );

      if (res.status === 200) {
        const data = await res.text();
        console.log(data);
        navigate('/todo');
      } else {
        console.log(`요청실패, status는 ${res.status}`);
      }
    } catch (err) {
      console.error(`요청실패, 에러는 ${err}`);
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      <form onSubmit={addAccount}>
        <input
          type='email'
          ref={emailInput}
          onChange={checkEmailInput}
          placeholder='이메일을 입력하세요'
          data-testid='email-input'
        />
        <input
          type='password'
          ref={passwordInput}
          onChange={checkPasswordInput}
          placeholder='비밀번호를 입력하세요'
          data-testid='password-input'
        />
        <button ref={submitButton} disabled={true} data-testid='signup-button'>
          로그인
        </button>
      </form>
    </div>
  );
}
