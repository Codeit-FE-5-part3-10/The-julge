import classNames from 'classnames/bind';
import styles from './CardEmpty.module.scss';
import { Button } from '../ui-button/Button';

const cx = classNames.bind(styles);

interface CardEmptyProps {
  description: string;
  btnText: string;
  href: string;
}

export const CardEmpty: React.FC<CardEmptyProps> = ({ description, btnText, href }) => (
  <div className={cx('wrapper')}>
    <div className={cx('container')}>
      <h1 className={cx('description')}>{description}</h1>
      <Button color="primary" width={270} to={href}>
        {btnText}
      </Button>
    </div>
  </div>
);
