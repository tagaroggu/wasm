/**
 * @description In a situation where a condition should not occur,
 * an unreachable bytecode can be placed which will trap the program.
 */
const Unreachable = 0x00;

/**
 * @description Does nothing.
 */
const Nop = 0x01;

/**
 * @description As a structured instruction alongside {@link Loop} and
 * {@link If}, forms a block of code that must be terminated with {@link End}.
 * Introduces an implicit label which can be branched to with label indices.
 * When branching out of a structured instruction's block, a label index must
 * be passed. The index is relative to the executing code. An index of 0 refers
 * to the innermost block while 1 would be the block outside of the first. For
 * Block and {@link If}, a branch skips over to the end of the block and
 * resumes execution after where it would finish. For {@link Loop}, a branch
 * skips to the beginning of the loop again. Use a {@link Loop} nested inside
 * a Block or {@link If} block in order to break out of the loop.
 * Branching allows skipping over blocks of code or skipping to the next
 * iteration. Requires a block type, which is either a function type index or
 * a value type. 
 */
const Block = 0x02;

/**
 * @description A structured instruction alongside {@link Block} and
 * {@link If}. Requires a block type. Loops inner code until branched out of.
 * See {@link Block} for a detailed explanation of structured instructions.
 */
const Loop = 0x03;

/**
 * @description A structured instruction alongside {@link Block} and
 * {@link Loop}. Requires a block type. Can be terminated with either
 * {@link End} or {@link Else}. See {@link Block} for a detailed explanation
 * of structured instructions. 
 */
const If = 0x04;

/**
 * @description Ends the previous block of code that began with an {@link If}
 * opcode and creates a new block with the same block type that will execute
 * in the case that the if condition for the previous block failed. Requires
 * an {@link End} at the end of the block. See {@link Block} for a detailed
 * explanation of structured instructions.
 */
const Else = 0x05;

/**
 * @description Ends the block of a structured instruction. See {@link Block}
 * for a detailed explanation of structured instructions. 
 */
const End = 0x0B;

/**
 * @description Branches out of a structured instruction's block. Requires a
 * label index. See {@link Block} for a detailed explanation of structured
 * instructions.
 */
const Br = 0x0C;

/**
 * @description Branches out of a structured instruction's block if the
 * topmost value on the stack is nonzero. Equivalent to checking if the
 * topmost value on the stack is zero with an if opcode and executing
 * a regular {@link Br}. Requires a label index. See {@link Block} for a
 * detailed explanation of structured instructions. 
 */
const Br_if = 0x0D;

/**
 * @description Branches out of a structured instruction's block to a label
 * specified by an index into a table of label indices. Requires a table
 * index (currently can only be 0) and an index into said table. See
 * {@link Block} for a detailed explanation of structured instructions.
 */
const Br_table = 0x0E;

/**
 * @description Explicitly returns the topmost value(s) from the stack from a
 * function. If there are more values on the stack than the type signature of
 * the function, it will only return the topmost values, discarding the rest.
 * Values can be implicitly returned from the stack but must match exactly in
 * length to the type signature.
 */
const Return = 0x0F;

/**
 * @description Calls a module-defined function by function index. Expected
 * arguments for function must exist on the stack as it will consume them. 
 * The returned value(s) will be placed on the top of the stack. 
 */
const Call = 0x10;

/**
 * @description Calls a module-defined function by index into a table of
 * function references. Requires an index to a table (currently can only be 0) 
 * and an index into said table to a function, See {@link Call}.
 */

/**
 * @description Removes the topmost value from the stack.
 */
const Drop = 0x1A;

/**
 * @description Takes three arguments, and selects one of the first two
 * depending on the value of the third. First two arguments must be of the 
 * same numeric type as each other, and the third must be an {@link I32}. 
 */
const Select = 0x1B;

/**
 * @description Functions the same as {@link Select} but requires a direct type
 * argument. Necessary when wanting to use select with non-numeric values.
 */
const SelectT = 0x1C;

export { Unreachable, Nop, Block, Loop, If, Else, End, Br, Br_if, Br_table,
    Return, Call, Drop, Select, SelectT }