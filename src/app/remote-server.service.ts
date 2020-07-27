import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RemoteServerService {

    takenNames = ['bob', 'alice'];

    constructor() { }

    checkNameExists(name: string): Observable<boolean> {
        const isTaken = this.takenNames.includes(name);
        return of(isTaken);
    }
}