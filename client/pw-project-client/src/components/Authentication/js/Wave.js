import { Point } from "./Point";

export class Wave {
    constructor(index, total_points) {
        this.index = index;
        this.total_points = total_points;
        this.points = []
    }

    resize(stageWidth, stageHeight) {
        this.stageWidth = stageWidth;
        this.stageHeight = stageHeight;
        this.center_x = stageWidth / 2;
        this.center_y = stageHeight / 2;
        this.point_gap = this.stageWidth / (this.total_points - 1)
        this.inititalize()
    }

    inititalize() {
        this.points = [];

        for (let i = 0; i < this.total_points; i++) {
            const point = new Point(
                i + 1,
                this.point_gap * i,
                this.center_y
            );
            this.points[i] = point
        }
    }

    draw(ctx, color) {
        ctx.beginPath();
        ctx.fillStyle = color

        let prev_x = this.points[0].x;
        let prev_y = this.points[0].y

        ctx.moveTo(prev_x, prev_y);

        for (let i = 1; i < this.total_points; i++) {
            if (i < this.total_points - 1) {
                this.points[i].update();
            }

            const cx = (prev_x + this.points[i].x) / 2
            const cy = (prev_y + this.points[i].y) / 2

            ctx.quadraticCurveTo(prev_x, prev_y, cx, cy)

            prev_x = this.points[i].x;
            prev_y = this.points[i].y

        }
        ctx.lineTo(prev_x, prev_y);
        ctx.lineTo(this.stageWidth, this.stageHeight);
        ctx.lineTo(this.points[0].x, this.stageHeight);
        ctx.fill();
        ctx.closePath();
    }
}