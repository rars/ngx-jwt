import { NgModule, ModuleWithProviders, Optional, SkipSelf, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWT_OPTIONS } from './jwt-options.token';
import { JwtInterceptor } from './jwt.interceptor';
import { INgxJwtConfig } from './ngx-jwt-config.interface';

export interface INgxJwtModuleOptions {
  jwtOptionsProvider?: Provider;
  config?: INgxJwtConfig;
}

@NgModule()
export class NgxJwtModule {
  public static forRoot(
      options: INgxJwtModuleOptions): ModuleWithProviders {
    return {
      ngModule: NgxJwtModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true
        },
        options.jwtOptionsProvider ||
        {
          provide: JWT_OPTIONS,
          useValue: options.config
        }
      ]
    };
  }

  public constructor(
      @Optional() @SkipSelf() parentModule: NgxJwtModule) {
    if (parentModule) {
      throw new Error(
        'NgxJwtModule is already loaded. It should only be imported in your application\'s main module.');
    }
  }
}
