import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingComponent } from '@core/loading';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoadingComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('teslo-shop');
}
