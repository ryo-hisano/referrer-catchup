# ReferrerCatchUp とは

現在ページ URL についた GET パラメータを、特定の URL 飛び先が指定されたリンクにのみ付加する JavaScript プラグイン。
ある広告経由からカートへの遷移時の効果計測のために利用。

# 使い方

```html
<script src="https://cdn.jsdelivr.net/gh/ryo-hisano/referrer-catchup@1.0.0/ref.js" defer></script>
<script>
  (function() {
    var ref = new ReferrerCatchUp.Initialize({
      allow_domains: ['google.co.jp'],
      ignore_lists: ['utm_medium', 'utm_source', 'utm_campaign']
    });
  })();
</script>
```

## 拡張機能

| オプション      | 内容                                                                             | デフォルト値   | 例                                           |
| --------------- | -------------------------------------------------------------------------------- | -------------- | -------------------------------------------- |
| `allow_domains` | ドメイン許可リスト。指定されたドメインをリンク先として持つ href のみ変更します。 | 無し           | ['google.co.jp']                             |
| `ignore_lists`  | パラメータ禁止リスト。href に付加したくないパラメータを指定します。              | ['\*']（全て） | ['utm_medium', 'utm_source', 'utm_campaign'] |
