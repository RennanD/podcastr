/* eslint-disable import/no-duplicates */
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Format = 'EEEEEE, d MMMM' | 'd MMM yy';

export function formatDate(date: string | Date | number, typeFormat: Format) {
  let parsedDate;

  if (typeof date === 'string') {
    parsedDate = parseISO(date);
  } else if (typeof date === 'number') {
    parsedDate = new Date(date);
  } else {
    parsedDate = date;
  }

  const formattedDate = format(parsedDate, typeFormat, {
    locale: ptBR,
  });

  return formattedDate;
}
