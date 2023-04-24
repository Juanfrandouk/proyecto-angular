import { Component, OnInit ,  ViewChild } from '@angular/core';
//import { $ } from 'protractor';
declare let jQuery: any;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
   public widthSlider : number;
   public anchuraToSlider:number;
   public captions: boolean;
   public autor:any;
   @ViewChild('textos') textos;
  
    constructor() {
      this.captions=true;
      this.autor=null;
     }

  ngOnInit(): void {
   /*  var opcion_clasica= document.querySelector('#textos').innerHTML; */
        
 
  }
  cargarSlider(){
       /*  this.anchuraToSlider=null; */
        this.anchuraToSlider= this.widthSlider;

  }
  
  resetSlider(){
            this.anchuraToSlider=null;
  }
  getAutor(event){
 
    this.autor=event; 
    
  }
}
