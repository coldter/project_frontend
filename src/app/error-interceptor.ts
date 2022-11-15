import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private dialog: MatDialog) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError(
                (error: HttpErrorResponse) => {
                    //console.log(error)
                    let msg = "Unknown Error Occured"
                    if (error.error.message) {
                        msg = error.error.message
                        console.log(error.error.message)

                    }
                    this.dialog.open(ErrorComponent, {
                        data: { message: msg },
                        width: '200px'

                    });
                    return throwError(error)
                }
            )
        )
            ;
    }

}