import { Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { PlacesService } from '../../services';
import { Map, Popup, Marker } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {
@ViewChild('mapDiv') mapDivElement!: ElementRef


  constructor(private placesService:PlacesService) { }
 
  
  ngAfterViewInit(): void {
    if(!this.placesService.userLocation ) throw Error("No hay placesService.userLocation");
    console.log(this.placesService.userLocation);
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
      });

    const popup = new Popup()
      .setHTML(`
        <h6>Aqui estoy<h6>
        <span>Estoy en este lugar del mundo</span>
      `);
    
    new Marker({color: 'red'})
        .setLngLat( this.placesService.userLocation )
        .setPopup( popup )
        .addTo( map );
  }

}
