function Calculator() {
    let methods = {
      "-": (number1,  number2) => number1 - number2,
      "+": (number1,  number2) => number1 + number2
    };
    this.calculate = function(str) {
  
      let split = str.split(' '),
        number1 =+ split[0],
        operetor = split[1],
        number2 =+ split[2]
  
      if (!methods[operetor] || isNaN(number1) || isNaN(number2)) {
        return NaN;
      }
  
      return methods[operetor](number1, number2);
    }
  
    this.addOperator = function(name, func) {
      methods[name] = func;
      
    };
  }
let culc= new Calculator();
alert(culc.calculate('3 + 7'))
culc.addOperator("*", (number1,  number2) => number1 * number2);
alert(culc.calculate('3 * 7'))