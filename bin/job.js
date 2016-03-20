import co from 'co';

import newrelic from '../app/helpers/newrelic';
import config from '../app/config';

const configuration = {
  night: {
    gold: ['GOLD_DAY', 'GOLD_NIGHT'],
    silver: ['SILVER_DAY', 'SILVER_NIGHT']
  },
  day: {
    gold: ['GOLD_NIGHT', 'GOLD_DAY'],
    silver: ['SILVER_NIGHT', 'SILVER_DAY']
  }
};

const init = (swapTo) => {
  config.forEach(team => {
    co(function *() {
      console.log('================================');
      console.log(`Processing '${team.NAME}'`);

      let options = configuration[swapTo];
      let apps = yield getApps(team, options);

      console.log(`Moving ${apps.gold.length} to ${options.gold[1]}`);
      yield newrelic.updateApplicationPolicy(team.API_KEY, team[options.gold[1]], apps.gold);

      console.log(`Moving ${apps.silver.length} to ${options.silver[1]}`);
      yield newrelic.updateApplicationPolicy(team.API_KEY, team[options.silver[1]], apps.silver);

      console.log('Done!');
      console.log('================================');
    });
  });
};

const getApps = (team, options) => {
  return co(function *() {
    console.log(`Retrieving apps for ${team.NAME}.`);

    let apps = yield newrelic.getApplications(team.API_KEY);
    let gold = [];
    let silver = [];

    apps.forEach(app => {
      if (app.links.alert_policy === team[options.gold[0]]) {
        gold.push({
          id: app.id,
          name: app.name
        });
      }

      if (app.links.alert_policy === team[options.silver[0]]) {
        silver.push({
          id: app.id,
          name: app.name
        });
      }
    });

    return { gold, silver };
  });
};

module.exports = init;
