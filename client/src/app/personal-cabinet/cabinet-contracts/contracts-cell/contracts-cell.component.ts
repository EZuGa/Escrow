import { Component, Input } from '@angular/core';
import { IFolder } from 'src/app/shared/interfaces/IFolder';

@Component({
  selector: 'contracts-cell',
  templateUrl: './contracts-cell.component.html',
  styleUrls: ['./contracts-cell.component.scss']
})
export class ContractsCellComponent {

  @Input() folder!: IFolder;

}
