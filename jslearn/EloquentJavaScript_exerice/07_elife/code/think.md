- 定义世界框架plan【地图】
- 构造函数：Vector【位置】
- 给Vector类添加plus方法【扩大范围】
- 构造函数：Grid(width,height)【单位格大小，以数组形式表示】
- 给Grid添加isInside方法【判断是否在单位格内】
- 给Grid添加get方法【取得参数所在位置的'string'】
- 给Grid添加set方法【设置参数所在位置的'string'】
- 定义directions对象，分为8个方向【critter移动】
- 定义randomElement函数【随机取出方向】
- 定义BouncingCritter函数【critter随机寻找启动方向】
- 给BouncingCritter类添加act(view)方法，返回一个对象{type:'move',direction:this.direction}【返回行动属性和移动方向】
- 定义elementFromChar(legend,ch)函数，legend为世界元素定义，ch为plan数组里的每一项的每一个'string'。【如果'string'为空则返回null,否则如果为'#'调用Wall函数，则element.originChar='#'，如果为'o'调用BouncingCritter函数，则element.originChar='o',element.direction=一个随机的方向,返回了一个{}】
- 构造函数World(map,legend),创建世界大小，Grid参数为plan第一项的长度和plan数组的长度，给World类添加grid，legend属性，遍历plan的每一项的每一个元素，用下标作Vector参数，给每个元素添加x和y属性，再调用elementFromChar方法，给每个元素添加各自的originChar属性，如果为critter还添加了direction属性，并用grid.set()将plan的所有元素，按顺序和相应的定义排列到this.grid中
- 定义函数charFromElement(element)【将null转化为' ',将其它的转化为定义的element.originChar,返回'string' 】
- 给World类添加toString方法【遍历this.grid的每个元素，并用get方法取得每个位置的element，并用charFromElement取得他们对应的'string',返回一个地图版'string'】

# 以上将数组变为了字符串
- 给Grid类添加forEach(f,content)方法和turn方法，f.call(content,value,new Vector(x,y))中，f为下面的.turn方法,content为.turn中的this,value为.turn中的critter,new Vector(x,y)为.turn中的vector，遍历grid的每一个元素，如果不为null则通过act(view)判断是否为critter并且没有记录
