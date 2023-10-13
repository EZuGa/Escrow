import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalCabinetRoutingModule } from './personal-cabinet-routing.module';
import { PersonalCabinetViewComponent } from './personal-cabinet-view/personal-cabinet-view.component';
import { PersonalCabinetMyProfileComponent } from './personal-cabinet-my-profile/personal-cabinet-my-profile.component';
import { CabinetMessagesComponent } from './cabinet-messages/cabinet-messages.component';
import { CabinetContractsComponent } from './cabinet-contracts/cabinet-contracts.component';
import { CabinetBalanceComponent } from './cabinet-balance/cabinet-balance.component';
import { InputWithLabelComponent } from './personal-cabinet-my-profile/input-with-label/input-with-label.component';
import { ContractsCellComponent } from './cabinet-contracts/contracts-cell/contracts-cell.component';
import { CabinetHeaderComponent } from './cabinet-header/cabinet-header.component';
import { ContractsFilesComponent } from './cabinet-contracts/contracts-files/contracts-files.component';
import { ContractsFoldersComponent } from './cabinet-contracts/contracts-folders/contracts-folders.component';
import { ContractsFilesCellComponent } from './cabinet-contracts/contracts-files-cell/contracts-files-cell.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesMainComponent } from './cabinet-messages/messages-main/messages-main.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ContractsFooterComponent } from './cabinet-contracts/contracts-footer/contracts-footer.component';
import { CreateFolderComponent } from '../shared/dialogs/create-folder/create-folder.component';
import { SharedComponentsModule } from '../shared/components/shared-components.module';
import { MaterialModule } from '../shared/material/material.module';


@NgModule({
  declarations: [
    PersonalCabinetViewComponent,
    PersonalCabinetMyProfileComponent,
    CabinetMessagesComponent,
    CabinetContractsComponent,
    CabinetBalanceComponent,
    InputWithLabelComponent,
    ContractsCellComponent,
    CabinetHeaderComponent,
    ContractsFilesComponent,
    ContractsFoldersComponent,
    ContractsFilesCellComponent,
    MessagesMainComponent,
    UserInfoComponent,
    ContractsFooterComponent,
    CreateFolderComponent
  ],
  imports: [
    CommonModule,
    PersonalCabinetRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedComponentsModule,
    MaterialModule
  ],
})
export class PersonalCabinetModule { }
