import { Component, Input } from '@angular/core';

@Component({
  selector: 'input-with-label',
  templateUrl: './input-with-label.component.html',
  styleUrls: ['./input-with-label.component.scss']
})
export class InputWithLabelComponent {

  @Input() labelTitle!: string;

}
