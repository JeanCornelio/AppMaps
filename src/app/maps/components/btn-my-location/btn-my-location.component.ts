import { Component } from '@angular/core';
import { MapsService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css']
})
export class BtnMyLocationComponent  {

  constructor(private mapServices: MapsService,
              private placesService: PlacesService) { }


  goTomyLocation(){
    if(!this.placesService.isUserLocationReady) throw Error('No hay Ubicacion de usuario');
    if(!this.mapServices.isMapReady) throw Error('No hay un mapa disponible');

    this.mapServices.flyTo(this.placesService.userLocation !);

  }

}
