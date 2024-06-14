import { Button } from '@/src/components/common/ui-button/Button';

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
