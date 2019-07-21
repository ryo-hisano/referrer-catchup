# About ReferrerCatchUp

A JavaScript plug-in that appends GET parameters attached to the current page URL only to links that specify a specific URL destination.
It is used to measure the effect at the time of transition from a certain advertisement to cart.

# How to use

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

## Extended function

| Options         | Contents                                                                                       | Default value | Example                                      |
| --------------- | ---------------------------------------------------------------------------------------------- | ------------- | -------------------------------------------- |
| `allow_domains` | Domain Allow List. Change only the href that has the specified domain as the link destination. | None          | ['google.co.jp']                             |
| `ignore_lists`  | Parameter ban list. Specify a parameter that you do not want to add to href.                   | ['\*']（All） | ['utm_medium', 'utm_source', 'utm_campaign'] |