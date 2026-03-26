import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from './shared/components/header/header.component';
import { CatListComponent } from './features/cat-list/cat-list.component';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, CatListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  ngOnInit() {
    AOS.init({
      duration: 900,
      once: false,
      mirror: true,
      offset: 80,
      easing: 'ease-out-quart',
    });
  }
}
