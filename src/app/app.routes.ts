import { Routes } from '@angular/router'

export const routes: Routes = [
  {
    path: 'articles',
    loadChildren: () =>
      import('@/app/pages/articles-page/articles-page.routes').then(
        (load) => load.ARTICLES_PAGE_ROUTES,
      ),
  },
  {
    path: 'members',
    loadChildren: () =>
      import('@/app/pages/members-page/members-page.routes').then(
        (load) => load.MEMBERS_PAGE_ROUTES,
      ),
  },
  {
    path: 'organizations',
    loadChildren: () =>
      import('@/app/pages/organizations-page/organizations-page.routes').then(
        (load) => load.ORGANIZATIONS_PAGE_ROUTES,
      ),
  },
  {
    path: 'users',
    loadChildren: () =>
      import('@/app/pages/users-page/users-page.routes').then(
        (load) => load.USERS_PAGE_ROUTES,
      ),
  },
]
