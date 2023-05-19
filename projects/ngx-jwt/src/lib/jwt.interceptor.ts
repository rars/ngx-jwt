/**
 * jwt.interceptor.ts has been derived from jwt.interceptor.ts in angular2-jwt by Auth0.
 * See LICENSE.md for licensing details.
 *
 * Changes by Richard Russell:
 *  > modified to use jwt-inspect for checking if a JWT token has expired,
 *  > add ability to configure a domain blacklist instead of a whitelist,
 *  > only call tokenGetter if request is whitelisted or not blacklisted,
 *  > minor refactoring of logic.
 */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, mergeMap } from 'rxjs';
import { isTokenExpired } from 'jwt-inspect';
import { NgxJwtConfig } from './ngx-jwt-config.class';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private readonly tokenGetter: () => Observable<string>;
  private readonly blacklistedDomains: Array<string | RegExp>;
  private readonly whitelistedDomains: Array<string | RegExp>;
  private readonly throwNoTokenError: boolean;
  private readonly skipWhenExpired: boolean;
  private readonly headerName: string;
  private readonly authScheme: string;

  public constructor(config: NgxJwtConfig) {
    this.tokenGetter = config.tokenGetter;
    this.headerName = config.headerName || 'Authorization';
    this.authScheme =
      config.authScheme || config.authScheme === ''
        ? config.authScheme
        : 'Bearer';
    this.blacklistedDomains = config.blacklistedDomains || [];
    this.whitelistedDomains = config.whitelistedDomains || [];
    this.throwNoTokenError = config.throwNoTokenError || false;
    this.skipWhenExpired = config.skipWhenExpired;
  }

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Do not do anything to requests that do not need Jwt tokens injecting into them.
    if (!this.shouldAttemptJwtTokenInjection(request)) {
      return next.handle(request);
    }

    // Only retrieve token if we should attempt JWT token injection.
    return this.tokenGetter().pipe(
      mergeMap((token: string) => {
        return this.handleInterception(token, request, next);
      })
    );
  }

  private shouldAttemptJwtTokenInjection(
    request: HttpRequest<unknown>
  ): boolean {
    if (this.isBlacklistedDomain(request)) {
      return false;
    }
    if (
      this.whitelistedDomains.length > 0 &&
      !this.isWhitelistedDomain(request)
    ) {
      return false;
    }
    return true;
  }

  private isBlacklistedDomain(request: HttpRequest<unknown>): boolean {
    try {
      const requestUrl = new URL(request.url);
      return this.urlMatchesDomain(requestUrl, this.blacklistedDomains);
    } catch (err) {
      // if we're here, the request is made to the
      // same domain as the Angular app so it's safe to
      // proceed
      return false;
    }
  }

  private isWhitelistedDomain(request: HttpRequest<unknown>): boolean {
    try {
      const requestUrl = new URL(request.url);
      return this.urlMatchesDomain(requestUrl, this.whitelistedDomains);
    } catch (err) {
      // if we're here, the request is made
      // to the same domain as the Angular app
      // so it's safe to proceed
      return true;
    }
  }

  private urlMatchesDomain(url: URL, domains: Array<string | RegExp>): boolean {
    return (
      domains.findIndex((domain) => {
        if (typeof domain === 'string') {
          return domain === url.host;
        } else if (domain instanceof RegExp) {
          return domain.test(url.host);
        }
        return false;
      }) > -1
    );
  }

  private handleInterception(
    token: string,
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!token && this.throwNoTokenError) {
      throw new Error('Could not get token from tokenGetter function.');
    }

    if (!this.shouldSkipJwtTokenInjection(token)) {
      request = request.clone({
        setHeaders: {
          [this.headerName]: `${this.authScheme} ${token}`,
        },
      });
    }

    return next.handle(request);
  }

  private shouldSkipJwtTokenInjection(token: string): boolean {
    if (!token) {
      return true;
    }
    if (this.skipWhenExpired) {
      return isTokenExpired(token);
    }
    return false;
  }
}
