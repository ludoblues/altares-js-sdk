const request = require('request');

module.exports = class Altares {
  constructor(credentials) {
    this.client_id = credentials.client_id;
    this.client_secret = credentials.client_secret;

    this.ssoBaseUrl = credentials.ssoBaseUrl || 'https://sso.altares.fr';
    this.paymentBaseUrl = credentials.paymentBaseUrl || 'https://payment.altares.fr';
  }

  /*
  *** SSO
  */

  getAccessToken(code) {
    return new Promise( (resolve, reject) => {
      const payload = {
        client_id: this.client_id,
        client_secret: this.client_secret,
        grant_type: 'authorization_code',
        code: code
      };

      const requestParameters = {
        baseUrl: this.ssoBaseUrl,
        uri: '/token',
        method: 'POST',
        json: payload
      };

      request(requestParameters, (err, response, body) => (err || response.statusCode >= 400) ? reject(err || body) : resolve(body) );
    });
  }

  getAppAccessToken() {
    return new Promise( (resolve, reject) => {
      const requestParameters = {
        baseUrl: `${this.ssoBaseUrl}`,
        uri: '/token',
        method: 'POST',
        json: {
          client_id: this.client_id,
          client_secret: this.client_secret,
          grant_type: 'client_credentials',
        }
      };

      request(requestParameters, (err, response, body) => (err || response.statusCode >= 400) ? reject(err || body) : resolve(body) );
    });
  }

  insertUser(user, accessToken) {
    return new Promise( (resolve, reject) => {
      const requestParameters = {
        baseUrl: this.ssoBaseUrl,
        uri: `/users`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        json: user
      };

      request(requestParameters, (err, response, body) => (err || response.statusCode >= 400) ? reject(err || body) : resolve(body) );
    });
  };

  updateUser(userId, userCredentialsToUpdate, accessToken) {
    return new Promise( (resolve, reject) => {
      const requestParameters = {
        baseUrl: this.ssoBaseUrl,
        uri: `/users/${userId}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        json: userCredentialsToUpdate
      };

      request(requestParameters, (err, response, body) => (err || response.statusCode >= 400) ? reject(err || body) : resolve(body) );
    });
  };

  getUser(userId, access_token) {
    return new Promise( (resolve, reject) => {
      const requestParameters = {
        baseUrl: this.ssoBaseUrl,
        uri: `/users/${userId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${access_token}`
        },
        json: true
      };

      request(requestParameters, (err, response, body) => (err || response.statusCode >= 400) ? reject(err || body) : resolve(body) );
    });
  }

  addUserProducts(userId, productsToAdd, access_token) {
    return new Promise( (resolve, reject) => {
      const requestParameters = {
        baseUrl: this.ssoBaseUrl,
        uri: `/users/${userId}/products`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`
        },
        json: productsToAdd
      };

      request(requestParameters, (err, response, body) => (err || response.statusCode >= 400) ? reject(err || body) : resolve(body) );
    });
  }

  updateUserProducts(userId, newProducts, access_token) {
    return new Promise( (resolve, reject) => {
      const requestParameters = {
        baseUrl: this.ssoBaseUrl,
        uri: `/users/${userId}/products`,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${access_token}`
        },
        json: newProducts
      };

      request(requestParameters, (err, response, body) => (err || response.statusCode >= 400) ? reject(err || body) : resolve(body) );
    });
  }

  removeUserProducts(userId, productsToRemove, access_token) {
    return new Promise( (resolve, reject) => {
      const requestParameters = {
        baseUrl: this.ssoBaseUrl,
        uri: `/users/${userId}/products`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${access_token}`
        },
        json: productsToRemove
      };

      request(requestParameters, (err, response, body) => (err || response.statusCode >= 400) ? reject(err || body) : resolve(body) );
    });
  }

  addUserSubscriptions(userId, subscriptionsToAdd, access_token) {
    return new Promise( (resolve, reject) => {
      const requestParameters = {
        baseUrl: this.ssoBaseUrl,
        uri: `/users/${userId}/subscriptions`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`
        },
        json: subscriptionsToAdd
      };

      request(requestParameters, (err, response, body) => (err || response.statusCode >= 400) ? reject(err || body) : resolve(body) );
    });
  }

  /*
  *** Payment
  */

  insertOrder(order, accessToken) {
    return new Promise( (resolve, reject) => {
      const requestParameters = {
        baseUrl: this.paymentBaseUrl,
        uri: `/order`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        json: order
      };

      request(requestParameters, (err, response, body) => (err || response.statusCode >= 400) ? reject(err || body) : resolve(body) );
    });
  }

  insertSubscription(subscription, accessToken) {
    return new Promise( (resolve, reject) => {
      const requestParameters = {
        baseUrl: this.paymentBaseUrl,
        uri: `/subscription`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        json: subscription
      };

      request(requestParameters, (err, response, body) => (err || response.statusCode >= 400) ? reject(err || body) : resolve(body) );
    });
  }

  insertTransaction(order, transaction, accessToken) {
    return new Promise( (resolve, reject) => {
      const requestParameters = {
        baseUrl: this.paymentBaseUrl,
        uri: `/order/${order._id}/transaction`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        json: transaction
      };

      request(requestParameters, (err, response, body) => (err || response.statusCode >= 400) ? reject(err || body) : resolve(body) );
    });
  }

  getTransaction(userId, transactionId, accessToken) {
    return new Promise( (resolve, reject) => {
      const requestParameters = {
        baseUrl: this.paymentBaseUrl,
        uri: `/users/${userId}/transactions/${transactionId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        json: true
      };

      request(requestParameters, (err, response, body) => (err || response.statusCode >= 400) ? reject(err || body) : resolve(body) );
    });
  }

  cancelTransaction(userId, transactionId, accessToken) {
    return new Promise( (resolve, reject) => {
      const requestParameters = {
        baseUrl: this.paymentBaseUrl,
        uri: `/users/${userId}/transactions/${transactionId}/cancel`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };

      request(requestParameters, (err, response, body) => (err || response.statusCode >= 400) ? reject(err || body) : resolve(body) );
    });
  }

  refundTransaction(userId, transactionId, accessToken) {
    return new Promise( (resolve, reject) => {
      const requestParameters = {
        baseUrl: this.ssoBaseUrl,
        uri: `/users/${userId}/transactions/${transactionId}/refund`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      };

      request(requestParameters, (err, response, body) => (err || response.statusCode >= 400) ? reject(err || body) : resolve(body) );
    });
  }
};
