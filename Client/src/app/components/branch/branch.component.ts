import { Component, OnInit, Input } from '@angular/core';
import { Branches } from 'src/app/models/branches';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  @Input()
  public branch: Branches;

  constructor() { }

  ngOnInit() {
  }

}
