import { Observable } from 'rxjs';

export class NgxJwtConfig {
  // Retrieves a JWT token to be inserted on HTTP requests.
  public readonly tokenGetter?: () => Observable<string>;
  // Identifies domains that JWT tokens should not be inserted for.
  public readonly blacklistedDomains?: Array<string | RegExp>;
  // Identifies domains that JWT tokens should be inserted for.
  public readonly whitelistedDomains?: Array<string | RegExp>;
  // true if and only if the interceptor should throw an error when tokenGetter retrieves no token.
  public readonly throwNoTokenError?: boolean;
  // true if and only if the interceptor should not inject JWT tokens when the token retrieved by
  // tokenGetter has expired.
  public readonly skipWhenExpired?: boolean;
  // Name of the header that the JWT token will be set as a value as.
  public readonly headerName: string;
  // Identifies the authorisation scheme used, e.g. 'Bearer '. This is the prefix applied to the
  // JWT in the request header value.
  public readonly authScheme: string;

  public constructor(
    tokenGetter: () => Observable<string>,
    blacklistedDomains: Array<string | RegExp> = [],
    whitelistedDomains: Array<string | RegExp> = [],
    skipWhenExpired: boolean = false,
    throwNoTokenError: boolean = true,
    headerName: string = 'Authorization',
    authScheme: string = 'Bearer'
  ) {
    this.tokenGetter = tokenGetter;
    this.blacklistedDomains = blacklistedDomains;
    this.whitelistedDomains = whitelistedDomains;
    this.skipWhenExpired = skipWhenExpired;
    this.throwNoTokenError = throwNoTokenError;
    this.headerName = headerName;
    this.authScheme = authScheme;
  }
}
