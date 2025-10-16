import { inject, Injectable, Renderer2 } from '@angular/core';
import imageCompression, { Options } from 'browser-image-compression';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { mergeRight } from 'ramda';
import { CompressedFile } from './compress.interfaces';

@Injectable()
export class CompressService {
  private readonly imageCompress = imageCompression;
  private readonly renderer = inject(Renderer2);


  public async downloadFile(files: CompressedFile[]){
    if(files.length === 1){
      saveAs(files[0].compressedUrl, files[0].compressedFile.name);
    } else {
      const zip = new JSZip();

      for (const file of files) {
        zip.file(file.compressedFile.name, file.compressedFile);
      }

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'organized_files.zip');
    }
  }

  async compressFile(originalFiles: FileList, options: Options) {

    const defaultOptions: Options = {
      initialQuality: 50,
      alwaysKeepResolution: false,
      useWebWorker: true,

    };

      try {
        const compressionPromises = Array.from(originalFiles).map(async file => {
          const compressedImage = await this.imageCompress(file, mergeRight(defaultOptions, options));
          const url = await this.imageCompress.getDataUrlFromFile(compressedImage);
          return {
            compressedFile: compressedImage,
            compressedUrl: url,
          };
        });

        return await Promise.all(compressionPromises);

      } catch (error) {
        console.log(error)
        throw error;
      }
  }
}
