import { Component } from '@angular/core';
import { Toast } from '@capacitor/toast';
import { Preferences } from '@capacitor/preferences';
import { Camera, CameraResultType } from '@capacitor/camera';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { LoadingController } from '@ionic/angular';
import {decode} from "base64-arraybuffer";
import { Router } from '@angular/router';
import axios from 'axios';

declare var Chessboard: any;


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private board2: any
  photo: any = false
  position: any = ''
  image : any

  constructor(private loadingCtrl: LoadingController,
              private router: Router) { 

  }

  ionViewDidEnter() {
    if(this.photo){
      this.board2 = Chessboard('board2', {
        position: this.position,
        draggable: true,
        dropOffBoard: 'trash',
        sparePieces: true
      });
    }
  }

  async save() {
    let date = new Date();
    await Preferences.set({
      key: date.toISOString(),
      value: this.board2.fen()
    });

    await Toast.show({
      text: 'Hello!',
    });


  }


  async analyze() {
    await Toast.show({
      text: 'Hello!',
    });
  }

  async takePicture(){
    const permissions = await Camera.requestPermissions();

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64
    });
    
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)

      this.image = image;

      await this.doPost(this.image);
    
      // Can be set to the src of an image now
      //imageElement.src = imageUrl;
  }

  uploadPicture(){
    
  }

  async doPost(image: any) {
    const blob = new Blob([new Uint8Array(decode(image.base64String))], {
      type: `image/${image.format}`,
  });
  
    const form = new FormData();
    console.log(image)
    form.append("photo", blob, 'image.jpg');
    form.append("corner", "BL")

  
    try {
      const loading = await this.loadingCtrl.create({
        message: 'Uploading photo, please wait...'
      });

      loading.present();
      const response = await axios.post('http://ec2-3-79-108-149.eu-central-1.compute.amazonaws.com:8080/home', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      loading.dismiss();
      this.router.navigate(['/edit', response.data]);

    } catch (error) {
      
    }
  
    // or...
    // const response = await CapacitorHttp.request({ ...options, method: 'POST' })
  };


}
