const EMPTY_BYTE = [0, 0, 0, 0, 0, 0, 0, 0]

// const PC_1_TABLE = [
//   57, 49, 41, 33, 25, 17, 9,
//   1, 58, 50, 42, 34, 26, 18,
//   10, 2, 59, 51, 43, 35, 27,
//   19, 11, 3, 60, 52, 44, 36,
//   63, 55, 47, 39, 31, 23, 15,
//   7, 62, 54, 46, 38, 30, 22,
//   14, 6, 61, 53, 45, 37, 29,
//   21, 13, 5, 28, 20, 12, 4
// ]

const PC_1_TABLE = (function () {
  const result: number[] = []
  for (let i = 0; i < 7; i++) {
    for (let j = 0, k = 7; j < 8; j++, k--) {
      result[i * 8 + j] = 8 * k + i + 1
      // console.log(i * 8 + j, '-', 8 * k + i);
    }
  }
  return result
})()

const PC_2_TABLE = [
  14, 17, 11, 24, 1, 5,
  3, 28, 15, 6, 21, 10,
  23, 19, 12, 4, 26, 8,
  16, 7, 27, 20, 13, 2,
  41, 52, 31, 37, 47, 55,
  30, 40, 51, 45, 33, 48,
  44, 49, 39, 56, 34, 53,
  46, 42, 50, 36, 29, 32
]

const INITIAL_PERMUTATION_TABLE = [
  58, 50, 42, 34, 26, 18, 10, 2,
  60, 52, 44, 36, 28, 20, 12, 4,
  62, 54, 46, 38, 30, 22, 14, 6,
  64, 56, 48, 40, 32, 24, 16, 8,
  57, 49, 41, 33, 25, 17, 9, 1,
  59, 51, 43, 35, 27, 19, 11, 3,
  61, 53, 45, 37, 29, 21, 13, 5,
  63, 55, 47, 39, 31, 23, 15, 7
]

const FINAL_PERMUTATION_TABLE = [
  40, 8, 48, 16, 56, 24, 64, 32,
  39, 7, 47, 15, 55, 23, 63, 31,
  38, 6, 46, 14, 54, 22, 62, 30,
  37, 5, 45, 13, 53, 21, 61, 29,
  36, 4, 44, 12, 52, 20, 60, 28,
  35, 3, 43, 11, 51, 19, 59, 27,
  34, 2, 42, 10, 50, 18, 58, 26,
  33, 1, 41, 9, 49, 17, 57, 25
]

const EXPAND_PERMUTATION_TABLE = [
  32, 1, 2, 3, 4, 5,
  4, 5, 6, 7, 8, 9,
  8, 9, 10, 11, 12, 13,
  12, 13, 14, 15, 16, 17,
  16, 17, 18, 19, 20, 21,
  20, 21, 22, 23, 24, 25,
  24, 25, 26, 27, 28, 29,
  28, 29, 30, 31, 32, 1
]

