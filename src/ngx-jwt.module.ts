import { NgModule, ModuleWithProviders, Optional, SkipSelf, Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { INgxJwtModuleOptions } from './ngx-jwt-module-options.interface';
import { NgxJwtConfig } from './ngx-jwt-config.class';

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
        options.provider ||
        {
          provide: NgxJwtConfig,
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
