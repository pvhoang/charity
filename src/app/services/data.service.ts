import { Injectable } from '@angular/core';
import { FileService } from '../services/file.service';

const TOPICS = 'topics';
const FONT = 'font';
const FONT_DEFAULT = { size: 'small', name: 'Verdana' };
const FONT_SIZE = { "small": "1.1,1.0", "medium": "1.3,1.2", "large": "1.5,1.4" }
const APP_JSON = '../assets/app.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {

	public topics;
	public font;
	public appData = [];

	constructor(
		private fileService: FileService
	) {
	}

	loadData() {
		// all data
		this.fileService.getLocalJsonFile(APP_JSON).then((data) => {
			// this.removeLocalStorage();
			let newTopics = [];
			data[TOPICS].forEach(topic => {
				newTopics.push( {	view: false, nwords: 0 } );
			});
			// get local storage data
			this.getLocalStorage(TOPICS).then(topics => {
				// console.log( '- [DataService] - loadData - Topics -', topics);
				if (!topics || (newTopics.length !== topics.length))
					this.topics = newTopics;
				else
					this.topics = topics;

				this.appData = data;
				// console.log( '- [DataService] - loadData - Topics -', this.topics);
				// console.log( '- [DataService] - loadData - Data -', this.appData);
				// localStorage.removeItem(FONT);
				this.getLocalStorage(FONT).then(font => {
					if (font == null)
						this.setFont(FONT_DEFAULT);
					else
						this.setFont(font);
				});

			});
		})
	}

	getAppData() {
		return this.appData;
	}

	getTopicData(topicId?) {
		if (topicId)
			return this.appData[TOPICS][topicId];
		return this.appData[TOPICS];
	}

	getTopics() {
		return this.topics;
	}

	setTopics(topics) {
		this.topics = topics;
		this.setLocalStorage(TOPICS, topics).then(status => {});
	}

	removeTopics() {
		this.topics = [];
		this.removeLocalStorage().then(status => {});
	}

	getFont() {
		return this.font;
	}
	
	getFontSizeName() {
		return this.font.size == 'small' ? 'Nhỏ' : (this.font.size == 'medium' ? 'Vừa' : 'Lớn');
	}

	setFont(font) {
		let size = font.size;
		let name = font.name;
		let f = FONT_SIZE[size].split(',');
		let f_h2 = f[0];
		let f_p = f[1];

		document.documentElement.style.setProperty('--font-size-h2', f_h2 + 'rem');
		document.documentElement.style.setProperty('--font-size-p', f_p + 'rem');
		document.documentElement.style.setProperty('--ion-font-family', name);

		this.font = font;
		this.setLocalStorage(FONT, font).then(status => {});
	}

	// --- STORAGE ---

	private async getLocalStorage(key) {
		let value = localStorage.getItem(key);
		value = (value) ? JSON.parse(value): null;
		return await value;
	}

	private async setLocalStorage(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
		return await true;
	}

	async removeLocalStorage() {
		localStorage.removeItem(TOPICS);
		return await true;
	}

	// --- OTHER SERVICES ---

	public isNewInfo (date): boolean {
		// get date "01/12/2018"
		let d = new Date(date);
		let today = new Date();
		let msElapsed = today.getTime() - d.getTime()
		let msSevenDay = 7 * 86400000;
		let newInfo = (msElapsed < msSevenDay);
		return newInfo;
	}
	
	public isNewInfoInCard(card): boolean {
		let items = card.items;
		if (items) {
			for (let i = 0; i < items.length; i++) {
				let text = items[i].text;
				if (text) {
					let date = text.date;
					if (date) {
						let newInfo = this.isNewInfo(date);
						if (newInfo)
							return true;
					}
				}
			}
		}
		return false;
	}

	isNewInfoInTopic(topic): boolean {
		if (topic.type == 'tab') {
			for (let it = 0; it < topic.tabs.length; it++) {
				let tab = topic.tabs[it];
				for (let ic = 0; ic < tab.content.length; ic++) {
					let c = tab.content[ic];
					if (c.card) {
						if (this.isNewInfoInCard(c.card))
							return true;
					}
				}
			}
			return false;
		} else {
			for (let it = 0; it < topic.cards.length; it++) {
				let card = topic.cards[it];
				if (this.isNewInfoInCard(card))
					return true;
			}
		}
		return false;
	}

	public validateJsonCard(card) {

		let heading = card.heading;
		let items = card.items;

		if (heading) {
			// heading.text.label must be defined
			heading.text.color = (!heading.text.color) ? 'primary' : heading.text.color;
			let align = (!heading.align) ? 'start' : heading.align; // start, center, end
			heading.align = 'ion-text-' + align;
			if (heading.icon) {
				// heading.icon.zmdi must be available
				heading.icon.zmdi = 'zmdi zmdi-' + heading.icon.zmdi + ' ion-text-center';
				if (!heading.icon.color) heading.icon.color = 'primary';
			}
		}

		if (items) {
			for (let i = 0; i < items.length; i++) {
				let text = items[i].text;
				let image = items[i].image;

				if (text) {
					// item.text.label must be defined
					// console.log('text: ', text );

					if (!text.paras)
						text.paras = [];

					if (!text.color) text.color = 'primary';
					if (!text.bullet) text.bullet = '';
					
					let date = text.date;
					if (date) {
						let newInfo = this.isNewInfo(date);
						if (newInfo) {
							text.new = 'true';
						}
					}

					let align = (!text.align) ? 'start' : text.align; // start, center, end
					text.align = 'ion-text-' + align;

					if (text.icon) {
						// item.text.icon.zmdi must be defined
						text.icon.zmdi = 'zmdi zmdi-' + text.icon.zmdi + ' ion-text-center';
						if (!text.icon.color) text.icon.color = 'primary';
					}
				}
				if (image) {
					// item.image.src must be defined
				} 
			}

		} else {
			items = [];
		}
		return card;
	}
}
