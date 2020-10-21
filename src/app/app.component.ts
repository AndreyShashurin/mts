import { Component, ɵConsole } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReadyService } from './ready.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mts';
  list: any = []
  subscription: Subscription;
  
  constructor(
    public json: ReadyService
  ) {
    this.subscription = this.json.getJSON().subscribe(data => this.list=data.tree, error => console.error(error));
  }

  isFolder(item): boolean {
    if(item.type == 'folder'){
      let summ = 0;
      item.children.some(function s(el) {
        el.type == "file" || ((el.children instanceof Array) && el.children.some(s)) ? summ++ : 0;
        item.countfile = summ
      })
      return true
    }
  }
  
  showChild(item): void {
    item.children['visible'] = !item.children['visible']
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
