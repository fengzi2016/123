
/*世界原型*/
var plan =
    ["############################",
        "# # # o ##",
        "# #",
        "# ##### #",
        "## # # ## #",
        "### ## # #",
        "# ### # #",
        "# #### #",
        "# ## o #",
        "# o # o ### #",
        "# # #",
        "############################"];
/*定义坐标，给Vector这个类添加一个plus属性*/
function Vector(x, y) {
    this.x = x;
    this.y = y;
}
Vector.prototype.plus = function (other) {
    return new Vector(this.x + other.x, this.y + other.y);
};


/*定义方向数组*/
// var grid = [["top left", "top middle", "top right"],
// ["bottom left", "bottom middle", "bottom right"]];
var grid = ["top left", "top middle", "top right",
    "bottom left", "bottom middle", "bottom right"];


/*给Grid单元格这个对象定义属性和方法*/
function Grid(width, height) {
    this.space = new Array(width * height);
    this.width = width;
    this.height = height;
}
Grid.prototype.isInside = function (vector) {
    return vector.x >= 0 && vector.x < this.width &&
        vector.y >= 0 && vector.y < this.height;
};
Grid.prototype.get = function (vector) {
    return this.space[vector.x + this.width * vector.y];
};
Grid.prototype.set = function (vector, value) {
    this.space[vector.x + this.width * vector.y] = value;
};
/*定义方向*/
var directions = {
    "n": new Vector(0, -1),
    "ne": new Vector(1, -1),
    "e": new Vector(1, 0),
    "se": new Vector(1, 1),
    "s": new Vector(0, 1),
    "sw": new Vector(-1, 1),
    "w": new Vector(-1, 0),
    "nw": new Vector(-1, -1)
};
/*随机方向开始，遇到障碍物返回障碍物所在方向，没用则返回''*/
function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
var directionNames = "n ne e se s sw w nw".split(" ");
function BouncingCritter() {
    this.direction = randomElement(directionNames);
};
BouncingCritter.prototype.act = function (view) {
    if (view.look(this.direction) != " ")
        this.direction = view.find(" ") || "s";
    return { type: "move", direction: this.direction };
};
/*初始化【定义】Plan里的所有字符 */
function elementFromChar(legend, ch) {
    if (ch == " ")
        return null;
    var element = new legend[ch]();
    element.originChar = ch;
    return element;
}
function World(map, legend) {
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;
    map.forEach(function (line, y) {
        for (var x = 0; x < line.length; x++)
            grid.set(new Vector(x, y),
                elementFromChar(legend, line[x]));
    });
}
/*接收构造世界的元素，并转化为字符串*/
function charFromElement(element) {
    if (element == null)
        return " ";
    else
        return element.originChar;
}
World.prototype.toString = function () {
    var output = "";
    for (var y = 0; y < this.grid.height; y++) {
        for (var x = 0; x < this.grid.width; x++) {
            var element = this.grid.get(new Vector(x, y));
            output += charFromElement(element);
        }
        output += "\n";
    }
    return output;
};
function Wall() { };
/*确定所有在grid实例的元素都不是null或者undefined*/
Grid.prototype.forEach = function (f, context) {
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            var value = this.space[x + y * this.width];
            if (value != null)
                f.call(context, value, new Vector(x, y));
        }
    }
};
/*定义letAct方法*/
World.prototype.letAct = function (critter, vector) {
    var action = critter.act(new View(this, vector));
    if (action && action.type == "move") {
        var dest = this.checkDestination(action, vector);
        if (dest && this.grid.get(dest) == null) {
            this.grid.set(vector, null);
            this.grid.set(dest, critter);
        }
    }
};
World.prototype.checkDestination = function (action, vector) {
    if (directions.hasOwnProperty(action.direction)) {
        var dest = vector.plus(directions[action.direction]);
        if (this.grid.isInside(dest))
            return dest;
    }
};
/*防止走重复的路 */
World.prototype.turn = function () {
    var acted = [];
    this.grid.forEach(function (critter, vector) {
        if (critter.act && acted.indexOf(critter) == -1) {
            acted.push(critter);
            this.letAct(critter, vector);
        }
    }, this);
};
/*定义View对象*/
function View(world, vector) {
    this.world = world;
    this.vector = vector;
}
View.prototype.look = function (dir) {
    var target = this.vector.plus(directions[dir]);
    if (this.world.grid.isInside(target))
        return charFromElement(this.world.grid.get(target));
    else
        return "#";
};
View.prototype.findAll = function (ch) {
    var found = [];
    for (var dir in directions)
        if (this.look(dir) == ch)
            found.push(dir);
    return found;
};
View.prototype.find = function (ch) {
    var found = this.findAll(ch);
    if (found.length == 0) return null;
    return randomElement(found);
};
/*定义改变移动方向的方法*/
function dirPlus(dir, n) {
    var index = directionNames.indexOf(dir);
    return directionNames[(index + n + 8) % 8];
}
function WallFollower() {
    this.dir = "s";
}
WallFollower.prototype.act = function (view) {
    var start = this.dir;
    if (view.look(dirPlus(this.dir, -3)) != " ")
        start = this.dir = dirPlus(this.dir, -2);
    while (view.look(this.dir) != " ") {
        this.dir = dirPlus(this.dir, 1);
        if (this.dir == start) break;
    }
    return { type: "move", direction: this.dir };
};
/*创造一个新的世界，不同规则，定义critter死亡*/
function LifelikeWorld(map, legend) {
    World.call(this, map, legend);
}
LifelikeWorld.prototype = Object.create(World.prototype);
var actionTypes = Object.create(null);
LifelikeWorld.prototype.letAct = function (critter, vector) {
    var action = critter.act(new View(this, vector));
    var handled = action &&
        action.type in actionTypes &&
        actionTypes[action.type].call(this, critter,
            vector, action);
    if (!handled) {
        critter.energy -= 0.2;
        if (critter.energy <= 0)
            this.grid.set(vector, null);
    }
};
/*定义critter生长*/
actionTypes.grow = function (critter) {
    critter.energy += 0.5;
    return true;
};
/*定义进食方法 */
actionTypes.eat = function (critter, vector, action) {
    var dest = this.checkDestination(action, vector);
    var atDest = dest != null && this.grid.get(dest);
    if (!atDest || atDest.energy == null)
        return false;
    critter.energy += atDest.energy;
    this.grid.set(dest, null);
    return true;
};
/*定义繁殖*/
actionTypes.reproduce = function (critter, vector, action) {
    var baby = elementFromChar(this.legend,
        critter.originChar);
    var dest = this.checkDestination(action, vector);
    if (dest == null ||
        critter.energy <= 2 * baby.energy ||
        this.grid.get(dest) != null)
        return false;
    critter.energy -= 2 * baby.energy;
    this.grid.set(dest, baby);
    return true;
};
/*初始化植物以及定义繁殖规则*/
function Plant() {
    this.energy = 3 + Math.random() * 4;
}
Plant.prototype.act = function (context) {
    if (this.energy > 15) {
        var space = context.find(" ");
        if (space)
            return { type: "reproduce", direction: space };
    }
    if (this.energy < 20)
        return { type: "grow" };
};/*当能量大于15时，在周围寻找space生成新的植物，如果没有space，能量到达20停止生长*/
/*定义植物生长规则*/
function PlantEater() {
    this.energy = 20;
    }
    PlantEater.prototype.act = function(context) {
    var space = context.find(" ");
    if (this.energy > 60 && space)
    return {type: "reproduce", direction: space};
    var plant = context.find("*");
    if (plant)
    return {type: "eat", direction: plant};
    if (space)
        return {type: "move", direction: space};
        };

        
/*新世界*/
var valley = new LifelikeWorld(
    ["############################",
    "##### ######",
    "## *** **##",
    "# *##** ** O *##",
    "# *** O ##** *#",
    "# O ##*** #",
    "# ##** #",
    "# O #* #",
    "#* #** O #",
    "#*** ##** O **#",
    "##**** ###*** *###",
    "############################"],
    {"#": Wall,
    "O": PlantEater,
    "*": Plant}
    );
    console.log(valley.toString())