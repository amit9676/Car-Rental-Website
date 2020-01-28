import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { users } from '../models/users';
import { cars } from '../models/cars';
import { orders } from '../models/orders';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {

  private manMode: boolean = true;

  private messageSource = new BehaviorSubject<string>("");
  public currentMessage = this.messageSource.asObservable();

  private userSource = new BehaviorSubject<users>(new users());
  public currentUser = this.userSource.asObservable();

  private loggedIn = new BehaviorSubject<boolean>(true);
  public currentlogin = this.loggedIn.asObservable();

  private carSource = new BehaviorSubject<cars>(new cars());
  public currentCar = this.carSource.asObservable();

  private ordersSource  = new BehaviorSubject<orders[]>([]);
  public currentOrders = this.ordersSource.asObservable();



  constructor() { }

  public changeMessage(message: string){
    this.messageSource.next(message);
  }

  public setUser(user: users){
    this.userSource.next(user);
  }

  public setlogin(login: boolean){
    this.loggedIn.next(login);
  }

  public setCar(car: cars){
    this.carSource.next(car);
  }

  public setOrders(orders: orders[]){
    this.ordersSource.next(orders);
  }
}
