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

evalDefaults['itoa'] = itoa;
evalDefaults['hex'] = (n: number, padTo: number = 0, padChar: string | number = 0) => itoa(n, 16, padTo, padChar);
evalDefaults['bin'] = (n: number, padTo: number = 0, padChar: string | number = 0) => itoa(n, 2, padTo, padChar);
evalDefaults['oct'] = (n: number, padTo: number = 0, padChar: string | number = 0) => itoa(n, 8, padTo, padChar);

export default evalDefaults;