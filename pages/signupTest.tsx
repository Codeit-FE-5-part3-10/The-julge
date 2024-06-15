import { useState } from 'react';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';
import styles from './loginTest.module.scss';
import { signup } from '@/src/apis/user';

const cx = classNames.bind(styles);

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await signup(email, password, type);
    if (data) {
      router.push('/');
    }
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
      <div>
        <label className={cx('container')}>
          타입:
          <input type="type" value={type} onChange={(e) => setType(e.target.value)} required />
        </label>
      </div>
      <button className={cx('btn')} type="submit">
        회원가입
      </button>
    </form>
  );
}
