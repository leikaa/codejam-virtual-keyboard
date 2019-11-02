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
        ['ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
        ['Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'DEL'],
        ['Caps Lock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'ENTER'],
        ['Shift', '\\', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', 'arrUp', 'Shift'],
        ['Ctrl', 'Win', 'Alt', 'space', 'Alt', 'Ctrl', 'arrLeft', 'arrDown', 'arrRight']
    ];

    for (let i = 1; i <= innerRowsCount; i++) {
        // add inner keyboard rows
        let keyboardRow = document.createElement('div');
        keyboardRow.classList.add(`keyboard__row-${i}`, 'keyboard__row');
        document.querySelector('.keyboard').append(keyboardRow);

        // add inner rows buttons
        keyboardButtons[i-1].forEach((value) => {
            let keyboardButton = document.createElement('div');
            keyboardButton.classList.add('keyboard__key');
            keyboardButton.setAttribute('data-key', value);
            keyboardButton.textContent = value;
            document.querySelector(`.keyboard__row-${i}`).append(keyboardButton);
        });
    }
};
