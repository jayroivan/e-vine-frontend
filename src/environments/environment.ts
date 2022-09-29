// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL:'https://e-vine.herokuapp.com',
  firebaseConfig: {
    apiKey: "AIzaSyD7lQs6wJJ8OH71iL3cqY2D9hAVvcFQ3uM",
    authDomain: "e-vine.firebaseapp.com",
    projectId: "e-vine",
    storageBucket: "e-vine.appspot.com",
    messagingSenderId: "60640068410",
    appId: "1:60640068410:web:523b05c6a1064ef9308603",
    measurementId: "G-KWQMPSWLTR"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
