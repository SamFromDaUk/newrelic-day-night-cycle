import request from 'request-promise';

module.exports = {
  getApplications: function *(api_key) {
    let options = {
        method: 'GET',
        uri: process.env.NEW_RELIC_URL + 'applications.json',
        headers: {
          'X-Api-Key': api_key
        },
        json: true
    };

    let response = yield request(options);

    return response.applications;
  },

  getPolicies: function *(api_key) {
    let options = {
      method: 'GET',
      uri: process.env.NEW_RELIC_URL + 'alert_policies.json',
      headers: {
        'X-Api-Key': api_key
      },
      json: true
    };

    return yield request(options);
  },

  updateApplicationPolicy: function *(api_key, policy, apps) {
    let options = {
      method: 'PUT',
      uri: process.env.NEW_RELIC_URL + `alert_policies/${policy}.json`,
      body: {
        "alert_policy": {
          "links": {
            "applications": apps.map(app => {
              return app.id;
            })
          }
        }
      },
      headers: {
          'X-Api-Key': api_key
      },
      json: true
    };

    return yield request(options);
  }
};
