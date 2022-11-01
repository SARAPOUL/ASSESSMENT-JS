const prompt = require('prompt-sync')();
const clear = require('clear-screen');

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';


// const defaultField = [
//     [pathCharacter, hole, fieldCharacter],
//     [fieldCharacter, hole, fieldCharacter],
//     [fieldCharacter, hat, fieldCharacter],
//     [fieldCharacter, hole, fieldCharacter],
// ]

// const colArr = Array(rowWidth).fill(fieldCharacter)
// const field = Array(rowWidth).fill(colArr)
class Field {
    constructor(field = [[]]) {
        this.field = field
        this.start = {
            x: 0,
            y: 0
        };
        this.final = {
            x: 0,
            y: 0
        };
        this.locationX = 0;
        this.locationY = 0;
        this.gameStatue= true;
        // this.field[0][0]=pathCharacter;
    }

    print() {
        // console.log(this.field);
        clear();
        for (let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(''));
        }

    }
    renPos(outmap = { x: 0, y: 0 }) {
        const position = {
            x: 0,
            y: 0
        }
        do {
            position.x = Math.floor(Math.random() * this.field[0].length);
            position.y = Math.floor(Math.random() * this.field.length);
        } while (position.x === outmap.x && position.y === outmap.y);
        return position;
    }

    setStart() {
        this.start = this.renPos();
        this.locationX = this.start.x;
        this.locationY = this.start.y;
        this.field[this.start.y][this.start.x] = pathCharacter;
    }

    setFinal() {
        this.final = this.renPos(this.start)
        this.field[this.final.y][this.final.x] = hat;
      }

    playgame() {
        let key = prompt(`w:Top; a:Left; s:Down; d:Right ::`).toLowerCase()
        switch (key) {
            case "w":
                console.log(`Go top`);
                this.locationY -= 1;
                break;
            case "a":
                console.log(`Go left`);
                this.locationX -= 1;
                break;
            case "s":
                console.log(`Go down`);
                this.locationY += 1;
                break;
            case "d":
                console.log(`Go right`);
                this.locationX += 1;
                break;
            case "end":
                this.gameStatue = false;
                break;
            default:
                this.playgame()
                console.log(`Please ENTER KEY`);
        }

    }

    runGame(hard = false) {
        this.setStart();
        this.setFinal();
        this.print();

        
        while (this.gameStatue) {
            this.print();
            this.playgame();
            if (!this.setoutsite()) {
                console.log('Outsite');
                this.gameStatue = false;
                break;
              } else if (this.setHole()) {
                console.log('BYE');
                this.gameStatue = false;
                break;
              } else if (this.setHat()) {
                console.log('Win');
                this.gameStatue = false;
                break;
              }

        this.field[this.locationY][this.locationX] = pathCharacter;
        }      
    }

    setoutsite() {
        return (
          this.locationY >= 0 &&
          this.locationX >= 0 &&
          this.locationY < this.field.length &&
          this.locationX < this.field[0].length
        );
      }

      setHat() {
        return this.field[this.locationY][this.locationX] === hat;
      }
      
      setHole() {
        return this.field[this.locationY][this.locationX] === hole;
      }
      

      setoutsite() {
        return (
          this.locationY >= 0 &&
          this.locationX >= 0 &&
          this.locationY < this.field.length &&
          this.locationX < this.field[0].length
        );
      }

    static genField(fieldH, fieldW, percentage = 0.1) {
        const field = Array(fieldH).fill(0).map(element => Array(fieldW));
        for (let y = 0; y < fieldH; y++) {
            for (let x = 0; x < fieldW; x++) {
                const prob = Math.random();
                if (prob > percentage) {
                    field[y][x] = fieldCharacter
                } else {
                    field[y][x] = hole
                }
            }
        }
        return field;
    }




}

let sizeField = prompt(`SizeField ::`)

const myField = new Field(Field.genField(parseInt(sizeField), parseInt(sizeField), 0.2))
// myField.print()
myField.runGame(true);


// let key = '';
// let gameStatue = true;
// while (gameStatue) {
//     console.log(gameStatue)
// }