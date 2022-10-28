import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {

  public topic: any;
  public title: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('menu: ', id);
    this.topic = this.dataService.getTopicData(id);
    this.title = this.topic.title.text;

    for (let it = 0; it < this.topic.cards.length; it++) {
			let card = this.topic.cards[it];
      this.topic.cards[it] = this.dataService.validateJsonCard(card);
      // console.log('card: ', card);
		}

  }

  
}
