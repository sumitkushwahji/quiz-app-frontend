import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { JwtInterceptor } from '../app/auth/jwt-interceptor.service'; // ✅ Import JWT interceptor

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi() // ✅ Ensures Interceptors from DI are injected
    ),
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }, // ✅ Register JWT interceptor
  ],
};
