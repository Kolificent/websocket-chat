import { renderMessages, handleLoader } from './ui';
import { Message } from './interfaces';

export function getWebSocket(token: string) {
  const key = process.env.WSS_URL;

  const socket = new WebSocket(`${key}?${token}`);

  socket.onopen = function () {
    handleLoader();
  };

  socket.onmessage = async function (event) {
    try {
      const data: Message = await JSON.parse(event.data);
      await renderMessages([data]);
    } catch (error) {
      console.error(error);
    }
  };
  return socket;
}
