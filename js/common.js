/* polyfill classList */
(function(c){function f(a){this.element=a}function d(){var a=this.element.className;return 0<a.length?a.split(/\s+/):[]}"function"!==typeof c.DOMTokenList&&(c.DOMTokenList=f,Object.defineProperty(c.HTMLElement.prototype,"classList",{get:function(){void 0===this.__user_classList__&&(this.__user_classList__=new f(this));return this.__user_classList__},enumerable:!0,configurable:!0}),f.prototype={add:function(a){var b=d.call(this);this.element.className=(-1===b.indexOf(a)?b.concat(a):b).join(" ")},contains:function(a){return-1!==
d.call(this).indexOf(a)},item:function(a){a=d.call(this)[a];return void 0===a?null:a},remove:function(a){for(var b=d.call(this),e;-1!==(e=b.indexOf(a));)b.splice(e,1);this.element.className=b.join(" ")},toggle:function(a){for(var b=d.call(this),e,c=!0;-1!==(e=b.indexOf(a));)b.splice(e,1),c=!1;c&&b.push(a);this.element.className=b.join(" ");return c}})})(this);

'use strict';
(function(global) {
  var document = global.document;
  global.dq = {};
  
  function common() {
    var configLi = document.querySelector('.configLi'),
        configLiItem = document.querySelectorAll('.configLi > li'),
        btnConfig = document.querySelector('.configView > .sttngIco'),
        lSGameData = JSON.parse(localStorage.getItem("LS_Data")),
        viewMode = false; 
    
    // ConfigController
    var ConfigController = function() {};
		ConfigController.prototype = {
		  init: function() {
		    var that = this;
		    
		    configLi.style.display == "none";
		    btnConfig.addEventListener("click", that.viewConfig, false);		    
		    for(var i = 0, il = configLiItem.length; i < il; i++) {
		      configLiItem[i].addEventListener("mouseover", function() {
		        for(var n = 0, nl = configLiItem.length; n < nl; n++) {
			        configLiItem[n].classList.remove("cur");
			      }
			      this.classList.add("cur");
			    }, false);
			    (function(arg) {
			      configLiItem[arg].addEventListener("click", function() {
			        that.config(arg, this);
			      }, false);
			    })(i);
		    }
      },
      
      viewConfig:function() {
	      if(viewMode == false) {
		      configLi.style.display = "block";
		      viewMode = true;
		      return;
	      } else {
		      configLi.style.display = "none";
		      viewMode = false;
		      return;
	      }
      },
      
      config: function(arg, elem) {
	      if(elem.classList.contains("top")) {
		      location.href = "./";
	      }
	      if(elem.classList.contains("name")) {
		      localStorage.removeItem("LS_Data");
		      location.href = "./";
	      }
	      if(elem.classList.contains("close")) {
		      configLi.style.display = "none";
	      }
	      return;
      }
    }
    
    //SoundController 
    SoundController = function() {};
		SoundController.prototype = {
		  init: function() {
		    var that = this;
		        
		    that.audioList = {
			    "sound00": new Audio("app/sound/click.mp3"),
			    "sound01": new Audio("app/sound/magic.mp3"),
			    "sound02": new Audio("app/sound/attack.mp3"),
			    "sound03": new Audio("app/sound/win.mp3"),
			    "sound04": new Audio("app/sound/dead.mp3"),
			    "sound05": new Audio("app/sound/fire.mp3"),
			    "sound06": new Audio("app/sound/damage.mp3")
		    };
		    		    
			  var clickElms,
			      clickTargetClass = ['.configView > .sttngIco', '.configLi > li', '.inputStrLi > li', '.startBtn', '.monsterSelect option', '.commendLi > li'];
			  for (var name in clickTargetClass) {
			    if (clickTargetClass.hasOwnProperty(name)) {
			      clickElms = document.querySelectorAll(clickTargetClass[name]);		      
			      that.setClickSound(clickElms);
			    }
			  }   
		  },
		  
		  setClickSound: function(elem) {
		    var that = this;
		    for(var i = 0, il = elem.length; i < il; i++) {
			    elem[i].addEventListener("click", function(){
				    that.audioList["sound00"].play();
			    }, false);
			  }
			  return;
		  },
		  
		  click: function() {
			  this.audioList["sound00"].play();
			  return;
		  },
		  
		  magic: function() {
			  this.audioList["sound01"].play();
			  return;
		  },
		  
		  attack: function() {
			  this.audioList["sound02"].play();
			  return;
		  },
		  
		  win: function() {
			  this.audioList["sound03"].play();
			  return;
		  },
		  
		  dead: function() {
			  this.audioList["sound04"].play();
			  return;
		  },
		  
		  fire: function() {
			  this.audioList["sound05"].play();
			  return;
		  },
		  
		  damage: function() {
			  this.audioList["sound06"].play();
			  return;
		  }
		  
    }
    
    
    var ConfigCtrl = new ConfigController();
		    ConfigCtrl.init();
		var SoundCtrl = new SoundController();
		    SoundCtrl.init();
		global.dq.Sound = SoundCtrl;
  };
document.addEventListener("DOMContentLoaded", common, false);
})(this);