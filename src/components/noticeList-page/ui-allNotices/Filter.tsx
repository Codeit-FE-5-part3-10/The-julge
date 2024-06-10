import classNames from 'classnames/bind';
import styles from './AllNotices.module.scss';

const cx = classNames.bind(styles);

export default function Filter() {
  return (
    <>
      <button className={cx('filter')}>상세 필터</button>
    </>
  );
}
