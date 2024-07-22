import { MembershipsState } from '@/app/core/interfaces/membership.interface'
import { membershipsActions } from '@/app/core/store/memberships/memberships-actions.store'
import { membershipsSelectors } from '@/app/core/store/memberships/memberships-selectors.store'
import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'

@Component({
  selector: 'app-memberships-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './memberships-page.component.html',
  styleUrl: './memberships-page.component.css',
})
export class MembershipsPageComponent implements OnInit {
  constructor(private store: Store<MembershipsState>) {}
  memberships$ = this.store.select(membershipsSelectors.findMany)

  ngOnInit(): void {
    this.store.dispatch(membershipsActions.findMany())
  }
}
