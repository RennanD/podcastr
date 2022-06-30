/* eslint-disable import/no-duplicates */
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type Format = 'EEEEEE, d MMMM';

export function formatDate(date: string, typeFormat: Format) {
  const parsedDate = parseISO(date);

  const formattedDate = format(parsedDate, typeFormat, {
    locale: ptBR,
  });

  return formattedDate;
}
