import { Component} from '@angular/core';


import { ContentWrapperComponent } from '../../components/content-wrapper/content-wrapper.component';
import { CenterDirective } from '../../derectives/center-content.directive';

@Component({
  selector: 'app-about',
  imports: [
    CenterDirective,
    ContentWrapperComponent,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
}
