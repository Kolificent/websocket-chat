import { getCookie } from 'typescript-cookie';
import { stringifyValueByName } from './utils';
import { auth } from './elements';
import { Message, User } from './interfaces';

const API_URL = process.env.API_URL;

// TODO попробовать затестить axios

export async function sendToken(email: string) {
  const body = stringifyValueByName('email', email);
  if (!body) return;

  const response = await fetch(`${API_URL}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: body,
  });

  if (response.ok) {
    if (!auth.tokenStatus) return;
    auth.tokenStatus.textContent = 'Код отправлен!';
  }
}

export async function sendName(name: string) {
  const body = stringifyValueByName('name', name);
  if (!body) return;

  const response = await fetch(`${API_URL}/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${getCookie('token')}`,
    },
    body: body,
  });

  if (response.ok) {
    location.reload();
  }
}

export async function getMessageHistory(): Promise<Message[]> {
  const response = await fetch(`${API_URL}/messages`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${getCookie('token')}`,
    },
  });
  const data = await response.json();
  return data.messages;
}

export async function getUserInfo(): Promise<User> {
  const response = await fetch(`${API_URL}/user/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Bearer ${getCookie('token')}`,
    },
  });
  const data = await response.json();
  const user: User = { email: data.email, name: data.name };
  return user;
}
