import { useEffect } from 'react';
import { pairwise } from 'rxjs/operators';
import { generateOp } from './generateOp';

export const useOps = (text$, op$) => {
  useEffect(
    () =>
      text$.pipe(pairwise()).subscribe(([oldText, newText]) => {
        op$.next(generateOp(oldText, newText));
      }).unsubscribe,
    [text$, op$]
  );
};
