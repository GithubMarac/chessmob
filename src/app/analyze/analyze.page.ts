import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Browser } from '@capacitor/browser';



@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.page.html',
  styleUrls: ['./analyze.page.scss'],
})
export class AnalyzePage implements OnInit {
  analyze_url : string = ''
  fen : string = ''

  constructor(private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.fen = params['fen']; // (+) converts string 'id' to a number
   });

   this.analyze_url = "https://lichess.org/analysis/standard/" + this.fen;
   console.log(this.analyze_url);
  }

  async openCapacitorSiteasync(){
    await Browser.open({ url: this.analyze_url, windowName: '_system' });
  };
  

}
