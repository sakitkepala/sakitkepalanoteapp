import { format } from 'date-fns';
import id from 'date-fns/locale/id';

function formatServerDatetime(date: Date): string {
  return format(date, 'yyyy-MM-dd HH:mm:ss', { locale: id });
}

export { formatServerDatetime };
