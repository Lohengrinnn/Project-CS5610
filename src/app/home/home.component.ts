import {AfterContentInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('map') public mapElement: ElementRef;
  map: google.maps.Map;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const mapProperties = {
      center: new google.maps.LatLng(35.2271, -80.8431),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  }
}
