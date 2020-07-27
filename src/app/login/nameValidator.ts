import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Injectable} from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { RemoteServerService } from '../remote-server.service';

@Injectable({
    providedIn: 'root',
})
export class RemoteNameValidator implements AsyncValidator {
    constructor(private remoteServer: RemoteServerService) {}

    validate(control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
        const name = control.value;
        return this.remoteServer.checkNameExists(name).pipe(
            map((isNameExists) => isNameExists ? { isRemoteNameTaken: true } : null )
        );
    }
}


