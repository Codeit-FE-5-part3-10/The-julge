import classNames from 'classnames/bind';
import styles from './ApplyButton.module.scss';
import { Button } from '@/src/components/common/ui-button/Button';

const cx = classNames.bind(styles);

export default function ApplyButton({ onClick }: any) {
  const handleClick = () => {
    // 만약 onClick prop이 주어졌다면 실행
    if (onClick) {
      onClick();
    }
  };

  return (
    <>
      <Button color="primary" width={150} onClick={handleClick}>
        적용하기
      </Button>
    </>
  );
}
