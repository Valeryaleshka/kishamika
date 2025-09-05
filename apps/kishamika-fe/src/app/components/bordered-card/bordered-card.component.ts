import { Component } from '@angular/core';

@Component({
  selector: 'app-bordered-card',
  imports: [],
  standalone: true,
  providers: [{ provide: 'TOKEN', useValue: { title: 'new title' } }],
  templateUrl: './bordered-card.component.html',
  styleUrl: './bordered-card.component.css',
})
export class BorderedCardComponent {
  public title = 'Bordered Card';
}
