import { AbstractControl } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
//async validator

export const mimType = (control: AbstractControl):
    Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> => {
    const file = control.value as File
    const fileReader = new FileReader();
    const obs = Observable.create(
        (observer: Observer<{ [key: string]: any }>) => {
            //same like onload()
            fileReader.addEventListener("loadend", () => {

                //mimetype validation
                const array = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
                //checks if input is onlu images
                let header = "";
                let isValid=false;
                for (let i = 0; i < array.length; i++) {
                    header += array[i].toString(16);
                    //to hexadecimal
                }
                switch (header){
                    case "89504e47":
                        isValid=true;
                        break;
                    case "ffd8ffe0":
                    case "ffd8ffe1":
                    case "ffd8ffe2":
                    case "ffd8ffe3":
                    case "ffd8ffe8":
                        isValid=true;
                        break;
                    default:
                        isValid=false;
                        break;

                }

                if(isValid){
                    observer.next(null)
                }
                else{
                    observer.next({invalidtype:true})
                }
                observer.complete();

            });
            fileReader.readAsArrayBuffer(file);

        }
    );
    return obs;
}