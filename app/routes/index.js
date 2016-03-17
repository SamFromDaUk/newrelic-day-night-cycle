import ping from './ping';
import changeToNight from './change-to-night';
import changeToDay from './change-to-day';

module.exports = function(router) {
  var routes = {
    '/ping': ping,
    '/change/night': changeToNight,
    '/change/day': changeToDay
  };

  Object.keys(routes).forEach(route => {
    console.log('Registering: ' + route);
    router.get(route, routes[route]);
  });

  return router;
};