const S_BOX_TABLE = [
  [
    [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
    [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
    [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
    [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]
  ],
  [
    [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
    [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
    [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
    [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]
  ],
  [
    [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
    [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
    [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
    [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]
  ],
  [
    [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
    [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
    [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
    [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]
  ],
  [
    [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
    [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
    [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
    [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]
  ],
  [
    [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
    [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
    [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
    [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]
  ],
  [
    [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
    [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
    [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
    [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]
  ],
  [
    [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
    [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
    [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
    [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]
  ]
]

const P_BOX_TABLE = [
  16, 7, 20, 21, 29, 12, 28, 17,
  1, 15, 23, 26, 5, 18, 31, 10,
  2, 8, 24, 14, 32, 27, 3, 9,
  19, 13, 30, 6, 22, 11, 4, 25
]

const MOVE_UNUSUAL_LOOP_TIME = [1, 2, 9, 16]
const MOVE_UNUSUAL_LOOP_AMOUNT = 1
const MOVE_USUAL_LOOP_AMOUNT = 2

function encrypt(src: string, keys: string[]): string {
  let result = ''
  stringToByteGroup(src, (srcByte) => {
    let blockResult = srcByte
    for (const key of keys) {
      stringToByteGroup(key, (keyByte) => {
        // console.log(blockResult.join(''), ' - ', keyByte.join(''));
        blockResult = _encrypt(blockResult, keyByte)
      })
    }
    result += byteToHex(blockResult)
  })
  return result
}

function _encrypt(srcByte: number[], keyByte: number[]): number[] {
  const chain = keychain(keyByte)
  const dataByte = tableConvert(srcByte, INITIAL_PERMUTATION_TABLE)
  let left = dataByte.slice(0, dataByte.length / 2)
  let right = dataByte.slice(dataByte.length / 2, dataByte.length)

  for (let i = 0; i < 16; i++) {
    // calculate s-box convert
    const beforeSBoxConvertArray = xor(tableConvert(right, EXPAND_PERMUTATION_TABLE), chain[i])
    const sBoxConvertArray = sBoxGroupConvert(beforeSBoxConvertArray)
    // calculate p-box convert
    const pBoxConvertArray = tableConvert(sBoxConvertArray, P_BOX_TABLE)

    // calculate xor
    const xorArray = xor(left, pBoxConvertArray)
    // copy current right array to left array
    left = right
    // copy xor array to right array
    right = xorArray
  }

  // then reverse the left and right array
  return tableConvert(right.concat(left), FINAL_PERMUTATION_TABLE)
}

function xor(srcByte: number[], keyByte: number[]): number[] {
  if (srcByte.length !== keyByte.length) {
    throw new Error(`srcByte.length(${srcByte.length}) !== keyByte.length(${keyByte.length})`)
  }
  const result: number[] = []
  for (let i = 0; i < srcByte.length; i++) {
    result[i] = srcByte[i] ^ keyByte[i]
  }
  return result
}

function keychain(keyByte: number[]): number[][] {
  const result: number[][] = []
  let k = tableConvert(keyByte, PC_1_TABLE)

  // acquire c and d as the left and right halves of k
  let c = k.slice(0, 28)
  let d = k.slice(28, 56)
  for (let i = 0; i < 16; i++) {
    // move the bytes
    if (MOVE_UNUSUAL_LOOP_TIME.includes(i + 1)) {
      c = moveByte(c, MOVE_UNUSUAL_LOOP_AMOUNT)
      d = moveByte(d, MOVE_UNUSUAL_LOOP_AMOUNT)
    } else {
      c = moveByte(c, MOVE_USUAL_LOOP_AMOUNT)
      d = moveByte(d, MOVE_USUAL_LOOP_AMOUNT)
    }

    // merge c and d and convert in table PC-2
    const cd = c.concat(d)
    const cdpc2 = tableConvert(cd, PC_2_TABLE)
    result[i] = cdpc2
    // update k
    k = cd
  }
  return result
}

function tableConvert(src: number[], table: number[]): number[] {
  const result: number[] = []
  for (let i = 0; i < table.length; i++) {
    result[i] = src[table[i] - 1]
  }
  return result
}

function sBoxGroupConvert(src: number[]): number[] {
  const sBoxConvertArray: number[] = []
  for (let j = 0; j < 8; j++) {
    const sBoxConvertedArray = sBoxConvert(src.slice(j * 6, j * 6 + 6), j)
    sBoxConvertArray.push(...sBoxConvertedArray)
  }
  return sBoxConvertArray
}

function sBoxConvert(src: number[], boxNo: number): number[] {
  const result: number[] = []
  if (src.length !== 6) {
    throw new Error('src.length !== 6')
  }
  const row = src[0] * 2 + src[5]
  const col = src[1] * 8 + src[2] * 4 + src[3] * 2 + src[4]
  const sBoxNumber = S_BOX_TABLE[boxNo][row][col]
  // convert sBoxNumber to binary array
  result.push(...decimalToBinary(sBoxNumber, 4))
  return result
}

function moveByte(byte: number[], amount: number): number[] {
  // reserve the moving byte
  const top = byte.slice(0, amount)
  const result: number[] = []
  result.push(...byte.slice(amount, byte.length))
  result.push(...top)
  return result
}

function byteToHex(byte: number[]): string {
  if (byte.length % 4 !== 0) {
    throw new Error('byte.length % 4 !== 0')
  }
  let result = ''
  for (let i = 0; i < byte.length; i += 4) {
    result += parseInt(byte.slice(i, i + 4).join(''), 2).toString(16).toUpperCase()
  }
  return result
}

function stringToByteGroup(src: string, callback: (byte: number[]) => void): void {
  const srcGroupAmount = Math.floor(src.length / 4)
  const srcRemainder = srcGroupAmount % 4
  for (let i = 0; i < srcGroupAmount; i++) {
    const text = src.substring(i * 4, (i + 1) * 4)
    callback(stringToByte(text))
  }
  if (srcRemainder > 0) {
    const text = src.substring(srcGroupAmount * 4, src.length)
    callback(stringToByteWithFill(text))
  }
}

// function binaryCheck(src: number[]): void {
//   for (let i = 0; i < src.length; i++) {
//     if (src[i] !== 0 && src[i] !== 1) {
//       throw new Error('binaryCheck error')
//     }
//   }
// }

function stringToByte(src: string): number[] {
  if (src.length !== 4) {
    throw new Error('Invalid keychain length, required: 4')
  }
  const result: number[] = []
  for (let i = 0; i < src.length; i++) { // length must be 4
    const char = src.charAt(i)
    const charCode = char.charCodeAt(0)

    result.push(...EMPTY_BYTE.concat(decimalToBinary(charCode, 8)))
  }
  return result
}

function stringToByteWithFill(src: string): number[] {
  if (src.length >= 4) {
    throw new Error('The string is no need to fill, use stringToByte() instead.')
  }
  const result: number[] = []
  for (let i = 0; i < src.length; i++) {
    const char = src.charAt(i)
    const charCode = char.charCodeAt(0)
    result.push(...EMPTY_BYTE.concat(decimalToBinary(charCode, 8)))
  }
  for (let i = src.length; i < 4; i++) {
    result.push(...EMPTY_BYTE.concat(EMPTY_BYTE))
  }
  return result
}

function decimalToBinary(decimal: number, length: number): number[] {
  const rawString = decimal.toString(2)
  if (rawString.length > length) {
    throw new Error('Invalid length, given length must be greater than or equal to the length of the binary result.')
  }
  const result: number[] = []
  let resultPointer = 0
  for (let i = 0; i < (length - rawString.length); i++) {
    result[resultPointer++] = 0
  }
  for (let i = 0; i < rawString.length; i++) {
    result[resultPointer++] = parseInt(rawString.charAt(i))
  }
  return result
}

export {
  EMPTY_BYTE,
  PC_1_TABLE,
  PC_2_TABLE,
  INITIAL_PERMUTATION_TABLE,
  FINAL_PERMUTATION_TABLE,
  EXPAND_PERMUTATION_TABLE,
  S_BOX_TABLE,
  P_BOX_TABLE,
  MOVE_UNUSUAL_LOOP_AMOUNT,
  MOVE_UNUSUAL_LOOP_TIME,
  MOVE_USUAL_LOOP_AMOUNT,
  encrypt,
  _encrypt,
  xor,
  keychain,
  tableConvert,
  sBoxConvert,
  sBoxGroupConvert,
  moveByte,
  byteToHex,
  stringToByte,
  stringToByteWithFill,
  stringToByteGroup,
  decimalToBinary
}
