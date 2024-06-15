import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './loginTest.module.scss';
import { useToken } from '@/src/utils/TokenProvider';

const cx = classNames.bind(styles);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useToken();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form className={cx('warp')} onSubmit={handleSubmit}>
      <div>
        <label className={cx('container')}>
          이메일:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
      </div>
      <div>
        <label className={cx('container')}>
          비밀번호:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>
      <button className={cx('btn')} type="submit">
        로그인
      </button>
    </form>
  );
};

export default Login;
