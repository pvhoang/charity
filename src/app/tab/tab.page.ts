import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss'],
})
export class TabPage implements OnInit {

	public topic: any;
	tab: string = "doi_tuong";

	constructor(
		private activatedRoute: ActivatedRoute,
		private dataService: DataService
	) { }

	ngOnInit() {
		let id = this.activatedRoute.snapshot.paramMap.get('id');
		console.log('menu: ', id);

		this.topic = this.dataService.getTopicData(id);
		this.tab = this.topic.tabs[0].header.value;

		for (let it = 0; it < this.topic.tabs.length; it++) {
			let tab = this.topic.tabs[it];
			for (let ic = 0; ic < tab.content.length; ic++) {
				let c = tab.content[ic];
				// update all data before UI
				if (c.card) {
					c.card = this.dataService.validateJsonCard(c.card);
					console.log('card: ', c.card);
				}
			}
		}
	}


}
