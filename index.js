"use strict";

const request = require('request');

module.exports = class Altares {
  constructor(credentials) {
    this.baseUrl = credentials.baseUrl || 'https://auth.altares.fr';
    this.client_id = credentials.client_id;
    this.client_secret = credentials.client_secret;
  }

  getAccessToken(code) {
    return new Promise( (resolve, reject) => {
      const payload = {
        client_id: this.client_id,
        client_secret: this.client_secret,
        grant_type: 'authorization_code',
        code: code
      };

      const options = {
        baseUrl: this.baseUrl,
        uri: '/token',
        method: 'POST',
        json: payload
      };

      request(options, (err, response, body) => {
        if (err) return reject(err);
        if (response.statusCode >= 400) return reject(response.statusCode);

        resolve(body);
      });
    });
  }

  getAppAccessToken() {
    return new Promise( (resolve, reject) => {
      const requestTokenParams = {
        baseUrl: `${this.baseUrl}`,
        uri: '/token',
        method: 'POST',
        json: {
          client_id: this.client_id,
          client_secret: this.client_secret,
          grant_type: 'client_credentials',
        }
      };

      request(requestTokenParams, (err, response, body) => (err || response.statusCode >= 400) ? reject(err) : resolve(body) );
    });
  }

  insertTransaction(userId, transaction, accessToken) {
    return new Promise( (resolve, reject) => {
      const requestTransactionParams = {
        baseUrl: this.baseUrl,
        uri: `/users/${userId}/transaction`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        json: {
          transaction: transaction
        }
      };

      request(requestTransactionParams, (err, response, body) => (err || response.statusCode >= 400) ? reject(err) : resolve(body) );
    });
  }

  getTransaction(userId, transactionId, accessToken) {
    return new Promise( (resolve, reject) => {
      const requestTransactionParams = {
        baseUrl: this.baseUrl,
        uri: `/users/${userId}/transactions/${transactionId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        json: true
      };

      request(requestTransactionParams, (err, response, body) => (err || response.statusCode >= 400) ? reject(err) : resolve(body) );
    });
  }

  insertUser(user, accessToken) {
    return new Promise( (resolve, reject) => {
      const requestParameters = {
        baseUrl: this.baseUrl,
        uri: `/users`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        json: {
          user: user
        }
      };

      request(requestParameters, (err, response, body) => (err || response.statusCode >= 400) ? reject(err) : resolve(body) );
    });
  };

  getUser(userId, access_token) {
    return new Promise( (resolve, reject) => {
      const options = {
        baseUrl: this.baseUrl,
        uri: `/users/${userId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`
        },
        json: true
      };

      request(options, (err, response, body) => {
        if (err) return reject(err);
        if (response.statusCode >= 400) return reject(response.statusCode);

        resolve(body);
      });
    });
  }
};
