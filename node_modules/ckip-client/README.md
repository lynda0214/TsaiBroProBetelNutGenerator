# ckip-client

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][codecov-image]][codecov-url]

> CKIP Client for Node.js

## Install

```
$ npm install --save ckip-client
```

## Usage

```js
var ckip = require('ckip-client')(serverIP, serverPort, username, password);

ckip.request('台新金控12月3日將召開股東臨時會進行董監改選。', function (err, response) {
  if (err) throw err;

  ckip.getSentences(response, function (err, setences) {
    if (err) throw err;
    console.log(setences);  // [ '　台新(N)　金控(N)　12月(N)　3日(N)　將(ADV)　召開(Vt)
                            // 　股東(N)　臨時會(N)　進行(Vt)　董監(N)　改選(Nv)　。(PERIODCATEGORY)' ]
  });

  ckip.getTerms(response, function (err, terms) {
    if (err) throw err;
    console.log(terms);  // [ { term: '台新', tag: 'N' },
                         //   { term: '金控', tag: 'N' },
                         //   { term: '12月', tag: 'N' },
                         //   { term: '3日', tag: 'N' },
                         //   { term: '將', tag: 'ADV' },
                         //   { term: '召開', tag: 'Vt' },
                         //   { term: '股東', tag: 'N' },
                         //   { term: '臨時會', tag: 'N' },
                         //   { term: '進行', tag: 'Vt' },
                         //   { term: '董監', tag: 'N' },
                         //   { term: '改選', tag: 'Nv' },
                         //   { term: '。', tag: 'PERIODCATEGORY' } ]
  });
});
```

### Promise Support

```js
ckip.request('台新金控12月3日將召開股東臨時會進行董監改選。')
  .then(function (response) {
    return Promise.all([ckip.getSentences(response), ckip.getTerms(response)]);
  })
  .then(function (results) {
    console.log(results[0]);  // [ '　台新(N)　金控(N)　12月(N)　3日(N)　將(ADV)　召開(Vt)
                              // 　股東(N)　臨時會(N)　進行(Vt)　董監(N)　改選(Nv)　。(PERIODCATEGORY)' ]

    console.log(results[1]);  // [ { term: '台新', tag: 'N' },
                              //   { term: '金控', tag: 'N' },
                              //   { term: '12月', tag: 'N' },
                              //   { term: '3日', tag: 'N' },
                              //   { term: '將', tag: 'ADV' },
                              //   { term: '召開', tag: 'Vt' },
                              //   { term: '股東', tag: 'N' },
                              //   { term: '臨時會', tag: 'N' },
                              //   { term: '進行', tag: 'Vt' },
                              //   { term: '董監', tag: 'N' },
                              //   { term: '改選', tag: 'Nv' },
                              //   { term: '。', tag: 'PERIODCATEGORY' } ]
  })
  .catch(function (err) {
    console.log(err);
  });
```

## Reference

[中文斷詞系統](http://ckipsvr.iis.sinica.edu.tw)

## License

MIT © [Chun-Kai Wang]()

[npm-image]: https://img.shields.io/npm/v/ckip-client.svg
[npm-url]: https://npmjs.org/package/ckip-client
[travis-image]: https://img.shields.io/travis/chunkai1312/ckip-client.svg
[travis-url]: https://travis-ci.org/chunkai1312/ckip-client
[codecov-image]: https://img.shields.io/codecov/c/github/chunkai1312/ckip-client.svg
[codecov-url]: https://codecov.io/gh/chunkai1312/ckip-client
