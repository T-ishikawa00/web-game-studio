# Local Preview — Windows PowerShell

## 9月27日5作品版

Node.js 22.12以上とGitを使用します。npm依存、Cloudflare account、広告、Analytics、認証情報は不要です。固定commitのGit objectがsource checkoutに存在することが条件です。

```powershell
node --version
git --version
node scripts/release-preview/restore.mjs --source-repo . --dest .tmp/preview-20260927
if ($LASTEXITCODE -ne 0) { throw 'Restore failed. Do not serve partial output.' }
node .tmp/preview-20260927/serve.mjs --root .tmp/preview-20260927 --port 4387
```

| 画面 | URL |
| --- | --- |
| JA Portal | [127.0.0.1:4387/ja/](http://127.0.0.1:4387/ja/) |
| EN Portal | [127.0.0.1:4387/en/](http://127.0.0.1:4387/en/) |
| JA一覧 | [127.0.0.1:4387/ja/games/](http://127.0.0.1:4387/ja/games/) |
| EN一覧 | [127.0.0.1:4387/en/games/](http://127.0.0.1:4387/en/games/) |

出力先はsourceの`.tmp/`配下の新規pathに限定します。既存folderとjunction / symlinkを拒否し、原source、index、HEADは変更しません。失敗時の部分folderは自動削除せず残します。再試行は別の新規名を使います。

別端末でHTTPとbytesを検証します。

```powershell
node .tmp/preview-20260927/verify.mjs --root .tmp/preview-20260927 --base http://127.0.0.1:4387
node --test scripts/release-preview/server.test.mjs
```

停止は起動端末で`Ctrl+C`、再起動は同じserve command・同じportです。port使用中は既存processを無断停止せず、空きportへ変更しverifyのbaseも揃えます。portを変えると保存originも変わります。常駐service、自動起動、LAN、TLS、tunnel、Firewall変更は行いません。

## 保護と再現限界

102ファイルのsize / SHA256 / Git blob、固定tree / manifest blobを検証します。serverは検証済みmanifestのfileだけを読み、`127.0.0.1`で待受けます。repo全体、`.git`、evidence、`_headers`は配信しません。GET / HEADのみ許可し、Hostとcross-site requestを検査します。

artifactの保存bytesは変更しません。応答HTMLだけにlocal guardを追加し、CSPで外部script / image / font / connect / forms等を制限します。guardは通常anchor clickと`window.open`を制御します。scriptの任意navigationやbrowser拡張を全面隔離する仕組みではありません。今回のbrowser QAにはoff-origin requestの追加遮断を適用しています。

旧Growth、Cloudflare、広告fill、CMP、外部認証、DB、旧本番saveは再現しません。実機iOS / Android、全編クリア、音のHuman試聴は別検証です。当時の運営中を前提とする文面・copyrightは歴史的snapshotです。

## Object不足と別checkout

不足時はfetchやログインを始めず停止します。既存rootでpull、reset、checkout、mergeをしないでください。新規取得時は正当なアクセス権でPrivate repositoryを新規隔離先へ通常cloneし、対象commitを確認します。認証情報を引数・ファイル・chatへ書きません。

`--github`は5作品版専用のGET fallbackです。既存GitHub CLIの認証が必要で、`--release final --github`は明示的に拒否します。このWindows環境には`gh`がないためfallbackはNOT TESTED。local Git object復元を検証済み経路とします。

## 最終8作品の保存版

固定点はbb243407a760a117dcf892bfab26c5cdb18c20ad、artifactはtinlumo-visual-remaster-final-integration-r1/builds/candidate/です。旧manifestのPENDING状態は当時の履歴として保持し、現在の公開承認へ昇格させません。

**final modeは`final-git-manifest.json`を使って固定commitのGit保存bytesを復元します。当時の配信bytesとの完全一致は成立していません。** 元の配信候補manifestとは33 text filesに差異があり、旧manifestは復元先の`evidence/distribution.recorded-historical.json`へ別保存します。今回のderived manifestはGit保全用で、歴史的配信実績の置換ではありません。

```powershell
node scripts/release-preview/restore.mjs --release final --source-repo . --dest .tmp/preview-final-eight
if ($LASTEXITCODE -ne 0) { throw 'Final preservation restore failed.' }
node .tmp/preview-final-eight/serve.mjs --root .tmp/preview-final-eight --port 4388
```

5作品の歴史的HTTP配信照合と、最終8作品のGit保全bytesの照合は別の結果として扱います。

## 公開準備R1の履歴対応

上記の当時のSHAとmanifestは歴史的証拠です。公開候補では履歴を一般化したため、復元ツールの実行用pinを次の対応に変更しました。artifact tree・manifest blob・復元されるゲームbytesは変更していません。`final-git-manifest.json`内のcommitは元の歴史的commitを指します。

| 元のcommit | 公開候補内の対応commit |
| --- | --- |
| `d8ca30c36d94f1a9272267497c993a12dd0e9f25` | `be4989a8f232024c1a351db35dc7db42bae3e5c5` |
| `bb243407a760a117dcf892bfab26c5cdb18c20ad` | `4969bd5f5de0e292641b33f846f59d901bf233df` |
| `ab91ae39c767b5cb0ff2f8ce10a10e9bab93dfad` | `9a5c2e9e5f724dfd5a1b76fdd93d732a73a13b36` |

この対応はローカル候補専用です。候補履歴がGitHubへ反映される前の`--github`経路は使用しません。権利HOLDと公開承認PENDINGは維持します。
