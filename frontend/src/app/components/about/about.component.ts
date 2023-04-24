import { Component, OnInit } from '@angular/core';
/* import { EphemeralKeyInfo } from 'tls'; */

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
    public title: string;
    public subtitle: string;
    public web: string;

  constructor() {
      this.title="Juanito";
      this.subtitle="Desarrollador web Formador";
      this.web = "victorroblesweb.es"; 
   }

  ngOnInit(): void {
  }

}
