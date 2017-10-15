---
style: |
  body, footer {
    background: #44e544;
    color: #fff;
  }
  a {
    color: #227222;
  }
---

You're in the forest.

![forest](http://payload.cargocollective.com/1/0/20726/438495/forestmist21.jpg)

{{^cave}}
Go [back](index) or [explore the cave](cave).
{{/cave}}

{{#cave}}
{{#treasure}}
You feel guilty because you stole a treasure, but you're rich. You're ready to start a new life in the [city](city).
{{/treasure}}
{{^treasure}}
You have nothing, but yourself and the nature. You're happy.
{{/treasure}}
{{/cave}}