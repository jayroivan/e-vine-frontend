import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

import { environment } from 'src/environments/environment';

firebase.initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  storageRef = firebase.app().storage().ref();

  constructor() { }

  async subirImagen(nombre: string, imgBase64: any) {
    try {
      let response = await this.storageRef.child("productos/"+nombre).putString(imgBase64, 'data_url');
      return await response.ref.getDownloadURL();
    } catch (error) {
      return null;
    }
  }
}
