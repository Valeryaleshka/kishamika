import {DecimalPipe} from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Options} from 'browser-image-compression';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzWaveDirective } from 'ng-zorro-antd/core/wave';
import {
  NzFormControlComponent,
  NzFormItemComponent,
  NzFormLabelComponent,
} from 'ng-zorro-antd/form';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzSpinComponent } from 'ng-zorro-antd/spin';

import {CompressedFile, CompressorOptions} from './home.interfaces';
import {AppImageSizePipe, AppImageSrcPipe} from './home.pipe';
import { HomeService } from './hone.service';
import { ContentWrapperComponent } from '../../components/content-wrapper/content-wrapper.component';
import { CenterDirective } from '../../derectives/center-content.directive';
import { DropareaDirective } from '../../derectives/droparea.directive';


@Component({
  selector: 'app-home',
  imports: [
    ContentWrapperComponent,
    CenterDirective,
    FormsModule,
    NzColDirective,
    NzFormControlComponent,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzInputDirective,
    NzRowDirective,
    NzButtonComponent,
    DecimalPipe,
    NzWaveDirective,
    ReactiveFormsModule,
    DropareaDirective,
    AppImageSrcPipe,
    AppImageSizePipe,
    NzSpinComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [HomeService],
})
export class HomeComponent {
  private homeService = inject(HomeService);

  protected originalFiles: FileList | null = null;
  protected compressedFiles: CompressedFile[] | null = null;

  protected compressInProgress = false;

  protected compressorOptions: CompressorOptions = {
    maxSize: 1,
    compressorQuality: 50,
  }


  uploadFiles(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.originalFiles = input.files;
    }
  }

  async compress() {
    if (this.originalFiles && !this.compressInProgress) {
      this.compressInProgress = true;

      const options: Options = {
        initialQuality: this.compressorOptions.compressorQuality / 100,
        alwaysKeepResolution: false,
        useWebWorker: true,
        maxSizeMB: this.compressorOptions.maxSize,
      };

      this.compressedFiles = await this.homeService.compressFile(
        this.originalFiles,
        options,
      );

      this.compressInProgress = false;
    }
  }

  cleanFiles(){
    this.originalFiles = null;
    this.compressedFiles = null;
  }

  download() {
    if (this.compressedFiles) {
      this.homeService.downloadFile(this.compressedFiles).then();
    }
  }

  downloadSingle(file: CompressedFile){
    this.homeService.downloadFile([file]).then();
  }
}
