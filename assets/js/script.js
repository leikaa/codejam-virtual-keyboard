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
            ['Digit0', '0', ')', '0', ')'], ['Minus', '-', '_', '-', '_'], ['Equal', '=', '+', '=', '+'], ['Backspace', 'Backspace']],
        [['Tab', 'Tab'], ['KeyQ', 'й', 'Й', 'q', 'Q'], ['KeyW', 'ц', 'Ц', 'w', 'W'], ['KeyE', 'у', 'У', 'e', 'E'], ['KeyR', 'к', 'К', 'r', 'R'], ['KeyT', 'е', 'Е', 't', 'T'],
            ['KeyY', 'н', 'Н', 'y', 'Y'], ['KeyU', 'г', 'Г', 'u', 'U'], ['KeyI', 'ш', 'Ш', 'i', 'I'], ['KeyO', 'щ', 'Щ', 'o', 'O'], ['KeyP', 'з', 'З', 'p', 'P'],
            ['BracketLeft', 'х', 'Х', '[', '{'], ['BracketRight', 'ъ', 'Ъ', ']', '}'], ['Delete', 'Del']],
        [['CapsLock', 'Caps Lock'], ['KeyA', 'ф', 'Ф', 'a', 'A'], ['KeyS', 'ы', 'Ы', 's', 'S'], ['KeyD', 'в', 'В', 'd', 'D'], ['KeyF', 'а', 'А', 'f', 'F'], ['KeyG', 'п', 'П', 'g', 'G'],
            ['KeyH', 'р', 'Р', 'h', 'H'], ['KeyJ', 'о', 'О', 'j', 'J'], ['KeyK', 'л', 'Л', 'k', 'K'], ['KeyL', 'д', 'Д', 'l', 'L'], ['Semicolon', 'ж', 'Ж', ';', ':'],
            ['Quote', 'э', 'Э', '\'', '\"'], ['Enter', 'Enter']],
        [['ShiftLeft', 'Shift'], ['KeyZ', 'я', 'Я', 'z', 'Z'], ['KeyX', 'ч', 'Ч', 'x', 'X'], ['KeyC', 'с', 'С', 'c', 'C'], ['KeyV', 'м', 'М', 'v', 'V'], ['KeyB', 'и', 'И', 'b', 'B'],
            ['KeyN', 'т', 'Т', 'n', 'N'], ['KeyM', 'ь', 'Ь', 'm', 'M'], ['Comma', 'б', 'Б', ',', '<'], ['Period', 'ю', 'Ю', '.', '>'], ['Slash', '.', ',', '/', '?'],
            ['Backslash', '\\', '/', '\\', '|'], ['ShiftRight', 'Shift']],
        [['ControlLeft', 'Ctrl'], ['MetaLeft', 'Win'], ['AltLeft', 'Alt'], ['Space', 'Space'], ['AltRight', 'Alt'], ['ControlRight', 'Ctrl']]
    ];

    // set keyboard structure and styles
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
                keyboardButton.classList.add('medium-length');
            }

            if (value[0] === 'ControlLeft' || value[0] === 'ControlRight') {
                keyboardButton.classList.add('sm-length');
            }

            if (value[0] === 'Space') {
                keyboardButton.classList.add('large-length');
            }

            keyboardButton.setAttribute('data-key', value[0]);
            keyboardButton.textContent = value[1];
            document.querySelector(`.keyboard__row-${i}`).append(keyboardButton);
        });
    }

    // keyboard mouse events
    document.querySelectorAll('.keyboard__key').forEach(function (value) {
        value.addEventListener('click', () => {
            document.querySelector('.textarea').value += value.innerText;
        });
    });

    // keyboard keys events
    document.addEventListener('keydown', (e) => {
        document.querySelector('.textarea').focus();
        let pressedBtnKeyCode = e.code;
        console.log(pressedBtnKeyCode);

        document.querySelectorAll('.keyboard__key').forEach((value) => {
            let keyCode = value.getAttribute('data-key');
            if (pressedBtnKeyCode === keyCode) {
                value.classList.add('active');
            }
        });
    });

    document.addEventListener('keyup', (e) => {
        document.querySelectorAll('.keyboard__key').forEach((value) => {
            value.classList.remove('active');
        });
    });
};
