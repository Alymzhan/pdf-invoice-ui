import { Injectable } from '@angular/core'

@Injectable({providedIn: 'root'})

export class CityService {
    cities = [
      { name: 'Орел', value: 'Orel201Template' },
      { name: 'Нальчик (взрослые)', value: 'NalchikAdultTemplate' },
      { name: 'Нальчик (дети)', value: 'NalchikKidsTemplate' },
      { name: 'Нальчик (199)', value: 'Nalchik199Template' },
      { name: 'Москва', value: 'MoscowTemplate' },
      { name: 'Москва (201)', value: 'Moscow201Template' },
      { name: 'Иваново', value: 'IvanovoTemplate' },
      { name: 'Дагестан (взрослые)', value: 'DagestanAdultTemplate' },
      { name: 'Дагестан (дети)', value: 'DagestanKidsTemplate' },
      { name: 'Тамбов', value: 'TambovTemplate' },
      { name: 'Уфа (201)', value: 'Ufa201Template' },
      { name: 'Владимир', value: 'VladimirTemplate' },
      { name: 'Воронеж (новые)', value: 'VoronezhNewTemplate' },
      { name: 'Воронеж (старые)', value: 'VoronezhOldTemplate' }
    ];
  
    getName(value: string): string {
        const city = this.cities.find(city => city.value === value);
        return city ? city.name : '';
      }
  }
  