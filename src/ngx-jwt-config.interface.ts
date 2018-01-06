import { Observable } from 'rxjs/Observable';

export interface INgxJwtConfig {
  // Retrieves a JWT token to be inserted on HTTP requests.
  readonly tokenGetter?: () => Observable<string>;
  // Identifies domains that JWT tokens should not be inserted for.
  readonly blacklistedDomains?: Array<string | RegExp>;
  // Identifies domains that JWT tokens should be inserted for.
  readonly whitelistedDomains?: Array<string | RegExp>;
  // true if and only if the interceptor should throw an error when tokenGetter retrieves no token.
  readonly throwNoTokenError?: boolean;
  // true if and only if the interceptor should not inject JWT tokens when the token retrieved by
  // tokenGetter has expired.
  readonly skipWhenExpired?: boolean;
  // Name of the header that the JWT token will be set as a value as.
  readonly headerName: string;
  // Identifies the authorisation scheme used, e.g. 'Bearer '. This is the prefix applied to the
  // JWT in the request header value.
  readonly authScheme: string;
}
