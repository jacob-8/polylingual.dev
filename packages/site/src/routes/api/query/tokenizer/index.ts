// ESM port of gpt3-tokenizer

import util from 'util';
import { ArrayKeyedMap } from './array-keyed-map';
import { bpeVocab, encodings, bpeRegex } from './vocab';

export class GPT3Tokenizer {
  encodings: any;
  vocab: string;
  nMergedSpaces: number;
  nVocab: number;
  decodings: {};
  bpeRanks: ArrayKeyedMap;
  byteEncoder: Map<any, any>;
  byteDecoder: Map<any, any>;
  cache: {};
  textEncoder: util.TextEncoder;
  textDecoder: util.TextDecoder;

  constructor(options) {
    this.textEncoder = new util.TextEncoder();
    this.textDecoder = new util.TextDecoder();
    this.encodings = encodings;
    this.vocab = bpeVocab;
    this.nMergedSpaces = options.type === 'codex' ? 24 : 0;
    this.nVocab = 50257 + this.nMergedSpaces;
    this.decodings = {};
    this.bpeRanks = new ArrayKeyedMap();
    this.byteEncoder = new Map();
    this.byteDecoder = new Map();
    this.cache = {};
    this.initialize();
  }

  initialize() {
    if (this.vocab.length < 100) {
      throw new Error('Tokenizer vocab file did not load correctly');
    }
    const vocabLines = this.vocab.split('\n');
    const bpeMerges = vocabLines.slice(1, vocabLines.length - 1).map(line => line.split(/(\s+)/).filter(part => part.trim().length > 0));
    // add merged spaces for codex tokenizer
    if (this.nMergedSpaces > 0) {
      for (let i = 1; i < this.nMergedSpaces; i++) {
        for (let j = 1; j < this.nMergedSpaces; j++) {
          if (i + j <= this.nMergedSpaces) {
            bpeMerges.push(['\u0120'.repeat(i), '\u0120'.repeat(j)]);
          }
        }
      }
      for (let i = 0; i < this.nMergedSpaces; i++) {
        this.encodings['\u0120'.repeat(i + 2)] = this.nVocab - this.nMergedSpaces + i;
      }
    }
    for (const key of Object.keys(this.encodings)) {
      this.decodings[this.encodings[key]] = key;
    }
    this.byteEncoder = this.bytesToUnicode();
    this.byteEncoder.forEach((value, key) => {
      this.byteDecoder.set(value, key);
    });
    this.zip(this.bpeRanks, bpeMerges, range(0, bpeMerges.length));
  }

  zip(result, x, y) {
    x.forEach((_, idx) => {
      result.set(x[idx], y[idx]);
    });
    return result;
  }

  bytesToUnicode() {
    const bs = range(ord('!'), ord('~') + 1).concat(range(ord('\xa1'), ord('\xac') + 1), range(ord('\xae'), ord('\xff') + 1));
    let cs = bs.slice();
    let n = 0;
    for (let b = 0; b < Math.pow(2, 8); b++) {
      if (!bs.includes(b)) {
        bs.push(b);
        cs.push(Math.pow(2, 8) + n);
        n = n + 1;
      }
    }
    cs = cs.map(c => chr(c));
    const result = new Map();
    this.zip(result, bs, cs);
    return result;
  }
  
  getPairs(word) {
    const pairs = new Set();
    let prevChar = word[0];
    for (let i = 1; i < word.length; i++) {
      const char = word[i];
      pairs.add([prevChar, char]);
      prevChar = char;
    }
    return pairs;
  }

  bpe(token) {
    if (Object.prototype.hasOwnProperty.call(this.cache, token)) {
      return this.cache[token];
    }
    let word = token.split('');
    let pairs = this.getPairs(word);
    if (!pairs || pairs.size === 0) {
      return token;
    }
    while (true) {
      const minPairs = {};
      for (const pair of Array.from(pairs)) {
        const rank = this.bpeRanks.get(pair);
        minPairs[isNaN(rank) ? 1e11 : rank] = pair;
      }
      const bigram = minPairs[Math.min(...Object.keys(minPairs).map(x => parseInt(x)))];
      if (!this.bpeRanks.has(bigram)) {
        break;
      }
      const first = bigram[0];
      const second = bigram[1];
      let newWord = [];
      let i = 0;
      while (i < word.length) {
        const j = word.indexOf(first, i);
        if (j === -1) {
          newWord = newWord.concat(word.slice(i));
          break;
        }
        newWord = newWord.concat(word.slice(i, j));
        i = j;
        if (word[i] === first && i < word.length - 1 && word[i + 1] === second) {
          newWord.push(first + second);
          i = i + 2;
        } else {
          newWord.push(word[i]);
          i = i + 1;
        }
      }
      word = newWord;
      if (word.length === 1) {
        break;
      } else {
        pairs = this.getPairs(word);
      }
    }
    word = word.join(' ');
    this.cache[token] = word;
    return word;
  }
  
  encodeUtf8(text) {
    return this.textEncoder.encode(text);
  }

  decodeUtf8(bytes) {
    return this.textDecoder.decode(bytes);
  }

  encode(text) {
    let bpeTokens = [];
    let texts = [];
    const matches = text.match(bpeRegex) || [];
    for (let token of matches) {
      token = Array.from(this.encodeUtf8(token)).map(x => this.byteEncoder.get(x)).join('');
      const newTokens = this.bpe(token).split(' ').map(x => this.encodings[x]);
      bpeTokens = bpeTokens.concat(newTokens);
      texts = texts.concat(newTokens.map(x => this.decode([x])));
    }
    return {
      bpe: bpeTokens,
      text: texts
    };
  }

  decode(tokens) {
    const text = tokens.map(x => this.decodings[x]).join('');
    return this.decodeUtf8(new Uint8Array(text.split('').map(x => this.byteDecoder.get(x))));
  }
}

const range = (x, y) => {
  const res = Array.from(Array(y).keys()).slice(x);
  return res;
};

const ord = x => {
  return x.charCodeAt(0);
};

const chr = n => {
  return String.fromCharCode(n);
};