import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
declare let jQuery: any;
declare var $:any;

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
            @Input() anchura:number;
            @Input('tags') captions:boolean;
            @Output() conseguirAutor= new EventEmitter();
            public autor:any;

        constructor() { 
          this.autor={
            nombre:"Juan Francisco",
            website:"Programarte.com",
            youtube:"Sin pagina WEB"
          };

        }

        ngOnInit(): void {
          $("#logo").click(function(e){
            e.preventDefault();
            $("header").css("background","green")
                      .css("height","50px"); 


            });   
            (<any>$(".bxslider")).bxSlider({
            mode: 'fade',
            captions: this.captions,
            slideWidth: this.anchura
            });
          }
        lanzar(event){
            
            this.conseguirAutor.emit(this.autor);
 
        }

}
