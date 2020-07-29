// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBWOsbrLCaSmfOCV0w3sGOiF2n2lqDXB7o',
    authDomain: 'paybook-51ac6.firebaseapp.com',
    databaseURL: 'https://paybook-51ac6.firebaseio.com',
    projectId: 'paybook-51ac6',
    storageBucket: 'paybook-51ac6.appspot.com',
    messagingSenderId: '745534661637',
    appId: '1:745534661637:web:34c2bd669d96b759ce686c',
    measurementId: 'G-3F812XSZ57',
  },
  algolia: {
    appId: '90D626C6ZJ',
    searchKey: 'd9d2d89e563f167223403a05053e26f4',
  },
  stripe: {
    publicKey:
      'pk_test_51HA6GyImimR6yYQtdwsq0foEalfhg7ctY1hk42HLWjhmCVwTw7gnLt4ab40dbvgoKHVZVz7hlFWx4IG6JIvGSGXu00bJZpxcl3',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
