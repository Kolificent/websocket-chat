import { main } from './elements';
import { messageClasses } from './constants';

export function isScrollUpperLimit() {
  if (!main.messagesWrapper) return;
  const heightLimit = main.messagesWrapper.offsetHeight;
  const scrollBottom =
    main.messagesWrapper.scrollHeight -
    main.messagesWrapper.scrollTop -
    main.messagesWrapper.clientHeight;
  return scrollBottom >= heightLimit;
}

export function scrollToBottom() {
  if (!main.messagesWrapper) return;
  main.messagesWrapper.scrollTop = main.messagesWrapper.scrollHeight;
}

export function handleScrollButtonView() {
  if (isScrollUpperLimit()) {
    main.scrollButton?.classList.add(messageClasses.visible);
  } else {
    main.scrollButton?.classList.remove(messageClasses.visible);
  }
}
