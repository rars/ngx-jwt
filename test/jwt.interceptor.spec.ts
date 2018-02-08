import { inject, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import {
  HttpClient,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { JwtInterceptor } from '../src/jwt.interceptor';
import { NgxJwtConfig } from '../src/ngx-jwt-config.class';

describe('JwtInterceptor', () => {

  beforeEach(() => {
    const config = new NgxJwtConfig(
      () => Observable.of('fakeToken'),
      ['auth-server']
    );

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {
            provide: NgxJwtConfig,
            useValue: config
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        }
      ]
    });
  });

  describe('intercept()', () => {
    it('should intercept and attach JWT token to request to backend',
      inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
        http.get('/data').subscribe(
          response => {
            expect(response).toBeTruthy();
          }
        );

        const testRequest = httpMock.expectOne(
          req => {
            return req.headers.has('Authorization') &&
              req.headers.get('Authorization') === 'Bearer fakeToken';
          });
        expect(testRequest.request.method).toEqual('GET');

        testRequest.flush({ hello: 'world' });
        httpMock.verify();
    }));

    it('should intercept but not attach JWT token to request to blacklisted domain',
      inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
        http.get('https://auth-server/login').subscribe(
          response => {
            expect(response).toBeTruthy();
          }
        );

        const testRequest = httpMock.expectOne(
          req => {
            return !req.headers.has('Authorization');
          });
        expect(testRequest.request.method).toEqual('GET');

        testRequest.flush({ hello: 'world' });
        httpMock.verify();
    }));
  });
});
