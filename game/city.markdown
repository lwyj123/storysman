---
init: !!js/function |
  function(state, global) {
    state.city = state.city + 1 || 1;
  }
style: |
  body, footer {
    background: #222;
    color: #eee;
  }
method: 
  visit: !!js/function |
    function(state, global) {
      state.city++;
    }
---

一个山水很好的城市

你已经来过 {{city}} 次了.
[徘徊](@visit)

![city](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508507654231&di=98085002b7b084f102463a912124cef9&imgtype=0&src=http%3A%2F%2Fimg.yzcdn.cn%2Fupload_files%2F2015%2F07%2F16%2FFjhuXJ-2r0lHYnBUfC41neK58wtZ.jpg%2521580x580.jpg)

Go [back](index).