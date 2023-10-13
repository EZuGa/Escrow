import { Component, Input } from '@angular/core';
import { IFile } from 'src/app/shared/interfaces/IFile';

@Component({
  selector: 'contracts-files-cell',
  templateUrl: './contracts-files-cell.component.html',
  styleUrls: ['./contracts-files-cell.component.scss']
})
export class ContractsFilesCellComponent {

  @Input() file!: IFile;

}
