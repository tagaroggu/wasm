/**
 * @description An integer encoded in 32 bits.
 */
const I32 = 0x7F;

/**
 * @description An integer encoded in 64 bits.
 */
const I64 = 0x7E;

/**
 * @description A floating point number encoded in 32 bits.
 */
const F32 = 0x7D;

/**
 * @description A floating point number encoded in 64 bits.
 */
const F64 = 0x7C;

/**
 * @description A vector of 128 bits. 
 */
const V128 = 0x7B;

/**
 * @description A reference to a function. A referenced function can be from
 * within the WASM program or from an external environment.
 */
const Funcref = 0x70

/**
 * @description A reference to anything from an external environment. Can be
 * passed to internal and external functions.
 */
const Externref = 0x6F;

/**
 * @description Used in defining a function. Takes 2 vectors, both as
 * {@link Result} types.
 */
const Function = 0x60;

/**
 * @description A vector of bytes encoding either the arguments or results of a
 * {@link Function}.
 */
const Result = 0x40;

/**
 * @description A table is a fixed type indexable matrix of values. Does not
 * have an opcode.
 */
const Table = undefined;
/**
 * @description A memory is a buffer of numeric values indexable by offsets.
 * Does not have an opcode.
 */
const Memeory = undefined;
/**
 * @description A global is a value available throughout a WASM module. Does
 * not have an opcode.
 */
const Global = undefined;


export { I32, I64, F32, F64, V128, Funcref, Externref }