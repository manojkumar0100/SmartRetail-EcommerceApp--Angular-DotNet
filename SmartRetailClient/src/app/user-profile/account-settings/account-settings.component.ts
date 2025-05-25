import { Component } from '@angular/core';
import { UserprofileService } from '../services/userprofile.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent {
  settingsData = {
    password: '',
    confirmPassword: ''
  };

  constructor(private userprofileservice : UserprofileService){}

  onSave(): void {
    if (this.settingsData.password === this.settingsData.confirmPassword) {
    this.userprofileservice.updatepassword(this.settingsData.password);
      console.log('Settings Saved:', this.settingsData);
    } else {
      alert('Passwords do not match.');
    }
  }
}
