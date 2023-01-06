const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

//random funcs

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[(Math.floor(Math.random() * symbols.length))];
}

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}



generate.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    resultEl.value = generatePassword(hasLower, hasNumber, hasSymbol, hasUpper, length);

})


// Generate button

function generatePassword(lower, number, symbol, upper, length) {

    let generatedPassword = "";
    const typesCount = randomFunc.lower + randomFunc.upper + randomFunc.number + randomFunc.symbol;
    let typesArr = [{
        lower
    }, {
        upper
    }, {
        number
    }, {
        symbol
    }].filter(item => Object.values(item)[0]);

    if (!lower && !number && !symbol && !upper) {
        typesArr = [{
            lower: true
        }, {
            upper: true
        }, {
            number: false
        }, {
            symbol: false
        }].filter(item => Object.values(item)[0]);
    }

    for (let i = 0; i < length; i++) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;

}


// Clipboard button

clipboard.addEventListener('click', () => {
    const copyText = resultEl
    copyText.select()
    copyText.setSelectionRange(0, 999)
    navigator.clipboard.writeText(copyText.value)
    alert("Password kopyalandı")


})