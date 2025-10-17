import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSrc',
})
export class AppImageSrcPipe implements PipeTransform {
  transform(value: File): string {
    return URL.createObjectURL(value);
  }
}

@Pipe({
  name: 'fileSize',
})
export class AppImageSizePipe implements PipeTransform {
  transform(value: File): number {
    return value.size / 1024 / 1024;
  }
}
