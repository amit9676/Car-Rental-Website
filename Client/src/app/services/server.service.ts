import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cars } from '../models/cars';
import { orders } from '../models/orders';
import { carModels } from '../models/carModels';
import { carManufactors } from '../models/carManufactors';
import { carDesigns } from '../models/carDesigns';
import { Branches } from '../models/branches';
import { users } from '../models/users';
import { messages } from '../models/messages';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private httpClient: HttpClient) { }


  //cars
  public getTheCars():Observable<cars[]>{

    const url = 'http://localhost:57250/api/cars';
    return this.httpClient.get<cars[]>(url);
  }

  public AddCar(car: cars):Observable<cars>{

    const url = 'http://localhost:57250/api/cars';
    return this.httpClient.post<cars>(url, car);
  }

  public UpdateCar(car: cars):Observable<cars>{

    const url = 'http://localhost:57250/api/cars';
    return this.httpClient.put<cars>(url + "/" + car.id, car);
  }

  public deleteCar(id: number):Observable<undefined>{
    return this.httpClient.delete<undefined>('http://localhost:57250/api/cars' + "/" + id);
  }

  public updateCarImage(car: cars, file: File): Observable<cars> {
    return this.httpClient.patch<users>("http://localhost:57250/api/carsImage" + "/" + car.id, file);
  }

  public DeleteCarImage(car: cars): Observable<cars> {
    return this.httpClient.put<cars>("http://localhost:57250/api/carsImage" + "/" + car.id, null);
  }


  //manufactor
  public getTheManufactors():Observable<carManufactors[]>{

    const url = 'http://localhost:57250/api/manufactors';
    return this.httpClient.get<carManufactors[]>(url);
  }

  public AddManufactors(manufactor: carManufactors):Observable<carManufactors>{

    const url = 'http://localhost:57250/api/manufactors';
    return this.httpClient.post<carManufactors>(url, manufactor);
  }

  public UpdateManufactor(manufactor: carManufactors):Observable<carManufactors>{

    const url = 'http://localhost:57250/api/manufactors';
    return this.httpClient.put<carManufactors>(url + "/" + manufactor.id, manufactor);
  }

  public deleteManufactor(id: number):Observable<undefined>{
    return this.httpClient.delete<undefined>('http://localhost:57250/api/manufactors' + "/" + id);
  }


  //model
  public getTheModels():Observable<carModels[]>{

    const url = 'http://localhost:57250/api/models';
    return this.httpClient.get<carModels[]>(url);
  }

  public AddModel(model: carModels):Observable<carModels>{

    const url = 'http://localhost:57250/api/models';
    return this.httpClient.post<carModels>(url, model);
  }

  public UpdateModel(model: carModels):Observable<carModels>{

    const url = 'http://localhost:57250/api/models';
    return this.httpClient.put<carModels>(url + "/" + model.id, model);
  }

  public deleteModel(id: number):Observable<undefined>{
    return this.httpClient.delete<undefined>('http://localhost:57250/api/models' + "/" + id);
  }


  //branch
  public getTheBranches():Observable<Branches[]>{

    const url = 'http://localhost:57250/api/branches';
    return this.httpClient.get<Branches[]>(url);
  }


  //design
  public getTheDesigns():Observable<carDesigns[]>{

    const url = 'http://localhost:57250/api/designs';
    return this.httpClient.get<carDesigns[]>(url);
  }

  public addDesign(design: carDesigns):Observable<carDesigns>{

    const url = 'http://localhost:57250/api/designs';
    return this.httpClient.post<carDesigns>(url, design);
  }

  public updateDesign(design: carDesigns):Observable<carDesigns>{

    const url = 'http://localhost:57250/api/designs';
    return this.httpClient.put<carDesigns>(url + "/" + design.id, design);
  }

  public deleteDesign(id: number):Observable<undefined>{
    return this.httpClient.delete<undefined>('http://localhost:57250/api/designs' + "/" + id);
  }


  //users
  public getTheUsers():Observable<users[]>{

    const url = 'http://localhost:57250/api/users';
    return this.httpClient.get<users[]>(url);
  }

  public addUser(user: users):Observable<users>{

    const url = 'http://localhost:57250/api/users';
    return this.httpClient.post<users>(url, user);
  }

  public updateUser(user: users):Observable<users>{
    return this.httpClient.put<users>('http://localhost:57250/api/users' + "/" + user.id, user);
  }

  public updateUserPassword(user: users):Observable<users>{
    return this.httpClient.patch<users>('http://localhost:57250/api/users' + "/" + user.id, user);
  }

  public updateUserImage(user: users, file: File): Observable<users> {
    return this.httpClient.patch<users>("http://localhost:57250/api/usersImage" + "/" + user.id, file);
  }

  public DeleteUserImage(user: users): Observable<users> {
    return this.httpClient.put<users>("http://localhost:57250/api/usersImage" + "/" + user.id, null);
  }

  public deleteUser(id: number):Observable<undefined>{
    
    return this.httpClient.delete<undefined>('http://localhost:57250/api/users' + "/" + id);
  }
  

  //order
  public getTheOrders():Observable<orders[]>{

    const url = 'http://localhost:57250/api/orders';
    return this.httpClient.get<orders[]>(url);
  }


  public addOrder(order: orders): Observable<orders>{
    const url ='http://localhost:57250/api/orders';
    return this.httpClient.post<orders>(url,order);
  }

  public updateOrder(order: orders):Observable<orders>{
    return this.httpClient.put<orders>('http://localhost:57250/api/orders' + "/" + order.id, order);
  }

  public deleteOrder(id: number):Observable<undefined>{
    
    return this.httpClient.delete<undefined>('http://localhost:57250/api/orders' + "/" + id);
  }


  //message
  public addMessage(message: messages): Observable<messages>{
    const url ='http://localhost:57250/api/messages';
    return this.httpClient.post<messages>(url,message);
  }


}
