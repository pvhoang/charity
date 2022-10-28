import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    public http: HttpClient) { 
  }

  getLocalJsonFile(url: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.get(url).toPromise().then((data:any) => {
				resolve(data);
			}).catch(err => {
				reject(err.error);
			});
		});
	}

  getLocalTextFile(url: string): Promise<any> {
		return new Promise((resolve, reject) => {
			this.http.get(url, {responseType: 'text'}).toPromise().then((data:any) => {
				resolve(data);
			}).catch(err => {
				reject(err.error);
			});
		}).catch(err => {
			console.log('err = ', err);
		});
	}

}
