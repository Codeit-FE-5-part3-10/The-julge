// 시간을 더하는 함수
export default function addHoursToTime(formattedTime: string, time: string): string {
  // formattedTime을 "HH:mm" 형식에서 시간과 분으로 분리
  const [hoursStr, minutesStr] = formattedTime.split(':');
  const hours = parseInt(hoursStr, 10); // 문자열을 숫자로 변환
  const minutes = parseInt(minutesStr, 10); // 문자열을 숫자로 변환

  // time을 숫자로 변환
  const additionalHours = parseInt(time, 10);

  // 새로운 시간 계산
  let newHours = hours + additionalHours;

  // 시간이 24 이상이면 24로 나눈 나머지를 취하여 시간 정규화
  newHours = newHours % 24;

  // 문자열로 변환
  const newHoursStr = newHours.toString().padStart(2, '0');
  const newFormattedTime = `${newHoursStr}:${minutesStr}`;

  return newFormattedTime;
}
// 예시 사용
//   const formattedTime = '00:00';
//   const time = '12';

//   const result = addHoursToFormattedTime(formattedTime, time);
