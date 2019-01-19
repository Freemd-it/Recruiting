import React from 'react';

import { Button } from 'react-bootstrap';
import FieldGroup from '../../common/FieldGroup';
import classNames from 'classnames/bind';
import styles from './LoginForm.scss';

const cx = classNames.bind(styles);

const LoginForm = (props) => {
  const { userFields, onInputChange, onSubmit } = props;
  const { name, email, password } = userFields;

  return (
    <div className={cx('login-form')}>
      <form>
        <FieldGroup
          id="formBasicText-1"
          type="text"
          placeholder="이름을 입력하세요."
          bsClass="form-control login-form-custom-form custom-form"
          value={name}
          onChange={onInputChange('name')}
        />

        <FieldGroup
          id="formBasicText-2"
          type="email"
          placeholder="이메일을 입력하세요."
          bsClass="form-control login-form-custom-form custom-form"
          value={email}
          onChange={onInputChange('email')}
        />

        <FieldGroup
          id="formBasicText-3"
          type="password"
          placeholder="비밀번호를 입력하세요."
          bsClass="form-control login-form-custom-form custom-form"
          value={password}
          onChange={onInputChange('password')}
        />

        <Button bsClass="btn btn-default login-form-button">지원서 작성</Button>
      </form>
    </div>
  );
};

export default LoginForm;
