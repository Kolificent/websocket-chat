import { main, auth, confirm, settings } from './elements';
import { setCookie, getCookie, removeCookie } from 'typescript-cookie';
import {
  sendName,
  sendToken,
  getMessageHistory,
  getUserInfo,
} from './requests';
import { Message, User } from './interfaces';
import { renderMessages, togglePopupVisibility, handleLoader } from './ui';
import { getWebSocket } from './websocket';
import { stringifyValueByName } from './utils';
import { handleScrollButtonView, scrollToBottom } from './scroll';
import { messageClasses } from './constants';

main.settingsButton?.addEventListener('click', openSettingsHandler);
settings.closeButton?.addEventListener('click', closeSettingsHandler);
main.quitButton?.addEventListener('click', logout);
auth.inputTokenButton?.addEventListener('click', inputTokenHandler);
settings.nameForm?.addEventListener('submit', submitNameHandler);
main.messageForm?.addEventListener('submit', submitMessageHandler);
auth.emailForm?.addEventListener('submit', inputEmail);
confirm.tokenForm?.addEventListener('submit', login);
main.messagesWrapper?.addEventListener('scroll', scrollHandler);
main.scrollButton?.addEventListener('click', scrollToBottom);

window.addEventListener('DOMContentLoaded', initializeChat);

// ? мб есть способ лучше, но я не нашёл
let chatSocket: WebSocket | null = null;
let chatHistory: Array<Message> | null = null;
let loadedMessagesCount = 0;
const messagesPerLoad = 20;
const currentToken = getCookie('token');

function initializeChat() {
  if (!currentToken) {
    togglePopupVisibility(false, auth.container);
    handleLoader();
  } else {
    chatSocket = getWebSocket(currentToken);
    loadOldMessages();
    updateUserInfo();
  }
}

function scrollHandler() {
  if (!chatHistory) return;

  handleScrollButtonView();

  if (main.messagesWrapper?.scrollTop === 0) {
    const scrollOffset = main.messagesWrapper.scrollHeight;
    loadedMessagesCount += messagesPerLoad;

    const messagesScrollTick = chatHistory.slice(
      loadedMessagesCount,
      loadedMessagesCount + messagesPerLoad,
    );

    renderMessages(messagesScrollTick);

    main.messagesWrapper.scrollTop =
      main.messagesWrapper.scrollHeight - scrollOffset;

    if (loadedMessagesCount >= chatHistory.length) {
      showHistoryEndMessage();
      main.messagesWrapper.removeEventListener('scroll', scrollHandler);
    }
  }
}

function showHistoryEndMessage() {
  const historyEnd = document.createElement('li');
  historyEnd.textContent = 'Вся история загружена!';
  main.messagesList?.prepend(historyEnd);

  if (!main.messagesWrapper) return;
  main.messagesWrapper.scrollTop = 0;
}

function logout() {
  removeCookie('token');
  location.reload();
}

function openSettingsHandler() {
  togglePopupVisibility(false, settings.container);
}

function closeSettingsHandler() {
  togglePopupVisibility(true, settings.container);
}

function inputTokenHandler() {
  auth.container?.classList.remove(messageClasses.visible);
  confirm.container?.classList.add(messageClasses.visible);
}

function submitMessageHandler(event: Event) {
  event.preventDefault();

  const inputValue = main.messageInput?.value.trim();
  if (!inputValue) return;

  const stringifiedValue = stringifyValueByName('text', inputValue);
  if (!stringifiedValue) return;

  try {
    chatSocket?.send(stringifiedValue);
  } catch (error) {
    if (!main.errorStatus) return;
    main.errorStatus.textContent = `Ошибка отправки сообщения: ${error}`;
  }

  main.messageForm?.reset();
}

async function submitNameHandler(event: Event) {
  event.preventDefault();

  const inputValue = settings.nameInput?.value.trim();
  if (!inputValue) return;

  sendName(inputValue);
}

async function updateUserInfo() {
  const data = await getUserInfo();

  if (!settings.userEmail || !settings.userName) return;
  setCookie('email', data.email);
  settings.userEmail.textContent = data.email;
  settings.userName.textContent = data.name;
}

function inputEmail(event: Event) {
  event.preventDefault();

  const inputValue = auth.emailInput?.value.trim();
  if (!inputValue) return;

  sendToken(inputValue);
}

function login(event: Event) {
  event.preventDefault();

  const inputValue = confirm.tokenInput?.value.trim();
  if (!inputValue) return;

  setCookie('token', inputValue, { expires: 7 });
  location.reload();
}

async function loadOldMessages() {
  chatHistory = await getMessageHistory();
  if (!chatHistory) return;

  const oldMessagesCount = 40;
  renderMessages(chatHistory.slice(0, oldMessagesCount));

  if (!main.messagesWrapper) return;

  const wrapperHeight = main.messagesWrapper.scrollHeight;
  main.messagesWrapper.scrollTop = wrapperHeight;
}
