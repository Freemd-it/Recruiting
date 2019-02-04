import React from 'react';
import { Button } from 'react-bootstrap';

import { FieldGroup } from '../../common';

import classNames from 'classnames/bind';
import styles from './LoginForm.scss';

const cx = classNames.bind(styles);

const LoginForm = (props) => {
  const { userFields, onInputChange, onSubmit } = props;
  const { name, email, password } = userFields;

  return (
    <div className={cx('login-form')}>
      <form onSubmit={onSubmit}>
        <FieldGroup
          id="loginForm-name"
          type="text"
          placeholder="이름을 입력하세요."
          bsClass="form-control login-custom-form custom-form"
          value={name}
          onChange={onInputChange('name')}
          required
        />

        <FieldGroup
          id="loginForm-email"
          type="email"
          placeholder="이메일을 입력하세요."
          bsClass="form-control login-custom-form custom-form"
          value={email}
          onChange={onInputChange('email')}
          required
        />

        <FieldGroup
          id="loginForm-password"
          type="password"
          placeholder="비밀번호를 입력하세요."
          bsClass="form-control login-custom-form custom-form"
          value={password}
          onChange={onInputChange('password')}
          required
        />

        <Button bsClass="btn btn-default login-form-button" type="submit">지원서 작성</Button>
      </form>
    </div>
  );
};

export default LoginForm;
