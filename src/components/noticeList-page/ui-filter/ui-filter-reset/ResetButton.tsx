import { Button } from '@/src/components/common/ui-button/Button';

interface ResetButtonProps {
  onClick: () => void; // 클릭 핸들러 함수를 props로 받음
}

export default function ResetButton({ onClick }: ResetButtonProps) {
  const handleClick = () => {
    onClick(); // 클릭 핸들러 함수 호출
  };

  return (
    <>
      <Button color="white" width={82} onClick={handleClick}>
        초기화
      </Button>
    </>
  );
}
