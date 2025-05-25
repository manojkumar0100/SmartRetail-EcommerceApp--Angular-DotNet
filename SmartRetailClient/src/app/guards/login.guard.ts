import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: unknown
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 30); // 2-second delay
    });
  }
}
