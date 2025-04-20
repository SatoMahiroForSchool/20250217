let points = [
  [-3, 5], [3, 7], [1, 5], [2, 4], [4, 3], [5, 2], [6, 2], [8, 4],
  [8, -1], [6, 0], [0, -3], [2, -6], [-2, -3], [-4, -2], [-5, -1],
  [-6, 1], [-6, 2]
];

let shapes = []; // 儲存圖形的陣列
let numShapes = 100; // 圖形的數量
let song; // 音樂檔案
let amplitude; // 音樂振幅分析器
let isPlaying = false; // 音樂是否啟動
let button; // 啟動音樂的按鈕

function preload() {
  song = loadSound('mp3/Lightfox-Pluck.mp3'); // 載入音樂檔案
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // 設定背景顏色
  background("#fcc2a4");

  // 初始化音樂振幅分析器
  amplitude = new p5.Amplitude();

  // 初始化每個圖形的屬性
  for (let i = 0; i < numShapes; i++) {
    shapes.push({
      x: random(width), // 隨機 x 座標
      y: random(height), // 隨機 y 座標
      scale: random(20, 80), // 隨機縮放大小，圖片變大
      fillColor: color(random(255), random(255), random(255)), // 隨機填充顏色
      strokeColor: color(random(255), random(255), random(255)), // 隨機邊框顏色
      strokeWeight: random(1, 5), // 隨機邊框粗細
      xSpeed: random(-2, 2), // 隨機 x 軸速度
      ySpeed: random(-2, 2) // 隨機 y 軸速度
    });
  }

  // 新增文字標籤
  textAlign(CENTER, CENTER);
  textSize(24);
  fill("#000000");
  text("按下按鈕以啟動音樂與圖片", width / 2, height / 2 - 50);

  // 新增按鈕
  button = createButton("啟動音樂");
  button.position(width / 2 - 50, height / 2); // 設定按鈕位置於文字下方
  button.style("font-size", "18px"); // 放大按鈕文字大小
  button.style("padding", "10px 20px"); // 增加按鈕的內邊距
  button.mousePressed(startMusic); // 綁定按鈕點擊事件
}

function draw() {
  if (!isPlaying) {
    return; // 如果音樂尚未啟動，則不執行繪圖邏輯
  }

  // 設定背景顏色
  background("#fcc2a4");

  // 顯示文字
  textSize(32); // 設定文字大小
  textFont("Arial"); // 設定字型
  textAlign(CENTER, CENTER); // 設定文字對齊方式
  fill("#ff0000"); // 設定文字顏色為紅色
  text("Hello, World!", width / 2, height / 2); // 在畫布上顯示文字

  // 獲取音樂的振幅值
  let level = amplitude.getLevel();
  let bounce = map(level, 0, 1, 0, 100); // 將振幅值映射為跳動幅度，跳動更明顯
  let scaleFactor = map(level, 0, 1, 1, 2); // 根據振幅計算放大比例

  // 繪製每個圖形
  for (let shape of shapes) {
    // 更新圖形的位置
    shape.x += shape.xSpeed;
    shape.y += shape.ySpeed;

    // 檢查邊界，讓圖形反彈
    if (shape.x < 0 || shape.x > width) {
      shape.xSpeed *= -1;
    }
    if (shape.y < 0 || shape.y > height) {
      shape.ySpeed *= -1;
    }

    push(); // 儲存當前繪圖狀態
    translate(shape.x, shape.y + bounce); // 移動到圖形的位置，加入跳動效果
    scale((shape.scale / 10) * scaleFactor); // 根據振幅放大圖形
    fill(shape.fillColor); // 設定填充顏色
    stroke(shape.strokeColor); // 設定邊框顏色
    strokeWeight(shape.strokeWeight); // 設定邊框粗細

    // 繪製圖形
    beginShape();
    for (let [x, y] of points) {
      vertex(x, y); // 繪製頂點
    }
    endShape(CLOSE); // 結束繪製形狀，並自動封閉

    // 繪製線條
    for (let i = 0; i < points.length - 1; i++) {
      let [x1, y1] = points[i];
      let [x2, y2] = points[i + 1];
      line(x1, y1, x2, y2); // 繪製線條
    }
    // 將最後一點與第一點連接
    let [x1, y1] = points[points.length - 1];
    let [x2, y2] = points[0];
    line(x1, y1, x2, y2);

    pop(); // 恢復繪圖狀態
  }
}

function startMusic() {
  // 當按下按鈕時啟動音樂
  if (!isPlaying) {
    song.loop();
    isPlaying = true;

    // 隱藏按鈕
    button.hide();
  }
}
