import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function formatDateTimeWithDateFns(dateString: string): {
  formattedDate: string;
  formattedTime: string;
} {
  const formattedDate = format(dateString, 'yyyy-MM-dd');
  const formattedTime = format(dateString, 'HH:mm');
  return { formattedDate, formattedTime };
}

export function formatDate(date: Date): string {
  return date.toISOString(); // Date 객체를 ISO 8601 형식으로 변환하여 반환
}
