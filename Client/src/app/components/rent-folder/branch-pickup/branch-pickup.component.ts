import { Component, OnInit } from '@angular/core';
import { Branches } from 'src/app/models/branches';
import { DataShareService } from 'src/app/services/data-share.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-branch-pickup',
  templateUrl: './branch-pickup.component.html',
  styleUrls: ['./branch-pickup.component.css']
})
export class BranchPickupComponent implements OnInit {

  public oneBranch: Branches;
  public displayedURL: string;
  public presentedURL;


  constructor(private DataShare: DataShareService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.DataShare.currentCar.subscribe(item => {this.oneBranch = item.branch; this.initMap();});
    
    
  }

  public initMap(){
    this.displayedURL = 'https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1750.651808174019!2d' + 
      this.oneBranch.longitude + "!3d" + this.oneBranch.latitude + "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sgoogle"
     +  "%20map!5e0!3m2!1siw!2sil!4v1578513192684!5m2!1siw!2sil";

    this.presentedURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.displayedURL);
  }

}
