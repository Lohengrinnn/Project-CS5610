import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  hidden: boolean = false
  constructor() { }

  close() {
    this.hidden = true;
  }

  ngOnInit(): void {
  }

}
