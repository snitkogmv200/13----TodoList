import { HttpStatus } from '@nestjs/common';

export const errorMappings: Record<
  string,
  { status: number; message: string }
> = {
  P2000: {
    status: HttpStatus.BAD_REQUEST,
    message: 'Входные данные слишком длинные',
  },
  P2001: { status: HttpStatus.NO_CONTENT, message: 'Запись не существует' },
  P2002: {
    status: HttpStatus.CONFLICT,
    message: 'Вводимые данные уже существуют',
  },
  // ..........
  P2025: {
    status: HttpStatus.BAD_REQUEST,
    message:
      'Произошел сбой операции, поскольку она зависит от одной или нескольких записей, которые были запрошены, но не найдены.',
  },
};
