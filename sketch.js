// data
let extravertion = ['e0', 'e25', 'e75', 'e100'];
let agreeableness = ['a0', 'a25', 'a75', 'a100'];
let conscienceness = ['c0', 'c25', 'c75', 'c100'];
let neuroticism = ['n0', 'n25', 'n75', 'n100'];
let openness = ['o0', 'o25', 'o75', 'o100'];

let people = ['p0', 'p50', 'p100'];
let pressure = ['a0', 'a50', 'a100'];
let open = ['o0', 'o50', 'o100'];
let lightness = ['l0', 'l50', 'l100'];

// connect
for (let i = 0; i < 9; i++){
  let func = 'let slider' + i + ';'
  eval(func);
}
let myFont;
function preload() {
  myFont = loadFont('Inconsolata.otf');
}
let button;
let theta = 0;
let amplitude = 0


// ball
let bugs = [];

let rotationX = 0;
let rotationY = 0;
let velocityX = 0;
let velocityY = 0.1;  



function setup() {
  let c =createCanvas(960, 600, WEBGL);
  // control panel
  
  textSize(50);
  textFont(myFont);
  fill(255);
  let t1 = ['extravertion', 'agreeableness', 'conscienceness', 'neuroticism', 'openness'];
  let t2 = ['people', 'pressure', 'open', 'lightness']
  for (let i = 0; i < 5; i++){
  
    let div = createDiv(t1[i]);
    div.style('font-size', '16px');
    div.style('color', '#ff0000')
    div.position(150, 20+i*30);
  }
  for (let i = 5; i < 9; i++){
    let div = createDiv(t2[i-5]);
    div.style('font-size', '16px');
    div.style('color', '#ff0000')
    div.position(150, 20+i*30);
  }
  
  
 

  for (let i = 0; i < 5; i++){
    let func1 = 'slider'+i+'=createSlider(0,3,'+int(random(4))+',1)';
    let func2 = 'slider'+i+'.position(60,'+(20+i*30)+');';
    let func3 = 'slider'+i+'.style(\'width\', \'80px\')';
    eval(func1);
    eval(func2)
    eval(func3)
  }
  for (let i = 5; i < 9; i++){
    let func1 = 'slider'+i+'=createSlider(0,2,'+int(random(3))+',1)';
    let func2 = 'slider'+i+'.position(60,'+(20+i*30)+');';
    let func3 = 'slider'+i+'.style(\'width\', \'80px\')';
    eval(func1);
    eval(func2)
    eval(func3)
  }
  button = createButton('shuffle');
  // button.position(0,0);
  button.mousePressed(shuffleP)
  let pePosX = random(width)
  let pePosY = random(height)
  let pePosZ = random(1000)

  

}

function shuffleP() {
  for (let i=0;i<9;i++){
    let func1 = 'slider'+i+'.value(int(random(3))';
    eval(func1)
  }
  saveCanvas('result','jpg')
}


function draw() {
  background(35);
  

  // connect
  // drag to move the world.
  orbitControl();
  let e = slider0.value()+1;
  let o = slider1.value()+1;
  let a = slider2.value()+1;
  let n = slider3.value()+1;
  let c = slider4.value()+1;
  let pe = slider5.value();
  let pr = slider6.value();
  let op = slider7.value();
  let li = slider8.value();

  let psn = [];
  psn.push(e);
  psn.push(o);
  psn.push(a);
  psn.push(n);
  psn.push(c);

  col1 = color(255,0,0,e/4*255)
  col2 = color(255,255,80,o/4*255)
  col3 = color(0,255,120,a/4*255)
  col4 = color(0,180,220,n/4*255)
  col5 = color(120,0,255,c/4*255)
  let col = [col1,col2,col3,col4,col5]
  let bf = [];
  for (let i = 0; i <5 ; i++) {
    if (bf.length<2&&psn[i]==4)
      bf.push(i)
  }
  if (bf.length<2) {
    for (let i = 0; i <5 ; i++) {
      if (bf.length<2&&psn[i]==3)
        bf.push(i)
    }
  }
  if (bf.length<2) {
    for (let i = 0; i <5 ; i++) {
      if (bf.length<2&&psn[i]<3)
        bf.push(i)
    }
  }
  
  // base
  let xRot = radians(-rotationX);
  let yRot = radians(270 - rotationY - millis()*.01);
  rotateX( xRot ); 
  rotateY( -yRot );
  rotationX += velocityX;
  rotationY += velocityY;
  velocityX *= 1;
  velocityY *= 1;
  let jump = 0;
  let rad = 3;
  let centerX = 0;
  let centerY = 0;
  let centerZ = 0;
  
  // types
  if (e>n)
    jump = random(0, e-n)*10
  
  if (e==n)
    jump = random(1)
  
  if (o>2&&n<3)
    rad = random(3,4)*o
  
  if (n>e&&n>2)
    velocityY = random(400,800)*n
  
  if (n>2)
    rad = random(0.2,2*1/n*2)
    velocityY = 1
  
  if (o>2)
    theta += 0.05;
    amplitude = 10
    centerX = sin(theta)*amplitude*o
    centerY = sin(theta)*amplitude*o
    centerZ = sin(theta)*amplitude*o*2
  
  if (c>2)
    centerX = 0
    centerY = 0
    centerZ = 0
    velocityY = 0.05*e*o/2
    rad = 3*e/2
  
  if (li==2) {
    background(180)
    if (n>2)
      rad = 0.3 * random(2)
      velocityY = 0.01
    if (e>2)
      amplitude = 20
      centerX = sin(theta)*amplitude*o
      centerY = sin(theta)*amplitude*o
      centerZ = sin(theta)*amplitude*o*2
  }
  
  if (li==1) {
    background(80)
  }
  
  

  
  let phi = PI * (3 - sqrt(5));
  let samples = 500;
  let raduis = 200;
  normalMaterial();


  // print(bf)
  
  for (let i = 1; i <= samples; ++i) {
    fill(lerpColor(col[bf[0]],col[bf[1]], i/samples));
    push()
    let x = 1 - (i / (samples - 1)) * 2;
    let radius = sqrt(1 - x * x);
    let theta = phi * i;
    let y = cos(theta) * radius
    let z = sin(theta) * radius
    translate(x*raduis+jump+centerX, y*raduis+jump+centerX, -z*raduis+centerX);
    sphere(rad);
    pop();
  };

  
    if (pe>0) {
    let num = int(random(5))*pe*20
    if (li>1)
      fill(0,0,0,220)
    if (li==1)
      fill(0,0,0,80)
    if (li==0)
      fill(0,0,0,10)
    for (let i=0;i<num;i++){
      translate(random(2000),10+centerZ+random(2000),-240+random(2000))
      sphere(30)

    }
  }
  // saveCanvas('as','jpg')


}
