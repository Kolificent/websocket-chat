type Main = {
  container: HTMLElement | null;
  overlay: HTMLElement | null;
  loader: HTMLElement | null;
  settingsButton: HTMLElement | null;
  quitButton: HTMLElement | null;
  messagesWrapper: HTMLElement | null;
  messagesList: HTMLElement | null;
  messageInput: HTMLInputElement | null;
  messageForm: HTMLFormElement | null;
  messageTemplate: HTMLTemplateElement | null;
  scrollButton: HTMLElement | null;
  errorStatus: HTMLElement | null;
};

type Settings = {
  container: HTMLElement | null;
  closeButton: HTMLElement | null;
  userEmail: HTMLElement | null;
  userName: HTMLElement | null;
  nameForm: HTMLFormElement | null;
  setNameButton: HTMLElement | null;
  nameInput: HTMLInputElement | null;
};

type Auth = {
  container: HTMLElement | null;
  emailInput: HTMLInputElement | null;
  emailForm: HTMLFormElement | null;
  tokenStatus: HTMLElement | null;
  inputTokenButton: HTMLElement | null;
};

type Confirm = {
  container: HTMLElement | null;
  loginButton: HTMLElement | null;
  tokenForm: HTMLFormElement | null;
  tokenInput: HTMLInputElement | null;
};

export const main: Main = {
  container: document.getElementById('main-container'),
  overlay: document.getElementById('overlay'),
  loader: document.getElementById('loader'),
  settingsButton: document.getElementById('button-settings'),
  quitButton: document.getElementById('quit-button'),
  messagesWrapper: document.getElementById('messages-wrapper'),
  messagesList: document.getElementById('messages'),
  messageTemplate: document.getElementById('message') as HTMLTemplateElement,
  messageForm: document.getElementById('form-message') as HTMLFormElement,
  messageInput: document.getElementById('message-input') as HTMLInputElement,
  scrollButton: document.getElementById('scroll-button'),
  errorStatus: document.getElementById('error-status'),
};

export const settings: Settings = {
  container: document.getElementById('settings-window'),
  closeButton: document.getElementById('close-settings-button'),
  userEmail: document.getElementById('current-email'),
  userName: document.getElementById('current-name'),
  nameForm: document.getElementById('form-name') as HTMLFormElement,
  setNameButton: document.getElementById('set-name-button'),
  nameInput: document.getElementById('name-input') as HTMLInputElement,
};

export const auth: Auth = {
  container: document.getElementById('auth-window'),
  emailInput: document.getElementById('email-input') as HTMLInputElement,
  emailForm: document.getElementById('form-email') as HTMLFormElement,
  tokenStatus: document.getElementById('token-status'),
  inputTokenButton: document.getElementById('input-token-button'),
};
export const confirm: Confirm = {
  container: document.getElementById('token-window'),
  loginButton: document.getElementById('login-button'),
  tokenForm: document.getElementById('form-token') as HTMLFormElement,
  tokenInput: document.getElementById('token-input') as HTMLInputElement,
};
