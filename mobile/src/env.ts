let NODE_DEV = 'development';

if (__DEV__) {
  NODE_DEV = 'development';
} else {
  NODE_DEV = 'production';
}

const serverURL: any = {
  development: 'https://app-mypham.yez.vn',
  production: 'https://app-mypham.yez.vn',
};

const serverSocket: any = {
  development: ':6001/',
  production: ':6001/',
};

const SENTRY_KEY = 'sentry-key-here';

const YOUTUBE_API_KEY = 'AIzaSyBD4etWxV9XPm2tYzeX4JexCqqgnYH3690';

export default {
  baseURL: `${serverURL[NODE_DEV]}`,
  currentNode: NODE_DEV,
  serverURL: `${serverURL[NODE_DEV]}/api`,
  serverSocketURL: serverURL[NODE_DEV] + serverSocket[NODE_DEV],
  sentryKey: SENTRY_KEY,
  youtubeKey: YOUTUBE_API_KEY,
};
