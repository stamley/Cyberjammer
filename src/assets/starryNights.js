function starryNights() {
  return function (p5) {
    let stars = [];

    p5.setup = () => {
      let canvas = p5.createCanvas(window.innerWidth, window.innerHeight);
      canvas.parent("p5Canvas");
      p5.background(0);
      p5.frameRate(30);
    };

    // set background to black
    p5.draw = () => {
      // create array of star positions
      p5.background(0);
      for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].show();
      }
      if (p5.frameCount % 53 == 0) {
        stars.push(new Star());
      }
    };

    class Star {
      constructor() {
        this.x = p5.random(p5.width);
        this.y = p5.random(p5.height);
        this.vx = p5.map(this.x, 0, p5.width, -2, 2);
        this.vy = p5.map(this.y, 0, p5.height, -2, 2);
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (
          this.x < 0 ||
          this.x > p5.width ||
          this.y < 0 ||
          this.y > p5.height
        ) {
          this.x = p5.random(p5.width);
          this.y = p5.random(p5.height);
          this.vx = p5.map(this.x, 0, p5.width, -2, 2);
          this.vy = p5.map(this.y, 0, p5.height, -2, 2);
        }
      }

      show() {
        p5.fill(255);
        p5.ellipse(this.x, this.y, 5, 5);
      }
    }
  };
}

export { starryNights };
