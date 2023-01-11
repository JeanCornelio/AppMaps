import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number,number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] =[];

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  constructor( private http: HttpClient) { 
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number,number]> {

    return new Promise((resolve, reject)=>{

      navigator.geolocation.getCurrentPosition(
        ({ coords })=>{
          this.userLocation = [coords.longitude, coords.latitude];
          resolve( this.userLocation );
        },
        (err) =>{
          alert('No se pudo obtener la geolocalizacion');
          console.log(err);
          reject();
        }
      );
    });

  }

  getPlacesByQuery(query: string = ''){
    //TODO: Evaluar cuando el query es nulo

    this.isLoadingPlaces = true;

    this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=1&types=place%2Cpostcode%2Caddress&language=es&access_token=pk.eyJ1IjoiamVhbndlYiIsImEiOiJjbDhpdzU1c2cwdTIzM3dzMTJnejFtd3V3In0.1hYny__xHyyNJYGVW3K3NQ`)
    .subscribe(resp =>{
      console.log(resp.features);

      this.isLoadingPlaces = false;
      this.places = resp.features;
    })
  }
}
