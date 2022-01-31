import { Wave } from "./Wave";

export class WaveGroup {
  constructor() {
    this.total_waves = 3;
    this.total_points = 5;
    this.waves = [];
    for (let i = 0; i < this.total_waves; i++) {
      const wave = new Wave(i, this.total_points);
      this.waves[i] = wave;
    }
  }

  resize(stageWidth, stageHeight) {
    for (let i = 0; i < this.total_waves; i++) {
      const wave = this.waves[i];
      wave.resize(stageWidth, stageHeight);
    }
  }

  draw(ctx) {
    localStorage.getItem("theme-color") === "theme-light"
      ? (this.color = ["#1F618D", "#2980B9", "#c3c3c3"]) //#e4e4e4
      : (this.color = ["#702963", "#9F2B68", "#191b1d"]); //"#23272A"
    for (let i = 0; i < this.total_waves; i++) {
      const wave = this.waves[i];
      wave.draw(ctx, this.color[i]);
    }
  }
}
