import { Component } from '@angular/core';
import { Toast } from '@capacitor/toast';
import { Preferences } from '@capacitor/preferences';
import { Camera, CameraResultType } from '@capacitor/camera';

declare var Chessboard: any;


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private board2: any
  photo: any = false

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
      resultType: CameraResultType.Uri
    });
    
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)

      var imageUrl = image.webPath;
      console.log(imageUrl)
    
      // Can be set to the src of an image now
      //imageElement.src = imageUrl;
  }

  uploadPicture(){
    
  }

  async curl() {
    const url = 'http://api.deepai.org/api/fast-style-transfer';
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('api-key', 'myKey');
  
    let requestBody = new FormData();
  
    requestBody.append('content', 'https://www.dmarge.com/cdn-cgi/image/width=1200,quality=85,fit=scale-down,format=auto/https://www.dmarge.com/wp-content/uploads/2021/01/dwayne-the-rock-.jpg');
    requestBody.append('style', 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/starry-night-print-by-vincent-van-gogh-vincent-van-gogh.jpg');
  
    const resp = await this.http.post(url, requestBody, {
      headers: headers
    }).toPromise().then();
  
    console.log(resp);
  }




}
