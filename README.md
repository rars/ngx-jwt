# ngx-jwt

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![Node.js CI](https://github.com/rars/ngx-jwt/actions/workflows/node.js.yml/badge.svg)](https://github.com/rars/ngx-jwt/actions/workflows/node.js.yml)

Angular4+ module for adding JWT authorisation tokens to HTTP requests.

## Quickstart

1. Install `ngx-jwt` modules from npm:
   ```
   npm install ngx-jwt --save
   ```
2. Import `NgxJwtModule` to your app:

   ```
   import { BrowserModule } from '@angular/platform-browser';
   import { NgModule } from '@angular/core';
   import { of } from 'rxjs';
   import { NgxJwtModule, NgxJwtConfig } from 'ngx-jwt';
   import { AppComponent } from './app.component';

   export function createNgxJwtConfig(): NgxJwtConfig {
     return {
       tokenGetter: () => of('TOKEN'),
       blacklistedDomains: ['auth-service'],
       whitelistedDomains: [],
       throwNoTokenError: true,
       skipWhenExpired: false,
       headerName: 'Authorization',
       authScheme: 'Bearer'
     };
   }

   @NgModule({
     declarations: [
       AppComponent
     ],
     imports: [
       BrowserModule,
       NgxJwtModule.forRoot({
         provider: {
           provide: NgxJwtConfig,
           useFactory: createNgxJwtConfig
         }
       })
     ],
     providers: [],
     bootstrap: [AppComponent]
   })
   export class AppModule { }
   ```

## Compatibility

Recommended versions by Angular version:

| Angular | ngx-jwt |
| ------- | ------- |
| ^4.3.0  | ^0.2.0  |
| ^5.0.0  | ^0.2.0  |
| ^6.0.0  | ^0.3.0  |
| ^7.0.0  | ^0.3.0  |
| ^8.0.0  | ^0.4.0  |
| ^9.0.0  | ^0.5.0  |
| ^13.0.0 | ^1.0.0  |
| ^16.0.0 | ^2.0.0  |
| ^17.0.0 | ^3.0.0  |

## Contributions welcome!

If you have a feature or improvement you would like to see included, please raise an issue or a PR and I will review.

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
