import { ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramSubscription: Subscription;

  constructor(
    private route: ActivatedRoute   // currently loaded route as a javascript object
  ) { }

  ngOnInit() {
    // runs on ngOnInit
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name']
    };
    // won't run on ngOnInit, but subscribe to changes later
    this.paramSubscription = this.route.params.subscribe((params: Params) => {   // .params is an observable
      this.user.id = params['id'];
      this.user.name = params['name'];
    })
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();   // Angular does this for you, don't have to do this manually
  }

}
