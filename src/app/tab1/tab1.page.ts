import { Component } from '@angular/core';
import { Toast } from '@capacitor/toast';
import { Preferences } from '@capacitor/preferences';
import { Camera, CameraResultType } from '@capacitor/camera';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import {decode} from "base64-arraybuffer";
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
  image : any

  constructor() { 

  }

  ionViewDidEnter() {
    if(this.photo){
      var ruyLopez = 'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R'
      this.board2 = Chessboard('board2', {
        position: ruyLopez,
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
      const response = await axios.post('http://ec2-3-79-108-149.eu-central-1.compute.amazonaws.com:8080/home', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      
    }
  
    // or...
    // const response = await CapacitorHttp.request({ ...options, method: 'POST' })
  };


}
