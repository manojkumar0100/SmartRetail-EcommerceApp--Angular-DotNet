import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  apiendpoint = environment.apiendpoint;

    private notifyParentSource = new Subject<void>();
    notifyParent$ = this.notifyParentSource.asObservable();

    notifyParent() {
      this.notifyParentSource.next();
    }
  
    

}
