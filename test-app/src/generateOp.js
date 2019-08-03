import jsondiff from 'json0-ot-diff';
import diffMatchPatch from 'diff-match-patch';

export const generateOp = (oldText, newText) =>
  jsondiff(oldText, newText, diffMatchPatch);
