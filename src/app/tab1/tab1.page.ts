import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { Camera, CameraResultType } from '@capacitor/camera';

declare var Chessboard: any;


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private board2: any
  photo: any

  constructor(private toastController: ToastController,
              private storageService: StorageService) { 

  }

  ngOnInit() {
    
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
    this.storageService.set(date.toISOString(), this.board2.fen());
    const toast = await this.toastController.create({
      message: "Position is saved.",
      duration: 2000,
      position: 'bottom',
    });

    await toast.present();
  }


  async analyze() {
    const toast = await this.toastController.create({
      message: this.board2.fen(),
      duration: 2000,
      position: 'bottom',
    });

    await toast.present();
  }

  takePicture(){
    this.photo = async () => {
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
    
      // Can be set to the src of an image now
      //imageElement.src = imageUrl;
    };
  }

  uploadPicture(){
    
  }




}
