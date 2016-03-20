import newrelic from '../helpers/newrelic.js';
import config from '../config';

module.exports = function *() {
  for (var i = 0; i < config.length; i++) {
    var policies = yield newrelic.getPolicies(config[i].API_KEY);

    config[i].policies = policies.alert_policies
      .filter(policy => {
        return policy.enabled;
      })
      .map(policy => {
        return {
          id: policy.id,
          name: policy.name,
          enabled: policy.enabled
        };
      });
  }

  this.body = JSON.stringify(config.map(team => {
    return {
      name: team.NAME,
      policies: team.policies
    };
  }), null, 2);
};
