const keyCodes = [
  ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace'],
  ['Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete'],
  ['CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter'],
  ['ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight'],
  ['ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight'],
];
const keysRu = [
  ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del'],
  ['CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter'],
  ['Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '▲', 'Shift'],
  ['Control', 'Win', 'Alt', 'Space', 'Alt', '◄', '▼', '►', 'Control'],
];
const keysEng = [
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del'],
  ['CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'],
  ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '.', ',', '/', '▲', 'Shift'],
  ['Control', 'Win', 'Alt', 'Space', 'Alt', '◄', '▼', '►', 'Control'],
];
const keysRuUp = [
  ['Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', 'Backspace'],
  ['Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Del'],
  ['CapsLock', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Enter'],
  ['Shift', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '▲', 'Shift'],
  ['Control', 'Win', 'Alt', 'Space', 'Alt', '◄', '▼', '►', 'Control'],
];
const keysEngUp = [
  ['~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', 'Backspace'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del'],
  ['CapsLock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', 'Enter'],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '▲', 'Shift'],
  ['Control', 'Win', 'Alt', 'Space', 'Alt', '◄', '▼', '►', 'Control'],
];

const options = {
  isLangEn: true,
  capsOn: false,
  isShiftPressed: false,
  isCtrlPressed: false,
  isAltPressed: false,
};

const langLS = localStorage.getItem('lang');
options.isLangEn = langLS === 'eng';
localStorage.setItem('lang', options.isLangEn ? 'eng' : 'ru');

const body = document.querySelector('body');

const textArea = document.createElement('textarea');
const keyboard = document.createElement('div');

textArea.classList.add('textArea');
keyboard.classList.add('keyboard');

body.appendChild(textArea);
body.appendChild(keyboard);

if (localStorage.getItem('text')) {
  textArea.value = localStorage.getItem('text');
}

const renderButtons = () => {
  const { isLangEn, capsOn, isShiftPressed } = options;
  const selectorClass = `.${isLangEn ? 'eng' : 'ru'}>span`;

  document.querySelectorAll('span.visible').forEach((node) => node.classList.remove('visible'));

  document.querySelectorAll(`${selectorClass}${capsOn === isShiftPressed ? ':first-child' : ':last-child'}`).forEach((node) => {
    node.classList.add('visible');
  });
};

const toggleLang = () => {
  const { isShiftPressed, isAltPressed } = options;
  if (isShiftPressed && isAltPressed) {
    options.isLangEn = !options.isLangEn;
    localStorage.setItem('lang', options.isLangEn ? 'eng' : 'ru');
    renderButtons();
  }
};

const fillInput = (code) => {
  switch (code) {
    case 'Backspace':
      textArea.value = textArea.value.slice(0, -1);
      localStorage.setItem('text', textArea.value);
      return;
    case 'ArrowLeft':
      textArea.value += '◄';
      return;
    case 'ArrowRight':
      textArea.value += '►';
      return;
    case 'ArrowUp':
      textArea.value += '▲';
      return;
    case 'ArrowDown':
      textArea.value += '▼';
      return;
    case 'CapsLock':
      options.capsOn = !options.capsOn;
      renderButtons();
      return;
    case 'Control':
      options.isCtrlPressed = false;
      return;
    case 'Alt':
      options.isAltPressed = false;
      return;
    case 'Shift':
      options.isShiftPressed = false;
      renderButtons();
      return;
    case 'Enter':
      textArea.value += '\n';
      return;
    case 'Tab':
      textArea.value += '\t';
      return;
    case 'Space':
      textArea.value += ' ';
      return;
    case 'Win':
    case 'Del':
      return;
    default:
      textArea.value += code;
  }
  localStorage.setItem('text', textArea.value);
};

const onButtonClick = (event) => {
  fillInput(event.target.innerText);
  event.target.blur();
};

const onKeyboardEvent = (event) => {
  const chosenBtn = event.code && document.querySelector(`.${(event.code).toLowerCase()}`);
  if (chosenBtn) {
    event.preventDefault();
    chosenBtn.click();
    chosenBtn.classList.remove('chosen');
  }
};

for (let i = 0; i < keyCodes.length; i += 1) {
  const keysLine = document.createElement('div');
  keysLine.classList.add('rows');

  for (let j = 0; j < keyCodes[i].length; j += 1) {
    const key = document.createElement('button');
    key.classList.add((keyCodes[i][j]).toLowerCase());

    const ru = document.createElement('span');
    ru.classList.add('ru');
    const eng = document.createElement('span');
    eng.classList.add('eng');

    const spanRu = document.createElement('span');
    const spanRuUp = document.createElement('span');
    const spanEng = document.createElement('span');
    const spanEngUp = document.createElement('span');

    spanRu.innerText = keysRu[i][j];
    spanRuUp.innerText = keysRuUp[i][j];
    spanEng.innerText = keysEng[i][j];
    spanEngUp.innerText = keysEngUp[i][j];

    key.addEventListener('click', onButtonClick);

    ru.appendChild(spanRu);
    ru.appendChild(spanRuUp);
    eng.appendChild(spanEng);
    eng.appendChild(spanEngUp);

    key.appendChild(ru);
    key.appendChild(eng);

    keysLine.appendChild(key);
  }

  keyboard.appendChild(keysLine);
}

renderButtons();

document.querySelectorAll('button').forEach((button) => {
  button.setAttribute('tabindex', '0');
});

document.addEventListener('keydown', (event) => {
  const chosenBtn = event.code && document.querySelector(`.${(event.code).toLowerCase()}`);
  if (chosenBtn) {
    event.preventDefault();
    chosenBtn.classList.add('chosen');
  }

  if (event.key === 'Shift' && !options.isShiftPressed) {
    options.isShiftPressed = true;
    renderButtons();
    return;
  }

  if (event.key === 'Control' && !options.isCtrlPressed) {
    options.isCtrlPressed = true;
    toggleLang();
    return;
  }

  if (event.key === 'Alt' && !options.isAltPressed) {
    options.isAltPressed = true;
    toggleLang();
  }
});

document.addEventListener('keyup', onKeyboardEvent);
