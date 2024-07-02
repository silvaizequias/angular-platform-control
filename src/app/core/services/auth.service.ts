import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment } from '@/environments/environment'
import { Observable, tap } from 'rxjs'
import { AuthCallback, AuthCode, AuthLogin } from '../interfaces/auth.interface'
import { PersistanceService } from './persistance.service'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endpoint: string = environment.platformApiUrl + '/auth'

  constructor(
    private readonly httpClient: HttpClient,
    private readonly persistanceService: PersistanceService,
  ) {}

  validation(data: AuthCode): Observable<AuthCode> {
    return this.httpClient.post<AuthCode>(this.endpoint + '/code', data)
  }

  authentication(data: AuthLogin): Observable<AuthCallback> {
    return this.httpClient.post<AuthCallback>(this.endpoint + '/login', data)
  }

  logout(): void {
    return this.persistanceService.destroyToken('AUTH_TOKEN')
  }
}
