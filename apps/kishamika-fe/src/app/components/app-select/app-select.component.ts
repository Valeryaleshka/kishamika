import {
  Component,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { ISelect } from './app-select.types';

@Component({
  selector: 'app-select',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './app-select.component.html',
  styleUrl: './app-select.component.less',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppSelectComponent),
      multi: true,
    },
  ],
})
export class AppSelectComponent<T = string | number>
  implements ControlValueAccessor
{
  @HostBinding('class.ghost') @Input() ghost: boolean = false;
  @Input() options: ISelect<string>[] = [];
  @Input() disabled: boolean = false;
  @Input() value: T | null = null;

  @Output() valueChange = new EventEmitter<T | null>();

  private onChangeCallback: (_: any) => void = () => {};
  private onTouchedCallback: () => void = () => {};

  trackByFn(index: number, item: ISelect<string>): string {
    return `${item.value}-${item.title}-${index}`;
  }

  onChange(value: T | null): void {
    this.value = value;
    this.valueChange.emit(value);
    this.onChangeCallback(value);
    this.onTouchedCallback();
  }

  writeValue(value: T | null): void {
    this.value = value;
  }

  registerOnChange(_: never): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(_: never): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(_: boolean): void {
    throw new Error('Method not implemented.');
  }
}
