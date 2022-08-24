import * as des from '../src'
import * as originalDes from '../original/des';
import * as util from './util';


describe('byteToHex()', () => {
  it('simple convert test', () => {
    const byte = [1, 1, 0, 0];
    const hex = des.byteToHex(byte);
    expect(hex).toBe(originalDes.bt4ToHex(byte.join('')));
  });
  it('bigger convert test', () => {
    // random 64-bit byte array
    const byte: number[] = [];
    for (let i = 0; i < 64; i++) {
      byte.push(Math.random() > 0.5 ? 1 : 0);
    }
    const hex = des.byteToHex(byte);
    expect(hex).toBe(originalDes.bt64ToHex(byte.join('')));
  });
})

describe('xor()', () => {
  it('simple xor test', () => {
    const byte1 = [1, 1, 0, 0];
    const byte2 = [1, 0, 1, 0];
    const result = des.xor(byte1, byte2);
    expect(result).toEqual(originalDes.xor(byte1, byte2));
  })
});

describe('tableConvert()', () => {
  it('simple table convert test', () => {
    const byte = [1, 1, 0, 0]
    const table = [2, 3, 4, 1]
    const result = des.tableConvert(byte, table)
    expect(result).toEqual([1, 0, 0, 1])
  });
  it('INITIAL_PERMUTATION_TABLE test', () => {
    // generate 64 bit binary array
    const byte: number[] = [];
    for (let i = 0; i < 64; i++) {
      byte.push(Math.random() > 0.5 ? 1 : 0);
    }
    const result = des.tableConvert(byte, des.INITIAL_PERMUTATION_TABLE)
    expect(result).toEqual(originalDes.initPermute(byte))
  });
  it('FINAL_PERMUTATION_TABLE test', () => {
    // generate 64 bit binary array
    const byte: number[] = [];
    for (let i = 0; i < 64; i++) {
      byte.push(Math.random() > 0.5 ? 1 : 0);
    }
    const result = des.tableConvert(byte, des.FINAL_PERMUTATION_TABLE)
    expect(result).toEqual(originalDes.finallyPermute(byte))
  });
  it('EXPAND_PERMUTATION_TABLE test', () => {
    // generate 32 bit binary array
    const byte: number[] = [];
    for (let i = 0; i < 32; i++) {
      byte.push(Math.random() > 0.5 ? 1 : 0);
    }
    const result = des.tableConvert(byte, des.EXPAND_PERMUTATION_TABLE)
    expect(result).toEqual(originalDes.expandPermute(byte))
  });
  it('P_BOX_TABLE test', () => {
    // generate 32 bit binary array
    const byte: number[] = [];
    for (let i = 0; i < 32; i++) {
      byte.push(Math.random() > 0.5 ? 1 : 0);
    }
    const result = des.tableConvert(byte, des.P_BOX_TABLE)
    expect(result).toEqual(originalDes.pPermute(byte))
  });
  it('PC_2_TABLE test', () => {
    // generate 64 bit binary array
    const raw = '11100001100110010101010111111010101011001100111100011110'
    const byte = raw.split('').map(x => parseInt(x));
    const result = '000110110000001011101111111111000111000001110010'.split('').map(x => parseInt(x));
    expect(des.tableConvert(byte, des.PC_2_TABLE)).toEqual(result)
  });
});

describe('moveByte()', () => {
  it('simple move byte test', () => {
    const byte = [1, 1, 0, 0];
    const result = des.moveByte(byte, 1);
    expect(result).toEqual([1, 0, 0, 1]);
  });
});

describe('stringToByte()', () => {
  it('simple string to byte test', () => {
    const string = 'good';
    const result = des.stringToByte(string);
    expect(result).toEqual(originalDes.strToBt(string));
  });
  it('getKeyBytesTest', () => {
    const string = 'good';
    const result = des.stringToByte(string);
    expect(result).toEqual(originalDes.getKeyBytes(string)[0]);
  })
});

describe('stringToByteWithFill()', () => {
  it('simple string to byte with filltest', () => {
    const string = 'z';
    const result = des.stringToByteWithFill(string);
    expect(result).toEqual(originalDes.strToBt(string));
  });
  it('with getKeyByte', () => {
    const string = 'z';
    const result = des.stringToByteWithFill(string);
    expect(result).toEqual(originalDes.getKeyBytes(string)[0]);
  })
});

describe('stringToByteGroup', () => {

  it('simple string to byte group test', () => {
    const string = 'reimei';
    const expected = originalDes.getKeyBytes(string)
    let index = 0;
    des.stringToByteGroup(string, (byte) => {
      expect(byte).toEqual(expected[index]);
      index++;
    })
    // expect(result).toEqual(originalDes.getKeyBytes(string)[0]);
  })
})

describe('sBoxConvert()', () => {
  it('simple sbox convert test', () => {
    const byte = [1, 1, 0, 1, 1, 1];
    const result = des.sBoxConvert(byte, 0);
    expect(result).toEqual([1, 1, 1, 0]);
  });
});

describe('sBoxGroupConvert()', () => {
  it('random sbox group convert test', () => {
    // generate 48 bit binary array
    const byte: number[] = [];
    for (let i = 0; i < 48; i++) {
      byte.push(Math.random() > 0.5 ? 1 : 0);
    }
    const result = des.sBoxGroupConvert(byte);
    expect(result).toEqual(originalDes.sBoxPermute(byte));

  })
})

describe('keychain()', () => {
  it('simple keychain test', () => {
    const key = 'good';
    const result = des.keychain(des.stringToByte(key));
    expect(result).toEqual(originalDes.generateKeys(originalDes.strToBt(key)));
  })
})

describe('_encrypt()', () => {
  it('simple encrypt test', () => {
    const key = des.stringToByte('good');
    const string = des.stringToByte('nice');
    const result = des._encrypt(string, key);
    originalDes.enc(string, key)
    expect(result).toEqual(originalDes.enc(string, key));
  });
  it('small string test', () => {
    const string = 'npm';
    const key = 'mod';
    const result = des._encrypt(des.stringToByteWithFill(string), des.stringToByteWithFill(key));
    expect(result).toEqual(originalDes.enc(originalDes.strToBt(string), originalDes.strToBt(key)));
  })
})

describe('encrypt()', () => {
  it('simple encrypt test', () => {
    const key = 'goodtek';
    const plainText = 'reimei';
    const result = des.encrypt(plainText, [key]);
    expect(result).toBe(originalDes.strEnc(plainText, key));
  });
  it('random string test', () => {
    const randomString = util.randomString(15);
    const randomKey = util.randomString(15);
    const result = des.encrypt(randomString, [randomKey]);
    expect(result).toBe(originalDes.strEnc(randomString, randomKey));
  })
  it('multiple key test', () => {
    const randomString = util.randomString(15);
    const keys = [
      util.randomString(15),
      util.randomString(15),
    ]
    const result = des.encrypt(randomString, keys);
    expect(result).toBe(originalDes.strEnc(randomString, keys[0], keys[1]));
  });
});


// describe('des', () => {
//   describe('byteToHex()', () => {
//     it('should convert correctly', () => {
//       const byte = [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f];
//       const hex = des.byteToHex(byte);
//       expect(hex).to.be('000102030405060708090a0b0c0d0e0f');
//     })
//   })
// })