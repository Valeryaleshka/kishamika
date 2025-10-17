import { Injectable, inject } from '@angular/core';
import imageCompression, { Options } from 'browser-image-compression';
// @ts-ignore: JSZip has no types in this workspace
import JSZip from 'jszip';
import { NzMessageService } from 'ng-zorro-antd/message';

export interface CompressionOptions {
  maxSize: number;
  compressorQuality: number;
  exactWidth: number;
  exactHeight: number;
  exactFileSize: number;
  exactFileSizeUnit: 'bytes' | 'KB' | 'MB';
  useExactResolution: boolean;
  useExactFileSize: boolean;
}

export interface ProcessedFile {
  original: File;
  compressed: File;
  preview: string;
}

export interface CompressionProgress {
  current: number;
  total: number;
  percentage: number;
  currentFileName: string;
}

@Injectable({
  providedIn: 'root',
})
export class ImageCompressionService {
  private imageCompress = imageCompression;
  private messageService = inject(NzMessageService);

  async compressSingleFile(
    file: File,
    options: CompressionOptions,
  ): Promise<ProcessedFile> {
    const compressionOptions = this.getCompressionOptions(options);

    try {
      const compressedImage = await this.imageCompress(
        file,
        compressionOptions,
      );
      const preview =
        await this.imageCompress.getDataUrlFromFile(compressedImage);

      return {
        original: file,
        compressed: compressedImage,
        preview: preview,
      };
    } catch (error) {
      console.error('Compression error:', error);
      throw new Error(`Failed to compress ${file.name}: ${error}`);
    }
  }

  async compressBulkFiles(
    files: File[],
    options: CompressionOptions,
    onProgress?: (progress: CompressionProgress) => void,
  ): Promise<ProcessedFile[]> {
    const processedFiles: ProcessedFile[] = [];
    const totalFiles = files.length;

    for (let i = 0; i < totalFiles; i++) {
      const file = files[i];

      if (onProgress) {
        onProgress({
          current: i + 1,
          total: totalFiles,
          percentage: ((i + 1) / totalFiles) * 100,
          currentFileName: file.name,
        });
      }

      try {
        const processedFile = await this.compressSingleFile(file, options);
        processedFiles.push(processedFile);
      } catch (error) {
        console.error(`Failed to compress ${file.name}:`, error);
        this.messageService.error(`Failed to compress ${file.name}`);
      }
    }

    return processedFiles;
  }

  private getCompressionOptions(options: CompressionOptions): Options {
    const compressionOptions: Options = {
      initialQuality: options.compressorQuality / 100,
      alwaysKeepResolution: false,
      useWebWorker: true,
      maxSizeMB: options.maxSize,
    };

    if (
      options.useExactResolution &&
      options.exactWidth > 0 &&
      options.exactHeight > 0
    ) {
      compressionOptions.maxWidthOrHeight = Math.max(
        options.exactWidth,
        options.exactHeight,
      );
    }

    if (options.useExactFileSize && options.exactFileSize > 0) {
      let targetSizeMB = options.exactFileSize;
      switch (options.exactFileSizeUnit) {
        case 'bytes':
          targetSizeMB = options.exactFileSize / (1024 * 1024);
          break;
        case 'KB':
          targetSizeMB = options.exactFileSize / 1024;
          break;
        case 'MB':
          targetSizeMB = options.exactFileSize;
          break;
      }
      compressionOptions.maxSizeMB = targetSizeMB;
    }

    return compressionOptions;
  }

  calculateTotalSize(files: File[]): number {
    return files.reduce((total, file) => total + file.size, 0) / 1024 / 1024;
  }

  downloadFile(fileData: ProcessedFile, filename?: string): void {
    const link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.setAttribute(
      'download',
      filename || `compressed_${fileData.original.name}`,
    );
    link.href = fileData.preview;
    link.click();
  }

  downloadFiles(files: ProcessedFile[]): void {
    files.forEach((fileData) => {
      this.downloadFile(fileData);
    });
  }

  async downloadFilesAsZip(
    files: ProcessedFile[],
    zipFilename?: string,
  ): Promise<void> {
    try {
      const zip = new JSZip();

      files.forEach((fileData) => {
        const filename = this.getCompressedFilename(fileData.original.name);
        zip.file(filename, fileData.compressed);
      });

      const zipBlob = await zip.generateAsync({ type: 'blob' });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipBlob);
      link.download =
        zipFilename ||
        `compressed_images_${new Date().toUTCString().split('T')[0]}.zip`;
      link.click();

      URL.revokeObjectURL(link.href);

      this.messageService.success(
        `Downloaded ${files.length} compressed images as ZIP file`,
      );
    } catch (error) {
      console.error('Error creating ZIP file:', error);
      this.messageService.error('Failed to create ZIP file');
    }
  }

  private getCompressedFilename(originalName: string): string {
    const nameWithoutExt = originalName.replace(/\.[^/.]+$/, '');
    const extension = originalName.split('.').pop()?.toLowerCase();

    let compressedExt = extension;
    if (extension === 'png' || extension === 'jpg' || extension === 'jpeg') {
      compressedExt = 'jpg';
    }

    return `compressed_${nameWithoutExt}.${compressedExt}`;
  }

  createPreviewUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  revokePreviewUrl(url: string): void {
    URL.revokeObjectURL(url);
  }
}
