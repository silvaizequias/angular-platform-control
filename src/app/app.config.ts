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
import { provideStore } from '@ngrx/store'
import { provideEffects } from '@ngrx/effects'
import { actionReducer } from './core/store/action-reducer'
import { accountsEffects } from './core/store/accounts/accounts-effects'

@Injectable()
export class TemplatePageTitleStrategy extends TitleStrategy {
  constructor(private readonly title: Title) {
    super()
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState)
    if (title !== undefined) {
      this.title.setTitle(`${title} | Dedicado`)
    }
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([])),
    {
      provide: TitleStrategy,
      useClass: TemplatePageTitleStrategy,
    },
    provideAnimationsAsync(),
    provideStore(actionReducer),
    provideEffects([accountsEffects]),
  ],
}
