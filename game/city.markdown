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

一个山水很好的城市

你已经来过 {{cityCounter}} 次了.

![city](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508507654231&di=98085002b7b084f102463a912124cef9&imgtype=0&src=http%3A%2F%2Fimg.yzcdn.cn%2Fupload_files%2F2015%2F07%2F16%2FFjhuXJ-2r0lHYnBUfC41neK58wtZ.jpg%2521580x580.jpg)

Go [back](index).