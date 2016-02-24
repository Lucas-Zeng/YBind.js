# ybind.js
A tiny but strong javascript MVVM framework

### demo
#####yb-bind

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>YBind example</title>
  <style>
    div span {color: red;}
    .f12 {font-size: 12px;color: #999;}
  </style>
</head>
<body>
  <section>
    <div>Today is day <span yb-bind="dayCtr.day">1</span>.</div>
    <div>I <span yb-bind="dayCtr.isWorkDay">do</span> need to work.</div>
  </section>
  <br>
  <span class="f12">try 'viewController.dayCtr = 2' in console</span>
  <script src="./dist/YBind.min.js"></script>
  <script>
    var viewController = YBind({
      dayCtr: function ( val ) {
        var isWorkDay  = +val <= 5 && +val >= 1, // assume people work form Monday to Friday
          returnArr  = {
            day: val,
            isWorkDay: isWorkDay ? 'do' : 'don\'t',
          }
        return returnArr;
      } 
    });
    //change view
    viewController.dayCtr = 6;
  </script>
</body>
</html>
```
     
#####yb-show

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>YBind example</title>
  <style>
    div span {color: red;}
    .f12 {font-size: 12px;color: #999;}
  </style>
</head>
<body>
  <section yb-show="dayCtr.isValidDay">
    <div>Today is day <span yb-bind="dayCtr.day">1</span>.</div>
    <div>I <span yb-bind="dayCtr.isWorkDay">do</span> need to work.</div>
  </section>
  <section yb-show="dayCtr.notValidDay">
    <div>Invalid day</div>
  </section>
  <br>
  <span class="f12">try 'viewController.dayCtr = 2.3' in console</span>
  <script src="./dist/YBind.min.js"></script>
  <script>
    var viewController = YBind({
      dayCtr: function ( val ) {
        var isWorkDay  = +val <= 5 && +val >= 1, // assume people work form Monday to Friday
          isValidDay = +val >= 1 && +val <= 7 && ( val + '' ).indexOf( '.' ) === -1, 
          returnArr  = {
            day: val,
            isWorkDay: isWorkDay ? 'do' : 'don\'t',
            isValidDay: isValidDay,
            notValidDay: !isValidDay
          }
        return returnArr;
      } 
    });
    //change view
    viewController.dayCtr = 6;
  </script>
</body>
</html>
```

#####yb-class

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>YBind example</title>
  <style>
    div span {color: red;}
    .f12 {font-size: 12px;color: #999;}
    .none {display: none;}
  </style>
</head>
<body>
  <section yb-class="dayCtr.isValidDay">
    <div>Today is day <span yb-bind="dayCtr.day">1</span>.</div>
    <div>I <span yb-bind="dayCtr.isWorkDay">do</span> need to work.</div>
  </section>
  <section yb-class="dayCtr.notValidDay">
    <div>Invalid day</div>
  </section>
  <br>
  <span class="f12">try 'viewController.dayCtr = 2.3' in console</span>
  <script src="./dist/YBind.min.js"></script>
  <script>
    var viewController = YBind({
      dayCtr: function ( val ) {
        var isWorkDay  = +val <= 5 && +val >= 1, // assume people work form Monday to Friday
          isValidDay = +val >= 1 && +val <= 7 && ( val + '' ).indexOf( '.' ) === -1, 
          returnArr  = {
            day: val,
            isWorkDay: isWorkDay ? 'do' : 'don\'t',
            isValidDay: isValidDay ? '' : 'none',
            notValidDay: isValidDay ? 'none' : '',
          }
        return returnArr;
      } 
    });
    //change view
    viewController.dayCtr = 6;
  </script>
</body>
</html>
```

#####yb-href

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>YBind example</title>
  <style>
    div span {color: red;}
    .f12 {font-size: 12px;color: #999;}
  </style>
</head>
<body>
  <section>
    <a href="javascript:;" yb-href="hrefCtl" yb-bind="hrefCtl"></a>
  </section>
  <br>
  <span class="f12">try 'viewController.hrefCtl = 'https://github.com/Lucas-Zeng/YBind.js';' in console</span>
  <script src="./dist/YBind.min.js"></script>
  <script>
    var viewController = YBind({
      hrefCtl: function ( val ) {
        return val;
      } 
      //hrefCtl: YBind.bind;
      //the above expression also works if hrefCtl return the parameter without futhur logic.
    });
    //change view
    viewController.hrefCtl = 'javascript:;';
  </script>
</body>
</html>
```



#####yb-class, yb-href, yb-each, yb-click, yb-change, yb-input, yb-blur, yb-focus
Please see exapmles.