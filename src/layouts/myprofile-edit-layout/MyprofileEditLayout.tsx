import classNames from 'classnames/bind';
import styles from './Layout.module.scss';

const cx = classNames.bind(styles);

export const MyprofileEditLayout = () => (
    <div>
      <div className={cx('main')}></div>
    </div>
  );
