#varFn-DatePicker

小组作业，加强对日期对象的学习使用。

# How to use
引入datePicker的css样式文件，以及js文件，这是基于jquery写的。
```
<link rel="stylesheet" type="text/css" href="css/style.css">
<script type="text/javascript" src="js/jquery-1.12.3.min.js"></script>
<script type="text/javascript" src="js/index.js"></script>
```

在文档中需要使用的表单上添加`data-node="datePicker"`属性，对输入的值需要格式化的，再添加`data-dateformat="Y年m月d日"`属性。
Y为全年，大写的M，D，H,I,S对应两位数的月，日，时，分，秒，小写的则不补零。

e.g.
```
<input type="text" data-node="datePicker" data-dateformat="Y/m/d">
<input type="text" data-node="datePicker" data-dateformat="Y年m月d日">
```
