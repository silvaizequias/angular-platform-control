import { Organization } from './organization.interface'
import { User } from './user.interface'

export interface OrganizationState {
  organizations: Organization[]
}

export interface UserState {
  users: User[]
}