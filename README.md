# 切水果

用面向对象思维写的canvas小游戏。

## 详情
### 开始菜单

![开始](https://github.com/c-webber/cut-fruit/blob/master/README_pic/0.png)

场景0: 切中间水果进入游戏

### 过场动画

![进入](https://github.com/c-webber/cut-fruit/blob/master/README_pic/1.png)

场景1：字幕闪动

### 水果出现

![水果出现](https://github.com/c-webber/cut-fruit/blob/master/README_pic/2.png)

场景2：水果由下方随机出现，呈抛物线运动

### 切水果

![切水果](https://github.com/c-webber/cut-fruit/blob/master/README_pic/3.png)

刀的特效由鼠标按下后的每次坐标点连接产生，也就是其实是由一个个线段组成；
水果被切到后，水果的图片进行替换，替换为两张并向相反方向移动；

### 炸弹出现

![炸弹出现](https://github.com/c-webber/cut-fruit/blob/master/README_pic/4.png)

切到炸弹后，进入场景3，画面闪白，清空画布

### 游戏结束

![结束](https://github.com/c-webber/cut-fruit/blob/master/README_pic/5.png)

当漏掉3个水果后，直接场景2进入场景4，或者切到炸弹后，从场景2到场景3再到场景4
