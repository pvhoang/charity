import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  public font: any;
	public topic: any;
  public title: any;

  constructor(
		private activatedRoute: ActivatedRoute,
    private dataService: DataService,
    private alertCtrl: AlertController
  ) { }

	ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('menu: ', id);
    this.topic = this.dataService.getTopicData(id);
    this.title = this.topic.title.text;
    this.font = this.dataService.getFont();
    console.log('font: ', this.font);

    for (let it = 0; it < this.topic.cards.length; it++) {
			let card = this.topic.cards[it];
      this.topic.cards[it] = this.dataService.validateJsonCard(card);
      for (let i = 0; i < card.items.length; i++) {
        let p = card.items[i];
        if (p.select) {
						p.select.icon.zmdi = 'zmdi zmdi-' + p.select.icon.zmdi + ' ion-text-center';

          if (p.select.type == "font_size") {
            p.select['value'] = this.font.size;
            p.select['holder'] = "Chọn cỡ chữ";
          } else if (p.select.type == "font_name") {
            p.select['value'] = this.font.name;
            p.select['holder'] = "Chọn loại chữ";

          } else {
            p.select['value'] = '';
            p.select['holder'] = "";
          }
        }
      }
      console.log('card: ', card);
		}

  }

	clicked(event) {
    console.log('event: ', event);
    console.log('value: ', event.detail.value);

    let data =  event.detail.value;
    console.log('data: ', data);
    console.log('font: ', this.font);

    if (data == 'small' || data == 'medium' || data == 'large')
      this.font.size = data;

    if (data == 'Verdana' || data == 'Arial' || data == 'Times')
      this.font.name = data;

    console.log('font: ', this.font);

    this.dataService.setFont(this.font);

  }
  
}

