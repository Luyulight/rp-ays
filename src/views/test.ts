interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = {color: "white", area: 100};
  if (config.color) {
    // Error: Property 'clor' does not exist on type 'SquareConfig'
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({color: "black"});

//
interface Shape {
    color: string;
    [propName: string]:any
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
let a: Shape = {color:'ytellow',sada:'sdad'}

//

class Control {
  private state: any;
}

interface SelectableControl extends Control {
  select(): void;
}

class Button extends Control implements SelectableControl {
  select() { }
}

class TextBox extends Control {
  select() { }
}

// 错误：“Image”类型缺少“state”属性。
// class Image implements SelectableControl {
//   select() { }
// }

class Location {

}


//
class Animal {
  name: string;
  constructor(theName: string) { this.name = theName; }
  move(distanceInMeters: number = 0) {
      console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 5) {
      console.log("Slithering...");
      super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor(name: string) { super(name); }
  move(distanceInMeters = 45) {
      console.log("Galloping...");
      super.move(distanceInMeters);
  }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino");

sam.move();
tom.move(34);


// 
let passcode = "secret passcode";

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }

    set fullName(newName: string) {
        if (passcode && passcode == "secret passcode") {
            this._fullName = newName;
        }
        else {
            console.log("Error: Unauthorized update of employee!");
        }
    }
}


// class Greeter {
//   static standardGreeting = "Hello, there";
//   greeting: string;
//   greet() {
//       if (this.greeting) {
//           return "Hello, " + this.greeting;
//       }
//       else {
//           return Greeter.standardGreeting;
//       }
//   }
// }
// 
// let greeter1: Greeter;
// greeter1 = new Greeter();
// console.log(greeter1.greet());

// let greeterMaker: typeof Greeter = Greeter;
// greeterMaker.standardGreeting = "Hey there!";

// let greeter2: Greeter = new greeterMaker();
// console.log(greeter2.greet());

// 
// let myAdd : (x:number,y:number) => number = function(x:number ,y:number):number{
//   return x+y
// }
// myAdd(1,2)

// 
interface Lengthwise {
  length:number
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length)
  return arg
}



enum E {
  X, Y, Z
}

function f(obj: { X: number }) {
  return obj.X;
}

// Works, since 'E' has a property named 'X' which is a number.



function testMain() {
  console.log('im in main test')
  // console.log(mySquare)
  // console.log(square)
  // console.log(a)
  // let employee = new Employee();
  // employee.fullName = "Bob Smith";
  // if (employee.fullName) {
  //     alert(employee.fullName);
  // }
  console.log(f(E));
  console.log(f(E));
  console.log(f(E));
  console.log(f(E));
}

export default testMain