import { KeyboardInput } from './interface.js';
import './drawing.js';
import * as KeyboardFunctions from './keyboardFunctions.js'

// Customize this file to set up your "game engine"

export class Engine {

 constructor() {
  this.Init();
  this.frametime = 30.0/1000.0;
  this.time = 0.0;
 }

 InitEvents() {
//   window.addEventListener("resize",resizeEvent);
 }

 Init() {
  this.body = document.body;
//  this.canvas = g("canvas");
//  this.context = canvas.getContext("2d");
//  c3d = canvas.getContext("3d");
  this.elements=new Array;
  this.editing=true;
  this.tileSelect=null;
  this.tileset=null;
   this.oneBlockWidth = 25;
   this.blocksWide = this.oneBlockWidth * 10;
   this.blocksTall = this.oneBlockWidth * 20;
  this.GetWindowSize();
  this.InitEvents();
  this.InitControls();
  this.InitRenderer();
  this.OnResize();
  this.EngineSetup();
 }


 InitControls() {
  this.input=new KeyboardInput();
  this.input.engine = this;
  // numpad
  this.input.n0.release = () => {
    KeyboardFunctions.safetyMoveTetronimoUp(this.currentFloatingTetronimo, this.oneBlockWidth)
  }
  this.input.n1.release = function() {  };
  this.input.n2.release = function() {  };
  this.input.n3.release = function() {  };
  this.input.n4.release = function() {  };
  this.input.n5.release = function() {  };
  this.input.n6.release = function() {  };
  this.input.n7.release = function() {  };
  this.input.n8.release = function() {  };
  this.input.n9.release = function() {  };
  // keys
  this.input.lbracket.release = function() {  };
  this.input.rbracket.release = function() {  };
  this.input.slash.release    = function() {  };
  // arrows
  this.input.left.press = () => {
    KeyboardFunctions.handleLeftPress(this.currentFloatingTetronimo, this.oneBlockWidth, this.blocksWide)
  }
   this.input.left.release  = function() {  };
  this.input.up.release    = function() {  };
   this.input.up.press = () => {
    KeyboardFunctions.handleUpPress(this.currentFloatingTetronimo, this.oneBlockWidth, this.blocksWide, this.blocksTall)
  }
  this.input.down.release  = function() {  };
   this.input.down.press = () => {
    KeyboardFunctions.handleDownPress(this.currentFloatingTetronimo, this.oneBlockWidth, this.blocksTall)
  }
  this.input.right.press = () => {
    KeyboardFunctions.handleRightPress(this.currentFloatingTetronimo, this.oneBlockWidth, this.blocksWide)
  }
   this.input.right.release = function() {  };
  // ESC (quit)
  this.input.esc.release = function() { window.close() };
//   console.log("Keyboard Controls Initialized");
 }

//  this.ImportTileset();
 InitRenderer() {
  this.app = new PIXI.Application({
   backgroundColor:'black'
  });
//   console.log('app',this.app.view)
  this.renderer = this.app.renderer;
  document.body.appendChild(this.app.view); // Add the view to the DOM
  this.stage = new PIXI.Container();
  this.zlayer=new PIXI.DisplayGroup(0,function(tile){
   tile.zOrder = -tile.position.y;
  });
  this.uilayer=new PIXI.DisplayGroup(1,false);
  this.renderer.view.style.position = "absolute";
  this.renderer.view.style.display = "block";
  this.renderer.autoResize = false;
  this.renderer.resize(window.innerWidth, window.innerHeight);
//   console.log(window.innerWidth+"x"+window.innerHeight);
  this.scrolled = { x:0, y:0 };
  this.tilepicker={ };
 }

 GetWindowSize() {
  this.width = this.blocksWide;
  this.height = this.blocksTall;
 }

 OnResize() {
  this.GetWindowSize();
  this.renderer.resize(this.width,this.height);
//   console.log("resized to:",this.width+"x"+this.height);
  if ( !this.renderer ) return;
  this.isWebGL = this.renderer instanceof PIXI.WebGLRenderer
  if (!this.isWebGL) {
    alert("No GL Support: this app requires OpenGL.");
  }
//   console.log(this);
 }

 DeferredInit() {
//   console.log("Deferred Init");
 }


 DelayedInit() {
//   console.log("Delayed Init");
 }

EngineSetup() {
  this.currentFloatingTetronimo = null;
  const redTetromino = PIXI.Sprite.fromImage('./assets/tetromino-sprites/red_s_tetromino.png');
  redTetromino.scale.set(this.oneBlockWidth/100,this.oneBlockWidth/100);
  this.stage.addChild(redTetromino);
  this.currentFloatingTetronimo = redTetromino;

 this.app.ticker.add(function(delta) {

});

 ///

}

 EngineUpdate() {
 }

 EngineRender() {
  this.renderer.render(this.stage);
 }

};

function Loop() {
 engine.EngineUpdate();
 engine.EngineRender();
 requestAnimationFrame(Loop);
}

function Go() {
//  console.log("Go");
 engine=new Engine;
// engine.MapEditMode();
//  console.log(engine);
 setTimeout(function(){engine.DeferredInit();requestAnimationFrame(Loop);},30);
 setTimeout(function(){engine.DelayedInit();},1500);
//  console.log(engine);
}

addEventListener('load', Go );


var engine = new Engine;

function resizeEvent() { if ( engine != null ) engine.OnResize(); }
