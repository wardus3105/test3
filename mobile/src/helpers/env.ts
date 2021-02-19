let NODE_DEV = 'development';

if (__DEV__) {
  NODE_DEV = 'development';
} else {
  NODE_DEV = 'production';
}

console.log('Environment: ', NODE_DEV);

const serverURL: any = {
  development: '',
  production: '',
};

const serverSocket: any = {
  development: ':6001/',
  production: ':6001/',
};

const SENTRY_KEY = 'sentry-key-here';

export default {
  baseURL: `${serverURL[NODE_DEV]}`,
  currentNode: NODE_DEV,
  serverURL: `${serverURL[NODE_DEV]}/api`,
  serverSocketURL: serverURL[NODE_DEV] + serverSocket[NODE_DEV],
  sentryKey: SENTRY_KEY,
};
