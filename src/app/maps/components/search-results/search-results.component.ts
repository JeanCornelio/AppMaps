import { Component, OnInit } from '@angular/core';
import { TitleStrategy } from '@angular/router';
import { Feature } from '../../interfaces/places';
import { MapsService, PlacesService } from '../../services';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  public selectedId: string = "";

  constructor(private placesServices: PlacesService,
              private mapServices: MapsService) { }

  ngOnInit(): void {
  }

  get isLoadingPlaces(){
    return this.placesServices.isLoadingPlaces;
  }

  get places(){
    return this.placesServices.places;
  }

  flyTo(place: Feature){
    this.selectedId = place.id;
    const [ lng, lat] = place.center;
    this.mapServices.flyTo([lng, lat]);
  }

  getDireccitions(place:Feature){
    if(!this.placesServices.userLocation) throw Error('No hay userL:ocation');

    this.placesServices.deletePlaces();

    const start = this.placesServices.userLocation!;
    const end = place.center as [number, number];

    this.mapServices.getRouteBetweenPoints(start, end)
  }

}
