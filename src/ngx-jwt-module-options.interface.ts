import { Provider } from '@angular/core';
import { NgxJwtConfig } from './ngx-jwt-config.class';

export interface INgxJwtModuleOptions {
  provider?: Provider;
  config?: NgxJwtConfig;
}
