import ping from './ping';
import getPolicies from './get-policies';

module.exports = function(router) {
  var routes = {
    '/ping': ping,
    '/policies': getPolicies
  };

  Object.keys(routes).forEach(route => {
    console.log('Registering: ' + route);
    router.get(route, routes[route]);
  });

  return router;
};
