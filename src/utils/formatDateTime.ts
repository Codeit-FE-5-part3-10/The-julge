import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export default function formatDateTimeWithDateFns(dateString: Date): {
  formattedDate: string;
  formattedTime: string;
} {
  const formattedDate = format(dateString, 'yyyy-MM-dd');
  const formattedTime = format(dateString, 'HH:mm');
  return { formattedDate, formattedTime };
}
