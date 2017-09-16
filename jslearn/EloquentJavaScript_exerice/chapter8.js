function Vector(x, y) {
    this.x = x;
    this.y = y;
  }
  Vector.prototype.plus = function(other) {
    return new Vector(this.x + other.x, this.y + other.y);
  };
  
  var context = null;
  
  function withContext(newContext, body) {
    var oldContext = context;
    context = newContext;
    var result = body();
    context = oldContext;
    return result;
  }
  
  function withContext(newContext, body) {
    var oldContext = context;
    context = newContext;
    try {
      return body();
    } finally {
      context = oldContext;
    }
  }
  
  function InputError(message) {
    this.message = message;
    this.stack = (new Error()).stack;
  }
  InputError.prototype = Object.create(Error.prototype);
  InputError.prototype.name = "InputError";
  
  function promptDirection(question) {
    var result = prompt(question, "");
    if (result.toLowerCase() == "left") return "L";
    if (result.toLowerCase() == "right") return "R";
    throw new InputError("Invalid direction: " + result);
  }
  

  function MultiplicatorUnitFailure() {}
  
  function primitiveMultiply(a, b) {
    if (Math.random() < 0.5)
      return a * b;
    else
      throw new MultiplicatorUnitFailure();
  }
  function reliableMultiply(a, b) {
      let result;
       try{
        result= primitiveMultiply(a,b);
       }catch(error){
        result= primitiveMultiply(a,b);
       } 
      return result;
  }
  console.log(reliableMultiply(8,8))



    var box = {
    locked: true,
    unlock: function() { this.locked = false; },
    lock: function() { this.locked = true;  },
    _content: [],
    get content() {
      if (this.locked) throw new Error("Locked!");
      return this._content;
    }
  };
  function withBoxUnlocked(body) {
   let lockStauts=box.locked;
   if(lockStauts===false){
      return body();
   }else{
    box.unlock();
    try{
     return body();
    } finally {
      box.lock();
    } 
   }
  }
  withBoxUnlocked(function() {
    box.content.push("gold piece");
  });
  
  try {
    withBoxUnlocked(function() {
      throw new Error("Pirates on the horizon! Abort!");
    });
  } catch (e) {
    console.log("Error raised:", e);
  }
  console.log(box.locked);