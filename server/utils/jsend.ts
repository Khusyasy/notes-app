type JSendSuccess<T> = {
  status: 'success';
  data: T;
}

type JSendFail<T> = {
  status: 'fail';
  data: T;
}

type JSendError<T> = {
  status: 'error';
  message: string;
  code?: number;
  data?: T;
}

export function jsendSuccess<T>(data: T): JSendSuccess<T> {
  return {
    status: 'success',
    data,
  }
}

export function jsendFail<T>(data: T): JSendFail<T> {
  return {
    status: 'fail',
    data,
  }
}

export function jsendError<T>(message: string, code?: number, data?: T): JSendError<T> {
  return {
    status: 'error',
    message,
    code,
    data,
  }
}
