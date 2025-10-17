import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

import { ContentWrapperComponent } from '../../components/content-wrapper/content-wrapper.component';
import { CenterDirective } from '../../derectives/center-content.directive';

@Component({
  selector: 'app-about',
  imports: [CenterDirective, ContentWrapperComponent, NgOptimizedImage],
  templateUrl: './about.component.html',
  styleUrl: './about.component.less',
})
export class AboutComponent {}
