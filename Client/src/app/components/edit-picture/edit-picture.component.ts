import { Component, OnInit } from '@angular/core';
import { users } from 'src/app/models/users';
import { DataShareService } from 'src/app/services/data-share.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImagesHandlerService } from 'src/app/services/images-handler.service';
import { ServerService } from 'src/app/services/server.service';
import { cars } from 'src/app/models/cars';

@Component({
  selector: 'app-edit-picture',
  templateUrl: './edit-picture.component.html',
  styleUrls: ['./edit-picture.component.css']
})
export class EditPictureComponent implements OnInit {
  public myUser: users;
  public imageFile: File;

  public myCar: cars

  private personalEditMode = true;
  public returnToEditUsers = false;
  public returnToEditCars = false;

  public loadPage = false;

  constructor(private dataShare: DataShareService, private activatedRoute: ActivatedRoute, private router: Router,
    public imageService: ImagesHandlerService, private serverService: ServerService, private DataShare: DataShareService) { }

  ngOnInit() {
    if((this.activatedRoute.snapshot.routeConfig.path.indexOf("user-manager") > -1 || this.activatedRoute.snapshot.routeConfig.path.indexOf("car-manager") > -1) && (!JSON.parse(localStorage.getItem("loggedUser")) || JSON.parse(localStorage.getItem("loggedUser")).rank.rank != "מנהל")){
      alert("אין לך גישה לדף זה! ");
      this.router.navigate(['/home']);
    }

    if(this.activatedRoute.snapshot.routeConfig.path.indexOf("change-my-picture") > -1){
      this.dataShare.currentUser.subscribe(user => {this.myUser = user;});
      this.personalEditMode = true;
      this.loadPage = true;
    }
    else if(this.activatedRoute.snapshot.routeConfig.path.indexOf("user-manager") > -1){
      const id = +this.activatedRoute.snapshot.params.id;
      this.serverService.getTheUsers().subscribe(users => {
        for (let p of users) {
          if (p.id === id) {
            this.loadPage = true;
            this.myUser = p;
            this.personalEditMode = false;
            this.returnToEditUsers = true;
            break;
          }
        }
        if(!this.myUser){
          alert("משתמש זה לא קיים.");
          this.router.navigate(['/user-manager']);
        }
      }, () => {alert("חלה שגיאה בטעינת הדף, נא נסה שנית או בדוק את החיבור"); this.loadPage = true;});
    }
    else if(this.activatedRoute.snapshot.routeConfig.path.indexOf("edit-car-picture") > -1){
      this.DataShare.changeMessage("ניהול רכבים");
      const id = +this.activatedRoute.snapshot.params.id;
      this.serverService.getTheCars().subscribe(cars => {
        for (let p of cars) {
          if (p.id === id) {
            this.myCar = p;
            this.personalEditMode = false;
            this.returnToEditCars = true;
            this.loadPage = true;
            break;
          }
        }
        if(!this.myCar){
          alert("מכונית זה לא קיימת.")
          this.router.navigate(['/car-manager/manage-cars/cars-table']);
        }
      }, () => {alert("חלה שגיאה בטעינת הדף, נא נסה שנית או בדוק את החיבור"); this.loadPage = true;});
    }
  }

  public updatePicture(){
    this.loadPage = false;
    if(this.myUser){
      this.serverService.updateUserImage(this.myUser, this.imageFile).subscribe(p => 
        {alert("התמונה עודכנה בהצלחה");
        this.myUser.image = p.image;
        if((JSON.parse(localStorage.getItem("loggedUser")) as users).id == p.id){
          localStorage.setItem("loggedUser", JSON.stringify(this.myUser));
          this.dataShare.setlogin(true);
        }
        
        this.loadPage = true;
        this.imageFile = null;},
        () => {alert("חלה שגיאה בעדכון התמונה"); this.loadPage = true;});
    }
    else if(this.myCar){
      let userSearchedCars:cars[] = JSON.parse(localStorage.getItem("cars"));
      this.serverService.updateCarImage(this.myCar, this.imageFile).subscribe(p =>
        {alert("התמונה עודכנה בהצלחה");
        this.myCar.picture = p.picture;
        this.imageFile = null;
        this.loadPage = true;

        if(userSearchedCars){
          for(let i = 0; i < userSearchedCars.length; i++){
            if(userSearchedCars[i].id == p.id){
              userSearchedCars.splice(i, 1, p);
              localStorage.setItem("cars", JSON.stringify(userSearchedCars));
              break;
            }
          }
        }},
        () => {alert("חלה שגיאה בעדכון התמונה");this.loadPage = true;})
    }
  }

  public deletePicture(){
    let confirmDelete = confirm("אתה בטוח שברצונך למחוק את התמונה?");
    if(!confirmDelete){
      return;
    }
    this.loadPage = false;
    this.serverService.DeleteUserImage(this.myUser).subscribe(p => 
      {alert("התמונה נמחקה בהצלחה");
      this.myUser.image = p.image;
      if(this.personalEditMode){
        localStorage.setItem("loggedUser", JSON.stringify(this.myUser));
        this.dataShare.setlogin(true);
      }
      this.imageFile = null;
      this.loadPage = true;},
        () => {alert("חלה שגיאה במחיקת התמונה");this.loadPage = true;});
    
    
  }

  public getOutOfHeere(){
    if(this.myUser){
      this.router.navigate(['/user-manager']);
    }
    else if(this.myCar){
      this.router.navigate(['/car-manager/manage-cars/cars-table']);
    }
  }

}
