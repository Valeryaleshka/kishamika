import {
  Directive, ElementRef,
  EventEmitter,
  HostListener, inject,
  Output, Renderer2
} from '@angular/core';

@Directive({
  selector: '[droparea]',
})
export class DropareaDirective {
  renderer = inject(Renderer2);
  element = inject(ElementRef);
  dragover = false

  @Output() dropped = new EventEmitter<FileList>();

  @HostListener('drop', ['$event'])
  onDrop($event: DragEvent) {
    $event.preventDefault();
    console.log($event);
    this.dropped.emit($event.dataTransfer?.files);
  }

  @HostListener('dragover', ['$event'])
  onDragOver($event: DragEvent) {
    $event.preventDefault();
    if(!this.dragover) {
      this.dragover = true;
      this.renderer.setStyle(this.element.nativeElement, 'opacity', 0.5);
    }
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave($event: DragEvent) {
    $event.preventDefault();
    this.renderer.setStyle(this.element.nativeElement, 'opacity', 1);
    this.dragover = false;
  }
}
