import fs from 'node:fs';
import assert from 'node:assert/strict';
import {sha,unchanged} from '../game008-009-production-r1/common.mjs';
export function preserved(records) {
 const file='docs/games/PRODUCTION_CURRENT.md',before='manual-play-ads-r1/internal/current-before.md';
 unchanged(records.filter(r=>r.file!==file));
 const record=records.find(r=>r.file===file),current=fs.readFileSync(file);
 if(sha(current)===record.sha256)return;
 assert(fs.existsSync(before),'Current handoff baseline missing');
 const original=fs.readFileSync(before);assert.equal(sha(original),record.sha256);
 assert(current.subarray(current.length-original.length).equals(original),'Existing CURRENT body changed');
}
