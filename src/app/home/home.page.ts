import { Component } from "@angular/core";
import {Camera, CameraOptions} from "@ionic-native/camera/ngx"
import { AlertController } from '@ionic/angular';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  currentImage:any;
  constructor(private camera:Camera, private alert:AlertController, private http:HttpClient) {}


    //alert
    async showAlert(message){
      const alet = await this.alert.create({
        header: 'test',
        subHeader: 'another test',
        message: message,
        buttons: ['ok']
      });

      await alet.present()
    }

   takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     
     this.currentImage = 'data:image/jpeg;base64,' + imageData;
     if(this.currentImage){

      this.http.post('finllect.herokuapp.com/test_upload', {key:'img', Payload:this.currentImage}).subscribe(res => {
        this.showAlert(res)
      })
      //this.showAlert(this.currentImage)
     }
    }, (err) => {
     // Handle error
    });
   }
}
