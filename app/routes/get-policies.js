import newrelic from '../helpers/newrelic.js';

module.exports = function *() {
  let policies = yield newrelic.getPolicies(this.query['api-key']);

  let response = policies.alert_policies
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

  this.body = JSON.stringify(response, null, 2);
};
