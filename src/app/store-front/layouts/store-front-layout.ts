import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrontNavbar } from '../front-navbar/front-navbar';

@Component({
  selector: 'app-store-front-layout',
  imports: [RouterOutlet, FrontNavbar],
  templateUrl: './store-front-layout.html',
})
export class StoreFrontLayout {}
