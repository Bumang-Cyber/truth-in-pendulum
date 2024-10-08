// pendulum 객체
class Pendulum {
  constructor() {
    this.origin = createVector(width / 2, -1000); // 오리진 좌표

    this.angle = PI / 3; // 각도
    this.angleV = 0; // 각속도 초기화
    this.angleA = 0.001; // 각가속도 초기화

    this.len = 1400; // 줄 길이
    this.bob = createVector(); // '추'의 벡터
    this.gravity = 1; // 중력
    this.tempCount = 0;
    this.r = 400; // '추'의 반지금
    this.way = "RtL"; // '추'의 진행방향
    this.round = 0;
    this.scenes = [
      {
        color: "#E3B0AF",
        music: "NATURE",
      },
      {
        color: "#591E70", //
        music: "FORGIVEME",
      },
      {
        color: "#25032C", //
        music: "DREAM",
      },
    ];
    this.lensWidth = this.r * 3 - 40;
    this.lensHeight = this.r * 3 + 300;
    this.lensOriginY = -120;
    this.lensVY = 1;
    this.lensOpacity = 255;
  }

  setPendulumSettings(
    origin = createVector(width / 2, -1000), //
    angle = PI / 2,
    angleV = 0,
    angleA = 0.001,
    len = 1400,
    gravity = 1,
    r = 400,
    way
  ) {
    this.origin = origin;
    this.angle = angle;
    this.angleV = angleV;
    this.angleA = angleA;
    this.len = len;
    this.gravity = gravity;
    this.r = r;
    this.way = way;

    console.log(way, "way");
  }

  setPendulumOrigin(origin) {
    this.origin = origin;
  }

  setPendulumAngle(angle) {
    this.angle = angle;
  }

  setPendulumAngleVelocity(angleV) {
    this.angleV = angleV;
  }

  setPendulumAngleAcceleration(angleA) {
    this.angleA = angleA;
  }

  setPendulumLength(len) {
    this.len = len;
  }

  setPendulumAngleGravity(gravity) {
    this.gravity = gravity;
  }

  resetLensImage() {
    this.lensWidth = this.r * 3 - 70;
    this.lensHeight = this.r * 3 + 270;
    this.lensOriginY = -120;
    this.lensVY = 1;
    this.lensOpacity = 255;
  }

  setBobExpand(inc = 1.005) {
    this.lensVY += 0.1;
    this.r *= inc;
    this;
    this.lensWidth *= inc - 0.001;
    this.lensHeight *= inc - 0.001;
    this.lensOriginY -= inc * this.lensVY;
    if (this.r > 2000) {
      this.r = 2000;
    }
  }

  getPendulumStatus() {
    return {
      origin: this.origin,
      angle: this.angle,
      angleV: this.angleV,
      angleA: this.angleA,
      len: this.len,
      bob: this.bob,
      gravity: this.gravity,
      r: this.r,
      way: this.way,
      scenes: this.scenes,
      round: this.round,
      lensWidth: this.lensWidth,
      lensHeight: this.lensHeight,
    };
  }

  swingPendulumContinuously() {
    // push와 pop으로 그리기 상태를 저장할 수 있다.
    push(); // 현재의 그리기 상태를 저장
    let force = this.gravity * sin(this.angle);

    this.angleA = (-1 * force) / this.len;
    this.angleV += this.angleA;
    this.angle += this.angleV;

    // 추의 x, y
    this.bob.x = this.len * sin(this.angle) + this.origin.x;
    this.bob.y = this.len * cos(this.angle) + this.origin.y;

    // layerOuter에 pendulum이 그려짐
    layerOuter.stroke(255);
    layerOuter.strokeWeight(4);
    // 시작점의 x,y, bob의 x,y를 라인으로 이음
    layerOuter.line(this.origin.x, this.origin.y, this.bob.x, this.bob.y);
    // bob의 x, y를 중점으로 반지름 64의 원을 생성

    layerOuter.stroke(75, 100, 255);
    layerOuter.strokeWeight(8);
    layerOuter.fill(0, 0, 0, 0);
    layerOuter.circle(this.bob.x, this.bob.y, this.r + 10);
    layerOuter.erase();
    layerOuter.circle(this.bob.x, this.bob.y, this.r);
    layerOuter.noErase();
    pop(); // 이전의 그리기 상태로 복원
  }

