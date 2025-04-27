import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

interface Journey{
    country: string,
    duration: string,
    budget: number,
    experience: string[],
    participant: number,
    precision: string
}

@Injectable({
    providedIn: 'root',
})

export class JourneyService {
    private http = inject(HttpClient);
    readonly url = 'http://localhost:8000/';

    createJourney(journey: Omit<Journey, 'id'>): Observable<{content: string}> {
        return this.http.post<{content: string}>(`${this.url}journeyGenerator`, journey)
    }
}