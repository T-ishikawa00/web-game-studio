# Save contract

Key: rimbloom.full-r1.local-records.v1。ブラウザorigin単位のlocalStorage。pathnameごとの隔離ではない。同じoriginにこのゲームを複数mountすると同じrecordになる。4187のHuman/QA記録をProductionへ自動移行しない。

JSON例: {"version":1,"best":15740,"bestChain":12,"lastScore":15740,"runs":1}。個人情報・user ID・time・seed・unlock・課金データなし。

復元時は400文字未満、version=1、各値safe integerかつ非負。best<=1e9、lastScore<=best、bestChain<=26、runs<=1e6。無効/壊れた/範囲超過はblank recordへfallback。例外をGameplayへ伝播しない。保存拒否/quota例外でもmemory内のresultを保持。

Run終了時のみresult(score,chain)でbest/bestChain/lastScore/runs更新。BestとbestChainは個別max、runsは1e6上限。first result前のPreviousは—、実際の前回0点は0。same seed / new seed retryでrecordは共通。restartがRunを勝手にfinishしない。

Records.reset()はこの1keyだけremoveItemし、localStorage.clear()を呼ばない。reset UIはQA branchのhidden panel。公開版でdebug操作を出さない。

Portal既存save、Consent C、他ゲームkeysを読まず、変更しない。統合時はnamespace衝突を確認する。Portal側がstorage consent/ゲスト/iframe policyを持つ場合、別統合candidateで既存policyへ接続し、拒否時fallbackを確認。現在のHuman AcceptanceはPortal save/Consent適合を証明しない。

セーブは端末ローカル・tamper可能。公平なオンライン順位や改ざん防止を主張しない。匿名scoreのbackend/leaderboardは含まない。source anchor: src/records.mjs。
