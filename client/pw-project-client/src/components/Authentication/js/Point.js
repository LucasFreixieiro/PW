export class Point {
    constructor(index, x, y) {
        this.x = x
        this.y = y
        this.fixed_y = y
        this.speed = 0.005
        this.cur = index + 1
        this.max = Math.random() * 100 + 50
    }

    update() {
        this.cur += this.speed;
        this.y = (this.fixed_y + Math.sin(this.cur) * this.max)
    }
}