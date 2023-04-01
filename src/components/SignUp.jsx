import React, { useRef } from 'react';

export default function SignUp() {
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

  const addAccount = () => {
    const account = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
    };

    console.log(account);

    fetch('https://pre-onboarding-selection-task.shop/auth/signup', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(account),
    })
      .then((res) => console.log(res, '성공'))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>회원 가입</h1>
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
          회원가입
        </button>
      </form>
    </div>
  );
}
