import { Injectable, OnInit } from '@angular/core';
import { WebsocketService } from './websocket.service';

@Injectable({
  providedIn: 'root'
})
export class GpsdataService {

  public parsedData:any
  public long:any
  public lat:any
  public head:any
  public sat:any
  public hdop:any
  public longi:any
  public lati:any
  constructor(private webSoc:WebsocketService) { }

// Function to start receiving data from websocket
  Init() {
    this.webSoc.listen("location-next").subscribe((data:any) => {
      // The data from raspberry pi client needs to be converted from string to json format
      this.parsedData=JSON.parse(data)

      this.long=this.parsedData.longitude
      this.lat=this.parsedData.latitude
      // this.head=this.parsedData.heading
      // this.head=0
      // this.sat=this.parsedData.satelite
      // this.hdop=this.parsedData.hdop


    })
    this.webSoc.listen("heading-next").subscribe((data:any) => {
      // The data from raspberry pi client needs to be converted from string to json format
      this.parsedData=JSON.parse(data)

      this.head=this.parsedData.heading
      // this.head=0
      // this.sat=this.parsedData.satelite
      // this.hdop=this.parsedData.hdop

    })

    // this.head=0
    this.sat=3
    this.hdop=2
    // this.longi=107.609208
    // this.lati=-6.889398833333333
  }

// Function to get heading data
  heading(){
    console.log(this.head)
    return(this.head)
  }

  // Function to get hdop data
  gethdop(){
    return(this.hdop)
  }

  // Function to get number of satelite
  sateliteCount(){

    console.log(this.sat)

    return(this.sat)
  }

  // Function to get coordinate data
  coordinate(){
    console.log(this.lat)
    console.log(this.long)
    return [this.long,this.lat]
  }


}
