import { inject, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { of } from 'rxjs';
import { JwtInterceptor } from './jwt.interceptor';
import { NgxJwtConfig } from './ngx-jwt-config.class';

describe('JwtInterceptor', () => {
  beforeEach(() => {
    const config = new NgxJwtConfig(() => of('fakeToken'), ['auth-server']);

    TestBed.configureTestingModule({
    imports: [],
    providers: [
        {
            provide: NgxJwtConfig,
            useValue: config
        },
        {
            multi: true,
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
  });

  describe('intercept()', () => {
    it('should intercept and attach JWT token to request to backend', inject(
      [HttpClient, HttpTestingController],
      (http: HttpClient, httpMock: HttpTestingController) => {
        http.get('/data').subscribe(response => {
          expect(response).toBeTruthy();
        });

        const testRequest = httpMock.expectOne(req => {
          return (
            req.headers.has('Authorization') &&
            req.headers.get('Authorization') === 'Bearer fakeToken'
          );
        });
        expect(testRequest.request.method).toEqual('GET');

        testRequest.flush({ hello: 'world' });
        httpMock.verify();
      }
    ));

    it('should intercept but not attach JWT token to request to blacklisted domain', inject(
      [HttpClient, HttpTestingController],
      (http: HttpClient, httpMock: HttpTestingController) => {
        http.get('https://auth-server/login').subscribe(response => {
          expect(response).toBeTruthy();
        });

        const testRequest = httpMock.expectOne(req => {
          return !req.headers.has('Authorization');
        });
        expect(testRequest.request.method).toEqual('GET');

        testRequest.flush({ hello: 'world' });
        httpMock.verify();
      }
    ));
  });
});
