import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
 
mapboxgl.accessToken = 'pk.eyJ1IjoiamVhbndlYiIsImEiOiJjbDhpdzU1c2cwdTIzM3dzMTJnejFtd3V3In0.1hYny__xHyyNJYGVW3K3NQ';

if(!navigator.geolocation){
  alert('Geolocalizacion no disponible');
  throw new Error("No existe la geolocalizacion");
}



if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
