import { AfterViewInit, Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet, } from '@angular/router';
import { LottieComponent } from 'ngx-lottie';
import { AnimationOptions } from 'ngx-lottie';
import { AboutusComponent } from './aboutus/aboutus.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LottieComponent,RouterLink,AboutusComponent], // 👈 Lottie import yahan
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
 
}
