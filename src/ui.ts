import { Message } from './interfaces';
import { main } from './elements';
import { getCookie } from 'typescript-cookie';
import { isScrollUpperLimit, scrollToBottom } from './scroll';
import { formatDate } from './utils';
import { messageClasses } from './constants';

// todo вынести в константы классы
export function togglePopupVisibility(
  isVisible: boolean,
  windowElement: HTMLElement | null,
) {
  const action = isVisible ? 'remove' : 'add';
  windowElement?.classList[action](messageClasses.visible);
  main.overlay?.classList[action](messageClasses.overlayOn);
}

export function handleLoader() {
  main.container?.classList.add(messageClasses.visible);
  main.loader?.classList.remove(messageClasses.visible);
}

export function renderMessages(messages: Array<Message>) {
  const fragment = document.createDocumentFragment();
  messages.reverse().forEach((msg: Message) => {
    const messageElement = createMessageElement(msg);
    if (!messageElement) return;

    fragment.append(messageElement);
  });

  if (main.messagesWrapper?.scrollTop === 0) {
    main.messagesList?.prepend(fragment);
  } else {
    main.messagesList?.append(fragment);
  }

  if (!isScrollUpperLimit()) {
    scrollToBottom();
  }
}

function createMessageElement(message: Message) {
  const messageTemplate = main.messageTemplate?.content.cloneNode(
    true,
  ) as DocumentFragment;

  const element = messageTemplate.querySelector('li');
  const paragraph = messageTemplate.querySelector('p');
  const time = messageTemplate.querySelector('.message-time');
  const user = messageTemplate.querySelector('.message-user');

  const isTemplateValid = !element || !paragraph || !time || !user;
  if (isTemplateValid) return;

  const userEmail = getCookie('email');
  const isMessageIncoming = message.user.email !== userEmail;
  element.classList.add(
    isMessageIncoming ? messageClasses.in : messageClasses.out,
  );

  paragraph.textContent = `${message.text}`;

  time.textContent = `${formatDate(message.createdAt)}`;

  user.textContent = `${message.user.name}`;

  return messageTemplate;
}
