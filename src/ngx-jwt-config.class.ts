import { Observable } from 'rxjs/Observable';
import { INgxJwtConfig } from './ngx-jwt-config.interface';

export class NgxJwtConfig implements INgxJwtConfig {

  public readonly tokenGetter?: () => Observable<string>;
  public readonly blacklistedDomains?: Array<string | RegExp>;
  public readonly whitelistedDomains?: Array<string | RegExp>;
  public readonly throwNoTokenError?: boolean;
  public readonly skipWhenExpired?: boolean;
  public readonly headerName: string;
  public readonly authScheme: string;

  public constructor(
      tokenGetter: () => Observable<string>,
      blacklistedDomains: Array<string | RegExp> = [],
      whitelistedDomains: Array<string | RegExp> = [],
      skipWhenExpired: boolean = false,
      throwNoTokenError: boolean = true,
      headerName: string = 'Authorization',
      authScheme: string = 'Bearer') {
    this.tokenGetter = tokenGetter;
    this.blacklistedDomains = blacklistedDomains;
    this.whitelistedDomains = whitelistedDomains;
    this.skipWhenExpired = skipWhenExpired;
    this.throwNoTokenError = throwNoTokenError;
    this.headerName = headerName;
    this.authScheme = authScheme;
  }
}
