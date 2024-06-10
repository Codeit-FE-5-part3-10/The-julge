import classNames from 'classnames/bind';
import styles from './Filter.module.scss';

const cx = classNames.bind(styles);

export default function Filter({ isOpen, onClose }) {
  return (
    <>
      <div className={cx('filter-container', { open: isOpen })}>
        {' '}
        <button className={cx('close-button')} onClick={onClose}>
          close
        </button>
      </div>
    </>
  );
}
