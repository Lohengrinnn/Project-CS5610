import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
  @Input() show: boolean = false;
  @Output() showChange = new EventEmitter<boolean>()
  hidden: boolean = false
  constructor() { }

  close() {
    localStorage.setItem('privacy', 'hidden');
    this.hidden = true;
    this.showChange.emit(false)
  }

  ngOnInit(): void {
    this.hidden = localStorage.getItem('privacy') === 'hidden' && !this.show;
  }

  ngOnChanges(changes) {
    if (changes.show) {
      this.ngOnInit();
    }
  }
}
