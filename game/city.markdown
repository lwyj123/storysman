---
init: !!js/function |
  function() {
    window.city = window.city + 1 || 1;
  }
state:
  cityCounter: !!js/function |
    function() {
      return window.city + ' time' + (window.city > 1 ? 's' : '');
    }
style: |
  body, footer {
    background: #222;
    color: #eee;
  }
---

A big and crowded city.

You have visited the city {{cityCounter}}.

![city](http://static1.squarespace.com/static/528737c1e4b0f296720a483e/54e8d963e4b0a0f14f947640/54e8d966e4b0a3ebc2bf9154/1424546152959/andy-rementer.jpg)

Go [back](index).