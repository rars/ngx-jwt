# ngx-jwt

[![Build Status](https://travis-ci.org/rars/ngx-jwt.svg?branch=master)](https://travis-ci.org/rars/ngx-jwt)

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
    import { Observable } from 'rxjs/Observable';
    import 'rxjs/add/observable/of';
    import { NgxJwtModule, NgxJwtConfig } from 'ngx-jwt';
    import { AppComponent } from './app.component';

    export function createNgxJwtConfig(): NgxJwtConfig {
      return {
        tokenGetter: () => Observable.of('TOKEN'),
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

## Contributions welcome!
If you have a feature or improvement you would like to see included, please raise an issue or a PR and I will review.

## License

See the [LICENSE](LICENSE.md) file for license rights and limitations (MIT).
