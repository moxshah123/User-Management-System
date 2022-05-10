import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CountryService {
  constructor(private httpClient: HttpClient) {}

  async getCountries(countryName: string) {
    console.log(countryName);

    return this.httpClient.get(
      `https://restcountries.com/v3/name/${countryName}`
    );
  }
}
