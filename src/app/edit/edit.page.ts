import { Component, OnInit } from '@angular/core';
import { Toast } from '@capacitor/toast';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

declare var Chessboard: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})

export class EditPage implements OnInit {
  private board2: any
  photo: any = false
  position: any = ''
  image : any

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.position = params['position']; // (+) converts string 'id' to a number
   });
  }
  
  constructor(private route: ActivatedRoute,
              private router: Router) { 

  }

  ionViewWillEnter() {
      this.board2 = Chessboard('board2', {
        position: this.position,
        draggable: true,
        dropOffBoard: 'trash',
        sparePieces: true
      });
  }

  async save() {
    let date = new Date();
    Preferences.set({
      key: date.toISOString(),
      value: this.board2.fen()
    }).then(() => {
      Toast.show({
        text: 'Your board has been saved to gallery!',
        duration: 'short'
      });
    }).catch((err) => {
      Toast.show({
        text: 'An error has occurred!',
        duration: 'short'
      });
    });
  }


  async analyze() {
    let date = new Date();
    Preferences.set({
      key: date.toISOString(),
      value: this.board2.fen()
    }).then(() => {
      Toast.show({
        text: 'Your board has been saved to gallery!',
        duration: 'short'
      });
    }).catch((err) => {
      Toast.show({
        text: 'An error has occurred!',
        duration: 'short'
      });
    });

    this.router.navigate(['/edit', this.board2.position]);
  }



}
