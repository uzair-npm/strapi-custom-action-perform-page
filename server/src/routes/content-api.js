export default [
  {
    method: 'GET',
    path: '/config',
    handler: 'download.getConfig', // <- This is key
    config: {
      policies: ['admin::isAuthenticatedAdmin'], // Require the user to be an authenticated admin
    },
  },
];
