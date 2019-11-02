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

    // add inner keyboard rows
    let innerRowsCount = 5;
    for (let i = 1; i <= innerRowsCount; i++) {
        let keyboardRow = document.createElement('div');
        keyboardRow.classList.add(`keyboard-row-${i}`);
        document.querySelector('.keyboard').append(keyboardRow);
    }
};
