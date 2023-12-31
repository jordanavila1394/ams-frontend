// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    endpoint: 'http://localhost:3000/',
    googleMapsApiKey: process.env['GOOGLE_MAPS_KEY'],
    spacesEndpoint: process.env['DIGITAL_OCEAN_ENDPOINT'],
    accessKeyId: process.env['DIGITAL_OCEAN_KEY_ID'],
    secretAccessKey: process.env['DIGITAL_OCEAN_ACCESS_KEY'],
    bucketName: process.env['DIGITAL_OCEAN_BUCKET'],
    adminEmail: ['avila@ctfitalia.com'],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
