import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig} from '@ionic-native/admob-free/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  //Variáveis
  resultadoTempo = null;
  resultadoContribuicao = null;
  aposentadoria = null;
  
  //Construto
  constructor(public nvCtrl : NavController, private statusBar : StatusBar,  public admobFree: AdMobFree){
    this.showInterstitialAd();
    this.showBannerAd();
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#000000');
  }

  //Botão Simular
  simular(idade:number, tempoContribuicao:number, valor:string){
    if(idade == null || tempoContribuicao == null){
      alert("Preencha todos os campos para simular!")
    }else{
      if(valor == "homem" || valor == "mulher"){
        this.resultadoTempo = valor == "homem" ? 65 - idade: 62 - idade;
        this.resultadoContribuicao = 25 - tempoContribuicao;
        {document.getElementById('resultadoTempo').innerHTML =  this.resultadoTempo >= 0 ? 
          this.resultadoTempo+" anos": "Idade Atingida";}
        {document.getElementById('resultadoContribuicao').innerHTML =  this.resultadoContribuicao >= 0 ? 
          this.resultadoContribuicao+" anos":"Tempo Atingido";}
        this.aposentadoria = 2019 + (this.resultadoTempo >= this.resultadoContribuicao ? 
          this.resultadoTempo : this.resultadoContribuicao);
        if(this.aposentadoria <= 2019){
          {document.getElementById('aposentadoria').innerHTML = "Você já pode se aposentar."};
        }else{  
        {document.getElementById('aposentadoria').innerHTML =  this.aposentadoria <= 0 ?
          "Você já pode se aposentar." : this.aposentadoria;}
        }
      }else{
        alert("Marque Homem ou Mulher!")
      }
    }
  }

  showBannerAd() {
    let bannerConfig: AdMobFreeBannerConfig = {
        autoShow: true,
        id : "ca-app-pub-4194830459217632/9412336226"
    };
    this.admobFree.banner.config(bannerConfig);
    this.admobFree.banner.prepare()
    .then(() => {
    }).catch(e => alert(e));
  }

  showInterstitialAd() {
    let InterstitialConfig: AdMobFreeInterstitialConfig = {
        autoShow: true,
        id : "ca-app-pub-4194830459217632/5241334532"
    };
    this.admobFree.interstitial.config(InterstitialConfig);
    this.admobFree.interstitial.prepare()
    .then(() => {
    }).catch(e => alert(e));
  }

}
