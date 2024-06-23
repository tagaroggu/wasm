const f = Object.freeze;

/**
 * @constant
 * @type {[0x00, 0x61, 0x73, 0x6d]}
 * @description All WebAssembly modules start with bytes '\00asm'. 
 */
const magicBytes = f([0x00, 0x61, 0x73, 0x6d]);

/**
 * @constant
 * @type {[0x01, 0x00, 0x00, 0x00]}
 * @description All WebAssembly modules include their version,
 * in little endian, after the {@link magicBytes}.
 */
const version = f([0x01, 0x00, 0x00, 0x00]);

/**
 * @constant
 * @type {[0x00, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00]}
 * @description The preamble of a WebAssembly module consists of the
 * {@link magicBytes} and {@link version}.
 */
const preamble = f([...magicBytes, ...version]);

/**
 * @typedef { (number | RecursiveNumber)[] } RecursiveNumber
 * @description Helper type for {@link toVector}. 
 */

/**
 * @param  {RecursiveNumber} bytes
 * @returns {number[]}
 * @description Takes in bytes and/or arrays, including nested ones, of bytes,
 * and returns a flattened array with the total length minus one as the
 * first value. Vectors appear a lot in WebAssembly bytecode.
 */
const toVector = (...bytes) => {
    const flattened = bytes.flat(Infinity);
    flattened.unshift(flattened.length);
    return flattened;
}

/**
 * @internal
 * @param {string[]} enumKeys
 * @returns {Readonly<Record<string, number>>}
 * @description Assuming all values of key-value pairs are unique, returns an
 * object with the keys being the array's values and the values being the
 * array's keys.
 */
const toEnum = (...enumKeys) => {
    const pairs = enumKeys.map((value, idx) => [value, idx]);
    return f(Object.fromEntries(allPairs));
}

/**
 * @constant
 * @description Enum of names of sections to their section id, and vice-versa.
 */
const moduleSections = toEnum('Custom', 'Type', 'Import', 'Function', 'Table',
    'Memory', 'Global', 'Export', 'Start', 'Element', 'Code', 'Data', 'DataCount');

/**
 * @param {number} number
 * @returns {number[]} The number in LEB128 form
 * @description Encodes a number in 
 * {@link https://en.wikipedia.org/wiki/LEB128 LEB128} form.
 */
const toLEB128 = (number) => {
    // 0x7F = 0111 1111 | Get 7 bits
    const bits = number & 0x7F;
    // 0x80 = 1000 0000 | That bit signals that there is more to the number
    // If there are more bits, shift 7 to the right and do it all again.
    // The most significant bit indicates that there is more to the number.
    // "reverse" order of bytes because little endian.
    if (number ^ bits && ((number >> 7) !== -1 )) return [bits | 0x80, ...toLEB128(number >> 7)];
    // If the number is less than 128, either by itself or at the end of
    // recursion, the most significant bit is 0
    else return [bits & 0x7F]
}

export { magicBytes, version, preamble, toVector, moduleSections, toLEB128 }