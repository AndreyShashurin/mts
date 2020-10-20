import { identifierName } from '@angular/compiler';
import { Component } from '@angular/core';
import { ReadyService } from './ready.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mts';
  list: any = []
  visible: boolean = false;
  
  constructor(
    public json: ReadyService
  ) {
    this.json.getJSON().subscribe(data => this.list=data.tree, error => console.error(error));
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
    this.visible = !this.visible 
    item.children['visible'] = !item.children['visible']
  }
}
