# Incident Response R1

## When a scanner or reviewer finds a credential candidate

1. Stop commit/push/release of the affected material. Preserve existing implementation and evidence; do not delete files, clean history or retry an external operation automatically.
2. Report only **file, credential type, action required / Human judgment pending**. Never include values, source snippets, screenshots with values, hashes of low-entropy passwords, or credential-bearing URLs.
3. Human decides whether it is real, an upstream public sample, or unresolved. Do not validate a candidate by calling its service. For a proposed false positive, establish provenance without printing the value and obtain Human approval for a narrowly scoped exception; never broadly exclude source/dependencies just to pass.
4. If real, determine exposure locally (untracked, staged, committed, remotely shared, browser output). A private repository is still an exposure surface. Obtain explicit authorization before provider operations, access changes, external notifications or history rewriting.
5. Human/provider-authorized responder revokes or rotates the credential first and checks authorized access/audit records. Removing a Git file does not invalidate a credential. Preserve a private, minimal record of scope and actions without the value.
6. Remove the secret from future source/builds and stage a safe replacement, within the authorized repair scope. If already committed/shared, agree a history and clone remediation plan; never force-push or rewrite others' work without approval.
7. Re-run full project, index and history scans as applicable, existing QA, and any required provider checks after authorized repair. Resume only after Human disposition and technical gates. Record owner, dates, affected systems and sanitized outcome in the register.

## R1 operating limits

Incident contact / secure intake: NOT YET CREATED; use the existing Human task to report sanitized metadata. Do not send external messages, issue public advisories, incur costs, rotate real credentials or deploy solely on this document's authority. Business/legal notification obligations and transfer terms require case-specific Human/professional decisions.
