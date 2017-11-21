const evalDefaults: any = {};

// First we just take everything from math:
for (let key of Object.getOwnPropertyNames(Math)) {
    evalDefaults[key] = Math[key];
}

/// Converts a number to a string.
function itoa(n: number, radix: number, padTo: number = 0, padChar: string | number = 0) {
    let str = n.toString(radix);
    if (str.length < padTo) {
        let padding = '';
        for (let it = 0; it < (padTo - str.length); it++) { padding += padChar; }
        str = padding + str;
    }
    return str;
};

// Hexadecimal to Decimal
function hex2dec(s: string | number) {
    return parseInt(s.toString(), 16);
};

// Binary to Decimal
function bin2dec(n: number) {
    return parseInt(n.toString(), 2);
};

// Octal to Decimal
function oct2dec(n: number) {
    return parseInt(n.toString(), 8);
};

evalDefaults['itoa'] = itoa;
evalDefaults['hex'] = (n: number, padTo: number = 0, padChar: string | number = 0) => itoa(n, 16, padTo, padChar);
evalDefaults['bin'] = (n: number, padTo: number = 0, padChar: string | number = 0) => itoa(n, 2, padTo, padChar);
evalDefaults['oct'] = (n: number, padTo: number = 0, padChar: string | number = 0) => itoa(n, 8, padTo, padChar);

evalDefaults['dec2hex'] = evalDefaults['hex'];
evalDefaults['dec2bin'] = evalDefaults['bin'];
evalDefaults['dec2oct'] = evalDefaults['oct'];

evalDefaults['hex2dec'] = (s: string | number) => hex2dec(s);
evalDefaults['hex2bin'] = (s: string | number, padTo: number = 0, padChar: string | number = 0) => itoa(hex2dec(s), 2, padTo, padChar);
evalDefaults['hex2oct'] = (s: string | number, padTo: number = 0, padChar: string | number = 0) => itoa(hex2dec(s), 8, padTo, padChar);

evalDefaults['bin2dec'] = (n: number) => bin2dec(n);
evalDefaults['bin2hex'] = (n: number, padTo: number = 0, padChar: string | number = 0) => itoa(bin2dec(n), 16, padTo, padChar);
evalDefaults['bin2oct'] = (n: number, padTo: number = 0, padChar: string | number = 0) => itoa(bin2dec(n), 8, padTo, padChar);

evalDefaults['oct2dec'] = (n: number) => oct2dec(n);
evalDefaults['oct2bin'] = (n: number, padTo: number = 0, padChar: string | number = 0) => itoa(oct2dec(n), 2, padTo, padChar);
evalDefaults['oct2hex'] = (n: number, padTo: number = 0, padChar: string | number = 0) => itoa(oct2dec(n), 16, padTo, padChar);

export default evalDefaults;
