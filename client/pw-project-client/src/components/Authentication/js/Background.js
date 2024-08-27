import React, { createRef, useEffect } from "react";
import { WaveGroup } from "./WaveGroup";

export class Background extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = createRef();
  }

  componentDidMount() {
    this.canvas = this.canvasRef.current;
    this.ctx = this.canvas.getContext("2d");
    this.waveGroup = new WaveGroup();
    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(t) {
    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.ctx.imageSmoothingEnabled = true;
    this.waveGroup.draw(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth + 10;
    this.stageHeight = Math.floor(
      document.body.clientHeight -
        document.querySelector(".navbar").offsetHeight
    );
    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.ctx.scale(2, 2);

    this.waveGroup.resize(this.stageWidth / 2, this.stageHeight / 2);
  }

  render() {
    return <canvas ref={this.canvasRef} />;
  }
}