  swingPendulumDecremently(decre = 0.99) {
    // push와 pop으로 그리기 상태를 저장할 수 있다.
    push(); // 현재의 그리기 상태를 저장
    let force = this.gravity * sin(this.angle);

    this.angleA = (-1 * force) / this.len;
    this.angleV += this.angleA;
    this.angle += this.angleV;

    this.angleV *= decre;

    // 추의 x, y
    this.bob.x = this.len * sin(this.angle) + this.origin.x;
    this.bob.y = this.len * cos(this.angle) + this.origin.y;

    // layerOuter에 pendulum이 그려짐
    layerOuter.stroke(255);
    layerOuter.strokeWeight(4);
    // 시작점의 x,y, bob의 x,y를 라인으로 이음
    layerOuter.line(this.origin.x, this.origin.y, this.bob.x, this.bob.y);
    // bob의 x, y를 중점으로 반지름 64의 원을 생성

    layerOuter.stroke(255, 255, 255);
    layerOuter.strokeWeight(8);
    layerOuter.fill(0, 0, 0, 0);
    layerOuter.circle(this.bob.x, this.bob.y, this.r + 10);
    layerOuter.erase();
    layerOuter.circle(this.bob.x, this.bob.y, this.r);

    // 추 이미지 그리기
    if (this.r > 500) {
      this.lensOpacity -= 10;
      this.drawLensImage(this.lensOpacity);
    } else {
      this.drawLensImage();
    }

    layerOuter.noErase();
    pop(); // 이전의 그리기 상태로 복원

    // console.log("decreasing");
  }

  drawLensImage(opacity = 255) {
    if (lensImage) {
      tint(255, opacity);
      // 이미지가 로드된 경우
      push();
      translate(this.bob.x, this.bob.y); // 추의 위치로 이동
      rotate(-this.angle); // 각도를 조정하여 이미지를 회전
      imageMode(CENTER); // 이미지 모드를 센터로 설정
      image(lensImage, 0, this.lensOriginY, this.lensWidth, this.lensHeight); // 추 이미지 그리기
      pop();
    }
  }

  swingPendulumIncremently(incre = 1.01, maxAbs = 0.9) {
    // push와 pop으로 그리기 상태를 저장할 수 있다.
    push(); // 현재의 그리기 상태를 저장

    if (this.tempCount === 0) {
      this.angle = 0;
      this.tempCount++;
    }

    // 진자에 작용하는 중력의 힘 계산
    let force = this.gravity * sin(this.angle);
    this.angleA = (-1 * (force ? force : 0.1)) / this.len; // 각가속도 계산
    this.angleV += this.angleA; // 각속도 업데이트

    this.angleV *= 0.2; // 감쇠 효과 추가 (공기 저항 등)

    this.angle += this.angleV; // 각도 업데이트

    // 추의 위치 계산
    this.bob.x = this.len * sin(this.angle) + this.origin.x;
    this.bob.y = this.len * cos(this.angle) + this.origin.y;

    // layerOuter에 pendulum이 그려짐
    layerOuter.stroke(255);
    layerOuter.strokeWeight(4);
    // 시작점의 x,y, bob의 x,y를 라인으로 이음
    layerOuter.line(this.origin.x, this.origin.y, this.bob.x, this.bob.y);
    // bob의 x, y를 중점으로 반지름 64의 원을 생성

    layerOuter.stroke(75, 100, 255);
    layerOuter.strokeWeight(8);
    layerOuter.fill(0, 0, 0, 0);
    // layerOuter.circle(this.bob.x, this.bob.y, this.r);
    layerOuter.erase();

    if (OVERALL_SCENE === "NATURE") {
      drawlayerRabbit();
      drawlayerRacoon();
    }

    layerOuter.circle(this.bob.x, this.bob.y, this.r);
    layerOuter.noErase();
    pop(); // 이전의 그리기 상태로 복원
  }

  convertScenes() {
    this.round++;

    let temp1 = layerOuterImage;
    let temp2 = layerInnerImage;
    let temp3 = layerAltImage;

    layerOuterImage = temp2;
    layerInnerImage = temp3;
    layerAltImage = temp1;

    return this.scenes[this.round % 3];
  }
}
