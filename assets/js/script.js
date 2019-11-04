window.onload = function () {
    // set page wrapper
    let divWrapper = document.createElement('div');
    divWrapper.classList.add('wrapper');
    document.querySelector('body').append(divWrapper);

    // add textarea
    let textArea = document.createElement('textarea');
    textArea.classList.add('textarea');
    textArea.setAttribute('autofocus', 'true');
    document.querySelector('.wrapper').append(textArea);

    // add keyboard block
    let keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    document.querySelector('.wrapper').append(keyboard);

    // set inner keyboard structure
    let innerRowsCount = 5;
    let keyboardButtons = [
        [['Backquote', 'ё', 'Ё', '`', '~'], ['Digit1', '1', '!', '1', '!'], ['Digit2', '2', '"', '2', '@'], ['Digit3', '3', '№', '3', '#'], ['Digit4', '4', ';', '4', '$'],
            ['Digit5', '5', '%', '5', '%'], ['Digit6', '6', ':', '6', '^'], ['Digit7', '7', '?', '7', '&'], ['Digit8', '8', '*', '8', '*'], ['Digit9', '9', '(', '9', '('],
            ['Digit0', '0', ')', '0', ')'], ['Minus', '-', '_', '-', '_'], ['Equal', '=', '+', '=', '+'], ['Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace']],
        [['Tab', 'Tab', 'Tab', 'Tab', 'Tab'], ['KeyQ', 'й', 'Й', 'q', 'Q'], ['KeyW', 'ц', 'Ц', 'w', 'W'], ['KeyE', 'у', 'У', 'e', 'E'], ['KeyR', 'к', 'К', 'r', 'R'], ['KeyT', 'е', 'Е', 't', 'T'],
            ['KeyY', 'н', 'Н', 'y', 'Y'], ['KeyU', 'г', 'Г', 'u', 'U'], ['KeyI', 'ш', 'Ш', 'i', 'I'], ['KeyO', 'щ', 'Щ', 'o', 'O'], ['KeyP', 'з', 'З', 'p', 'P'],
            ['BracketLeft', 'х', 'Х', '[', '{'], ['BracketRight', 'ъ', 'Ъ', ']', '}'], ['Delete', 'Del', 'Del', 'Del', 'Del']],
        [['CapsLock', 'Caps Lock', 'Caps Lock', 'Caps Lock', 'Caps Lock'], ['KeyA', 'ф', 'Ф', 'a', 'A'], ['KeyS', 'ы', 'Ы', 's', 'S'], ['KeyD', 'в', 'В', 'd', 'D'], ['KeyF', 'а', 'А', 'f', 'F'],
            ['KeyG', 'п', 'П', 'g', 'G'], ['KeyH', 'р', 'Р', 'h', 'H'], ['KeyJ', 'о', 'О', 'j', 'J'], ['KeyK', 'л', 'Л', 'k', 'K'], ['KeyL', 'д', 'Д', 'l', 'L'], ['Semicolon', 'ж', 'Ж', ';', ':'],
            ['Quote', 'э', 'Э', '\'', '\"'], ['Enter', 'Enter', 'Enter', 'Enter', 'Enter']],
        [['ShiftLeft', 'Shift', 'Shift', 'Shift', 'Shift'], ['KeyZ', 'я', 'Я', 'z', 'Z'], ['KeyX', 'ч', 'Ч', 'x', 'X'], ['KeyC', 'с', 'С', 'c', 'C'], ['KeyV', 'м', 'М', 'v', 'V'], ['KeyB', 'и', 'И', 'b', 'B'],
            ['KeyN', 'т', 'Т', 'n', 'N'], ['KeyM', 'ь', 'Ь', 'm', 'M'], ['Comma', 'б', 'Б', ',', '<'], ['Period', 'ю', 'Ю', '.', '>'], ['Slash', '.', ',', '/', '?'],
            ['Backslash', '\\', '/', '\\', '|'], ['ShiftRight', 'Shift', 'Shift', 'Shift', 'Shift']],
        [['ControlLeft', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'], ['MetaLeft', 'Win', 'Win', 'Win', 'Win'], ['AltLeft', 'Alt', 'Alt', 'Alt', 'Alt'], ['Space', 'Space', 'Space', 'Space', 'Space'],
            ['AltRight', 'Alt', 'Alt', 'Alt', 'Alt'], ['ControlRight', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl']]
    ];

    // set keyboard structure and styles
    let RU = 1;
    let EN = 3;
    let language = 'ru';
    let shiftBtn = false;
    let capsLockBtn = false;

    for (let i = 1; i <= innerRowsCount; i++) {
        // add inner keyboard rows
        let keyboardRow = document.createElement('div');
        keyboardRow.classList.add(`keyboard__row-${i}`, 'keyboard__row');
        document.querySelector('.keyboard').append(keyboardRow);

        // add inner rows buttons
        keyboardButtons[i-1].forEach((value) => {
            let keyboardButton = document.createElement('div');
            keyboardButton.classList.add('keyboard__key');

            if (value[0] === 'Backspace' || value[0] === 'CapsLock' || value[0] === 'ShiftLeft' || value[0] === 'ShiftRight' || value[0] === 'Enter' || value[0] === 'Tab') {
                keyboardButton.classList.add('medium-length', 'system');
            }

            if (value[0] === 'ControlLeft' || value[0] === 'ControlRight') {
                keyboardButton.classList.add('sm-length', 'system');
            }

            if (value[0] === 'Space') {
                keyboardButton.classList.add('large-length', 'system');
            }

            if (value[0] === 'MetaLeft' || value[0] === 'AltLeft' || value[0] === 'AltRight' || value[0] === 'Delete') {
                keyboardButton.classList.add('system');
            }

            let fillKeyText = function (language) {
                if (!keyboardButton.classList.contains('system')) {
                    keyboardButton.textContent = value[language].toUpperCase();
                    keyboardButton.setAttribute('data-value', value[language]);
                } else {
                    keyboardButton.textContent = value[language];
                    keyboardButton.setAttribute('data-value', '');
                }
            };

            keyboardButton.setAttribute('data-key', value[0]);
            fillKeyText(RU);
            document.querySelector(`.keyboard__row-${i}`).append(keyboardButton);

            // set change language option
            let languageChange = function (func, ...codes) {
                let pressed = new Set();

                document.addEventListener('keydown', function(e) {
                    pressed.add(e.code);
                    // check if all buttons were pressed
                    for (let code of codes) {
                        if (!pressed.has(code)) {
                            return;
                        }
                    }
                    // to prevent key sticking - reset all key statuses
                    pressed.clear();
                    func();
                });

                document.addEventListener('keyup', (e) => {
                    pressed.delete(e.code);
                });
            };

            languageChange(
                () => {
                    if(keyboardButton.getAttribute('data-value') === value[1] || keyboardButton.getAttribute('data-value') === value[3]) {
                        keyboardButton.getAttribute('data-value') === value[1] ? fillKeyText(3) : fillKeyText(1);
                    } else if (keyboardButton.getAttribute('data-value') === value[2] || keyboardButton.getAttribute('data-value') === value[4]) {
                        keyboardButton.getAttribute('data-value') === value[2] ? fillKeyText(4) : fillKeyText(2);
                    }
                },
                "AltLeft",
                "ControlLeft"
            );

            // set change register option
            let registerChange = function (func, ...codes) {
                let pressed = new Set();

                document.addEventListener('keydown', function(e) {
                    pressed.add(e.code);
                    // check if all buttons were pressed
                    for (let code of codes) {
                        if (!pressed.has(code)) {
                            return;
                        }
                    }
                    // to prevent key sticking - reset all key statuses
                    pressed.clear();
                    func();
                });

                document.addEventListener('keyup', (e) => {
                    let unPressedBtnKeyCode = e.code;
                    let keyCode = value[0];

                    // weird language check
                    if (keyCode === 'Backquote') {
                        if (keyboardButton.getAttribute('data-value').toLowerCase() === 'ё') {
                            language = 'ru'
                        } else {
                            language = 'en'
                        }
                    }
                    if (unPressedBtnKeyCode === 'ShiftLeft' || unPressedBtnKeyCode === 'ShiftRight') {
                        // return base lang settings if shift/lock was pressed
                        RU = 1;
                        EN = 3;
                        shiftBtn = false;

                        if (language === 'ru') {
                            fillKeyText(RU);
                        } else if (language === 'en') {
                            fillKeyText(EN);
                        }
                    }
                    pressed.delete(e.code);
                });
            };

            registerChange(
                () => {
                    if (!shiftBtn) {
                        if (language === 'ru') {
                            RU = 2;
                            keyboardButton.getAttribute('data-value') === value[1] ? fillKeyText(RU) : fillKeyText(1);
                        } else if (language === 'en') {
                            EN = 4;
                            keyboardButton.getAttribute('data-value') === value[3] ? fillKeyText(EN) : fillKeyText(3);
                        }
                    }
                },
                "ShiftLeft"
            );

            registerChange(
                () => {
                    if (!shiftBtn) {
                        RU = 2;
                        EN = 4;
                        if (language === 'ru') {
                            keyboardButton.getAttribute('data-value') === value[1] ? fillKeyText(RU) : fillKeyText(1);
                        } else if (language === 'en') {
                            keyboardButton.getAttribute('data-value') === value[3] ? fillKeyText(EN) : fillKeyText(3);
                        }
                    }
                },
                "ShiftRight"
            );

            registerChange(
                () => {
                    capsLockBtn === true ? false : true;
                    console.log(RU);
                    if (language === 'ru') {
                        RU = 2;
                        keyboardButton.getAttribute('data-value') === value[1] ? fillKeyText(RU) : fillKeyText(1);
                        console.log(RU);
                    } else if (language === 'en') {
                        EN = 4;
                        keyboardButton.getAttribute('data-value') === value[3] ? fillKeyText(EN) : fillKeyText(3);
                    }
                },
                "CapsLock"
            );
        });
    }

    // keyboard mouse events
    let backspaceFn = () => document.querySelector('.textarea').value = document.querySelector('.textarea').value.slice(0, -1);
    let tabFn = () => document.querySelector('.textarea').value += '    ';
    let spaceFn = () => document.querySelector('.textarea').value += ' ';
    let enterFn = () => document.querySelector('.textarea').value += '\n';
    let deleteFn = () => {
        let textCursorPositionStart = document.querySelector('.textarea').selectionStart;
        let textCursorPositionEnd = document.querySelector('.textarea').selectionEnd;
        let sliceNumber = textCursorPositionEnd - textCursorPositionStart;
        if (textCursorPositionStart === textCursorPositionEnd) {
            sliceNumber = 1;
        }

        document.querySelector('.textarea').value = document.querySelector('.textarea').value.slice(0, textCursorPositionStart)
            + document.querySelector('.textarea').value.slice(textCursorPositionStart+sliceNumber);
        document.querySelector('.textarea').selectionStart = textCursorPositionStart;
        document.querySelector('.textarea').selectionEnd = textCursorPositionStart;
    };

    document.querySelectorAll('.keyboard__key').forEach(function (value) {
        value.addEventListener('click', () => {
            document.querySelector('.textarea').value += value.getAttribute('data-value');
            let pressedBtnKeyCode = value.getAttribute('data-key');

            if (pressedBtnKeyCode === 'Backspace') {
                backspaceFn();
            }
            if (pressedBtnKeyCode === 'Tab') {
                tabFn();
            }
            if (pressedBtnKeyCode === 'Space') {
                spaceFn();
            }
            if (pressedBtnKeyCode === 'Enter') {
                enterFn();
            }
            if (pressedBtnKeyCode === 'Delete') {
                deleteFn();
            }
        });
    });

    // keyboard keys events
    document.addEventListener('keydown', (e) => {
        e.preventDefault();
        document.querySelector('.textarea').focus();
        let pressedBtnKeyCode = e.code;

        document.querySelectorAll('.keyboard__key').forEach((value) => {
            let keyCode = value.getAttribute('data-key');
            if (pressedBtnKeyCode === keyCode) {
                value.classList.add('active');
                document.querySelector('.textarea').value += value.getAttribute('data-value');
            }
            if (pressedBtnKeyCode === keyCode && keyCode === 'Backspace') {
                backspaceFn();
            }
            if (pressedBtnKeyCode === keyCode && keyCode === 'Tab') {
                tabFn();
            }
            if (pressedBtnKeyCode === keyCode && keyCode === 'Space') {
                spaceFn();
            }
            if (pressedBtnKeyCode === keyCode && keyCode === 'Enter') {
                enterFn();
            }
            if (pressedBtnKeyCode === keyCode && keyCode === 'Delete') {
                deleteFn();
            }
            if (pressedBtnKeyCode === keyCode && (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') && !shiftBtn) {
                shiftBtn = true;
            }
            if (pressedBtnKeyCode === keyCode && keyCode === 'CapsLock' && !capsLockBtn) {
                capsLockBtn = true;
            }
        });
    });

    document.addEventListener('keyup', () => {
        document.querySelectorAll('.keyboard__key').forEach((value) => {
            value.classList.remove('active');
        });
    });
};
