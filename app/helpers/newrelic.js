import request from 'request-promise';

module.exports = {
  getApplications: function *() {
    let options = {
        method: 'GET',
        uri: process.env.NEW_RELIC_URL + 'applications.json',
        headers: {
            'X-Api-Key': process.env.NEW_RELIC_API_KEY
        },
        json: true
    };

    let response = yield request(options);

    return response.applications.filter(app => {
      return app.name.indexOf('-prod') !== -1;
    });
  },

  updateApplicationPolicy: function *(policy, apps) {
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
          'X-Api-Key': process.env.NEW_RELIC_API_KEY
      },
      json: true
    };

    let response = yield request(options);

    console.log(JSON.stringify(response));
  }
};
