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
    import { NgxJwtModule } from 'ngx-jwt/ngx-jwt.module';
    import { AppComponent } from './app.component';

    @NgModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        NgxJwtModule
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
