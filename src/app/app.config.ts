import {
  ApplicationConfig,
  Injectable,
  provideZoneChangeDetection,
} from '@angular/core'
import {
  provideRouter,
  RouterStateSnapshot,
  TitleStrategy,
  withComponentInputBinding,
} from '@angular/router'

import { routes } from './app.routes'
import { provideClientHydration, Title } from '@angular/platform-browser'
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http'
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'
import { authInterceptor } from './services/interceptors/auth.interceptor'

@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super()
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState)
    if (title !== undefined) {
      this.title.setTitle(
        `${title ?? 'Sua Melhor Plataforma de Serviços'} | Dedicado`,
      )
    }
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy,
    },
    provideAnimationsAsync(),
  ],
}
