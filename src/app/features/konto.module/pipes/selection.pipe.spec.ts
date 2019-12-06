import {SelectionPipe} from 'src/app/features/konto.module/pipes/selection.pipe';
import {PipeTransform} from '@angular/core';

describe('SelectionPipe', () => {
  it('create an instance', () => {
    const pipe: PipeTransform = new SelectionPipe();
    expect(pipe).toBeTruthy();
  });
});
