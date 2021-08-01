import { Component, Host, Input, OnInit, Optional } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-inline-form',
  templateUrl: './inline-form.component.html',
  styleUrls: ['./inline-form.component.scss']
})
export class InlineFormComponent implements OnInit {

  /** Overrides the comment and provides a reset value when changes are cancelled. */
  @Input()
  get value(): string { return this._value; }
  set value(x: string) {
    this.name = this._value = x;
  }
  private _value = '';

  /** Form model for the input. */
  name = '';

  constructor(@Optional() @Host() public popover: SatPopover) { }

  ngOnInit() {
    // subscribe to cancellations and reset form value
    if (this.popover) {
      this.popover.closed.pipe(filter(val => val == null))
        .subscribe(() => this.name = this.value || '');
    }
  }

  onSubmit() {
    if (this.popover) {
      this.popover.close(this.name);
    }
  }

  onCancel() {
    if (this.popover) {
      this.popover.close();
    }
  }

}
