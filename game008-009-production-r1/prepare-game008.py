import hashlib, json, pathlib, zipfile
root=pathlib.Path('game008-009-production-r1')
dest=root/'game008'/'inputs'
archive=pathlib.Path(r'C:\projects\App 008\release\package\COILHOP-Game008-standalone-r1.zip')
digest=hashlib.sha256(archive.read_bytes()).hexdigest()
assert digest=='539197c8a2ebd5dfdac9bb5599187276e4ebac61e6446b7dd08412b750e12a29'
assert not (dest/'package').exists(), 'Pinned package already exists'
with zipfile.ZipFile(archive) as z:
    assert z.testzip() is None
    names=z.namelist()
    assert all(not n.startswith('/') and '..' not in pathlib.PurePosixPath(n).parts for n in names)
    selected=[n for n in names if n.startswith('build/') or n in [
        'marketing/cover-wide.png','marketing/cover-square.png','marketing/rights-ledger.md',
        'marketing/clips/frames/preview-first-four-hops.png','marketing/copy.md',
        'source/docs/release/RIGHTS.md','source/docs/release/SAVE_SPEC.md',
        'source/docs/release/AUDIO_ACCESSIBILITY_JA_EN.md','source/docs/release/KNOWN_LIMITS.md',
        'source/tests/coilhop-full.test.mjs','source/tests/coilhop-lifecycle.test.mjs','source/tests/save.test.mjs']]
    for n in selected:
        p=dest/'package'/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(z.read(n))
    m=json.loads(z.read('build/manifest.json'))
    assert m['baseline']=='a348e24a75885aafeb16ec5d4628e43105e44113bc07af7964b73dd4af3c2a53'
    for e in m['files']:
        b=z.read('build/'+e['path']);assert len(b)==e['bytes'];assert hashlib.sha256(b).hexdigest()==e['sha256']
    assert hashlib.sha256(json.dumps(m['files'],separators=(',',':'),ensure_ascii=False).encode()).hexdigest()==m['baseline']
    # Existing source tests use public/ paths; maintain their exact module bytes.
    for n in [n for n in names if n.startswith(('source/public/coilhop/','source/public/shared/'))]:
        p=dest/'package'/n;p.parent.mkdir(parents=True,exist_ok=True);p.write_bytes(z.read(n))
    (dest/'package/source/qa').mkdir(parents=True,exist_ok=True)
files=[]
for p in sorted((dest/'package').rglob('*')):
    if p.is_file():
        b=p.read_bytes();files.append({'file':p.relative_to(dest).as_posix(),'bytes':len(b),'sha256':hashlib.sha256(b).hexdigest()})
receipt={'archive':str(archive),'archiveSha256':digest,'archiveCRC':'PASS','acceptedRuntimeBaseline':m['baseline'],'files':files,'standaloneRuntimeVerified':len(m['files']),'archiveCopied':False,'debugExcludedFromProduction':'build/shared/capture.js; capture import/call only'}
(dest/'PACKAGE_MANIFEST.json').write_text(json.dumps(receipt,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')
print(json.dumps({'status':'PASS','archiveCRC':'PASS','acceptedRuntimeBaseline':m['baseline'],'pinnedFiles':len(files)}))
