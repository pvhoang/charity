import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [];
  public appData: any;

  constructor(
    private dataService: DataService) {
    this.setInitialData();
  }

  setInitialData() {
		console.log( '[AppComponent] - setInitialData');
    this.dataService.loadData();
    setTimeout(() => {
      this.getMenuData();
    }, 1000);
  }

  getMenuData() {
    let topicsData = this.dataService.getTopicData();
    let topics = this.dataService.getTopics();
    let data = this.dataService.getAppData();

		console.log( '[AppComponent] - getMenuData: ', topics);

    this.appData = data;
    this.appPages.push({ title: 'Giới thiệu', new: false, url: '/home', icon: 'home' });
    for (let i = 0; i < topicsData.length; i++) {
      let type =  topicsData[i].type;
      let menu = topicsData[i].menu;
      let url = '/folder/' + i;
      if (type === 'tab')
        url = '/tab/' + i;
      else if (type === 'card')
        url = '/card/' + i;
      else if (type === 'setting')
        url = '/setting/' + i;
      menu.new = this.dataService.isNewInfoInTopic(topicsData[i]);
      console.log( 'menu: ', menu);
      this.appPages.push({ title: menu.text, new: menu.new, url: url, icon: menu.icon });
    }
    this.appPages.push({ title: 'Thoát', new: false, url: null, icon: 'arrow-right' });

  }

  beforeRouting(i:number, p) {
    console.log('[AppComponent] - beforeRouting: ', i, p);
    if (p.url == '/exit')
      this.exit();
    else {
      let topics = this.dataService.getTopics();
      topics[i].view = true;
      this.dataService.setTopics(topics);
    }
  }

  exit() {
    navigator['app'].exitApp();
  }
  
  openMenu() {
  }

  closeMenu() {
  }

  
  
}
