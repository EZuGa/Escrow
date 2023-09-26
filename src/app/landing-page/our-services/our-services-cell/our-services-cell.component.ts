import { Component, Input } from '@angular/core';

@Component({
  selector: 'our-services-cell',
  templateUrl: './our-services-cell.component.html',
  styleUrls: ['./our-services-cell.component.scss']
})
export class OurServicesCellComponent {

  @Input() title!: string;

}
