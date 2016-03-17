import newrelic from '../helpers/newrelic.js';

module.exports = function *() {
  var apps = yield newrelic.getApplications(),
    gold = [],
    silver = [];

  apps.forEach(app => {
    if (app.links.alert_policy === +process.env.ALERT_POLICY_GOLD_NIGHT) {
      gold.push(app);
    }

    if (app.links.alert_policy === +process.env.ALERT_POLICY_SILVER_NIGHT) {
      silver.push(app);
    }
  });


  console.log(`==================================`);
  console.log(`Found ${gold.length} gold apps`);
  console.log(`Found ${silver.length} silver apps`);
  console.log(`==================================`);

  console.log('GOLD: ', gold.map(app => {
    return app.name;
  }));

  yield newrelic.updateApplicationPolicy(process.env.ALERT_POLICY_GOLD_DAY, gold);

  console.log(`==================================`);

  console.log('Silver: ', silver.map(app => {
    return app.name;
  }));

  yield newrelic.updateApplicationPolicy(process.env.ALERT_POLICY_SILVER_DAY, silver);
};
