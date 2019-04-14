'use strict'

var net = require('net')
var Promise = require('bluebird')
var builder = require('xmlbuilder')
var iconv = require('iconv-lite')
var parseString = require('xml2js').parseString

/**
 * Create a new CKIPClient.
 *
 * @public
 * @constructor
 * @param {string} serverIP - Server IP
 * @param {number} serverPort - Server Port
 * @param {string} username - Username
 * @param {string} password - Password
 */
function CKIPClient (serverIP, serverPort, username, password) {
  if (!(this instanceof CKIPClient)) {
    return new CKIPClient(serverIP, serverPort, username, password)
  }
  this.serverIP = serverIP
  this.serverPort = serverPort
  this.username = username
  this.password = password
}

/**
 * Connent the CKIP server.
 *
 * @private
 * @method
 * @param  {Buffer}  data - The input data.
 * @return {Promise} The promise with data received from server.
 */
CKIPClient.prototype.connect = function (data) {
  return new Promise(function (resolve, reject) {
    var client = net.connect({ port: this.serverPort, host: this.serverIP }, function () {
      client.write(data)
    })
    client.on('data', resolve)
    client.on('error', reject)
  }.bind(this))
}

/**
 * Send a request to CKIP server.
 *
 * @public
 * @method
 * @param  {string}   text - The text to tokenize.
 * @param  {Function} callback - The callback function for when request is complete.
 * @return {Promise}  The promise with response of the request.
 */
CKIPClient.prototype.request = function (text, callback) {
  callback = callback || function () {}

  return new Promise(function (resolve, reject) {
    var xml = builder.create('wordsegmentation').att('version', '0.1')
      .ele('option', { 'showcategory': '1' }).up()
      .ele('authentication', { 'username': this.username, 'password': this.password }).up()
      .ele('text', text)
      .end({ pretty: true })

    var data = iconv.encode(xml, 'big5')

    this.connect(data)
      .then(function (data) {
        var xml = iconv.decode(data, 'big5')

        parseString(xml, function (err, result) {
          if (err) throw err
          var statusCode = result.wordsegmentation.processstatus[0].$.code
          var processStatus = result.wordsegmentation.processstatus[0]._
          if (statusCode !== '0') throw new Error(processStatus)
          resolve(xml)
          return callback(null, xml)
        })
      })
      .catch(function (err) {
        reject(err)
        return callback(err)
      })
  }.bind(this))
}

/**
 * Get sentences from the server response.
 *
 * @public
 * @method
 * @param  {string}   data - Read data from the server response.
 * @param  {Function} callback - The callback function for when parsing is complete.
 * @return {Promise}  The promise with sentences from the parsing result.
 */
CKIPClient.prototype.getSentences = function (data, callback) {
  callback = callback || function () {}

  return new Promise(function (resolve, reject) {
    parseString(data, function (err, result) {
      if (err) {
        reject(err)
        return callback(err)
      }

      var sentences = result.wordsegmentation.result[0].sentence
      resolve(sentences)
      return callback(null, sentences)
    })
  })
}

/**
 * Get terms from the server response.
 *
 * @public
 * @method
 * @param  {string}   data - Read data from the server response.
 * @param  {Function} callback - The callback function for when parsing is complete.
 * @return {Promise}  The promise with terms from the parsing result.
 */
CKIPClient.prototype.getTerms = function (data, callback) {
  callback = callback || function () {}

  return new Promise(function (resolve, reject) {
    this.getSentences(data, function (err, sentences) {
      if (err) {
        reject(err)
        return callback(err)
      }

      var terms = []
      sentences.forEach(function (sentence, i) {
        var tokens = sentences[i].split('　')

        tokens.forEach(function (token, i) {
          if (tokens[i]) {
            var segments = tokens[i].match(/(\S*)\((\S*)\)/)
            terms.push({ term: segments[1], tag: segments[2] })
          }
        })
      })

      resolve(terms)
      return callback(null, terms)
    })
  }.bind(this))
}

module.exports = CKIPClient
