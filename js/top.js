'use strict';
(function(global) {
  var document = global.document;
  function top() {
    var settingBtn = document.querySelector('.topView .startBtn'),
        settingView = document.querySelector('.settingView'),
        monsterStatusLiItem = document.querySelectorAll('.monsterView .statusLi > li'),
        nameInputLiItem = document.querySelectorAll('.inputStrLi > li'),
        playerStatusLiItem = document.querySelectorAll('.playerView .statusLi > li'),
        monsterImg = document.querySelector('.monsterView .img img'),
        battleStartBtn = document.querySelector('.bttlStartBtn'),
        nextFrm = document.querySelector('.nextFrm'),
        monsterImgPath = "app/www/img/monster/",
        lSGameData = JSON.parse(localStorage.getItem("LS_Data")),
        sendSelectData = {
	        monster: 1,
	        lv: 1,
	        weapon: 0,
	        armor: 0,
	        shield: 0,
	        item: 0
        },
        setName = [],
        setNameView = document.querySelector('.yourName'),
        monsterData,playerData,weaponData,armorData,shieldData,playerName;
    
    var AjaxPath = {
	    requestFile: "app/model/IndexJson.php"
	  };
	  
    var settingController = function() {};
		settingController.prototype = {
		  init: function() {
		    var that = this,
		        monsterSelect = document.querySelector('.monsterView > .select select'),
		        playerLvSelect = document.querySelector('.playerView > .select select'),
		        weaponSelect = document.querySelector('.weaponLi .weaponSelect'),
		        armorSelect = document.querySelector('.weaponLi .armorSelect'),
		        shieldSelect = document.querySelector('.weaponLi .shieldSelect'),
		        itemSelect = document.querySelector('.weaponLi .itemSelect');
		    
		    battleStartBtn.addEventListener("click", that.formsubmit, false);
		    settingBtn.addEventListener("click", that.showSetting, false);
		    monsterSelect.addEventListener("change", that.select, false);
		    playerLvSelect.addEventListener("change", that.select, false);
		    weaponSelect.addEventListener("change", that.select, false);
		    armorSelect.addEventListener("change", that.select, false);
		    shieldSelect.addEventListener("change", that.select, false);
		    itemSelect.addEventListener("change", that.select, false);
		    
		    for(var i = 0, il = nameInputLiItem.length; i < il; i++) {
		      nameInputLiItem[i].addEventListener("mouseover", function() {
		        for(var n = 0, nl = nameInputLiItem.length; n < nl; n++) {
			        nameInputLiItem[n].classList.remove("cur");
			      }
			      this.classList.add("cur");
			    }, false);
			    (function(arg) {
			      nameInputLiItem[arg].addEventListener("click", function() {
			        that.nameSet(arg, this);
			      }, false);
			    })(i);
		    }
		    
		    if(lSGameData !== null) {
		      playerName = lSGameData.playerName;
		      that.viewTop();
		    }
		  },
		  
		  showSetting: function() {
			  settingView.style.display = "block";
			  setTimeout(function(){
				  settingView.classList.add("show");
			  }, 100);
		  },
		  
		  select: function() {
		    global.dq.Sound.click();
		    if(this.classList.contains("monsterSelect")) {
			    sendSelectData.monster = this.value;
		    }
		    if(this.classList.contains("playerLvSelect")) {
			    sendSelectData.lv = this.value;  
		    }
		    if(this.classList.contains("weaponSelect")) {
			    sendSelectData.weapon = this.value;  
		    }
		    if(this.classList.contains("armorSelect")) {
			    sendSelectData.armor = this.value;
		    }
		    if(this.classList.contains("shieldSelect")) {
			    sendSelectData.shield = this.value;
		    }
		    if(this.classList.contains("itemSelect")) {
			    sendSelectData.item = this.value;
		    }
			  AjaxCtrl.requestFile();
		  },
		  
		  viewChange: function() { 
			  monsterStatusLiItem[0].querySelector('.val').innerHTML = monsterData.max_hp;
			  monsterStatusLiItem[1].querySelector('.val').innerHTML = monsterData.atk;
			  monsterStatusLiItem[2].querySelector('.val').innerHTML = monsterData.def;
			  monsterImg.src = monsterImgPath + monsterData.thmbNo + ".gif";
			  
			  playerStatusLiItem[0].querySelector('.val').innerHTML = playerData.hp;
			  playerStatusLiItem[1].querySelector('.val').innerHTML = parseInt(playerData.sprit,10) + parseInt(weaponData.atk, 10);
			  playerStatusLiItem[2].querySelector('.val').innerHTML = (parseInt(playerData.speed,10) / 2) + parseInt(armorData.def,10) + parseInt(shieldData.def,10);
		  },
		  
		  formsubmit: function() {
        nextFrm.player.value = playerName;
        nextFrm.monster.value = sendSelectData.monster;
	      nextFrm.lv.value = sendSelectData.lv;
	      nextFrm.weapon.value = sendSelectData.weapon;
	      nextFrm.armor.value = sendSelectData.armor;
	      nextFrm.shield.value = sendSelectData.shield;
	      nextFrm.useitem.value = sendSelectData.item;
	      nextFrm.submit();
      },
      
      nameSet: function(arg, elem) {
        var that = this;
        if(elem.classList.contains("end")) {
          if(setName.length > 0) {
	          playerName = setName.join("");
            that.viewTop();
            var gameData = {
					    playerName: playerName
					  }
            localStorage.setItem('LS_Data',JSON.stringify(gameData));
          } else {}
          return;
        }
        if(elem.classList.contains("back")) {
	        setName.pop();
	        setNameView.innerHTML = "";
	        for(var i = 0, il = setName.length; i < il; i++) {
	          setNameView.innerHTML += setName[i];
	        }
	        for(var i = 0, il = 4 - setName.length; i < il; i++) {
		        setNameView.innerHTML += "＊";
		      } 
	        return;
        } else {
          if(setName.length == 4){
	          return;
          }
	        setName.push(elem.innerHTML);     
	        setNameView.innerHTML = "";
	        for(var i = 0, il = setName.length; i < il; i++) {
	          setNameView.innerHTML += setName[i];
	        }
		      for(var i = 0, il = 4 - setName.length; i < il; i++) {
		        setNameView.innerHTML += "＊";
		      }
        }
      },
      
      viewTop: function() {
	      document.querySelector('.playerView .select .name').innerHTML = playerName;
        document.querySelector('.nameSettingView').style.display = "none";
        document.querySelector('.topView').style.display = "block";
        return;
      }
		}
				
		//Ajax Controller
		var AjaxConttoller = function(){};
		AjaxConttoller.prototype = {
		  createHttpRequest: function() {
        try {
          return new XMLHttpRequest();
        } catch(e) { }
      },
      
     requestFile: function() {
        var httpObj = AjaxConttoller.prototype.createHttpRequest(),
            jsonDataObj;
        var timeout = false,
            timer = setTimeout(function() {
              timeout = true;
              httpObj.abort();
             }, 10000);
        httpObj.open("post", AjaxPath.requestFile, true);
        httpObj.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded');
        httpObj.onreadystatechange = function() {
          if(httpObj.readyState !== 4) {
            return;
          }
          if(timeout) return;
          clearTimeout(timer);
          if(httpObj.status == 200) {
            jsonDataObj = JSON.parse(this.responseText);
            monsterData = jsonDataObj.monster;
            playerData = jsonDataObj.player;
            weaponData = jsonDataObj.weapon;
            armorData = jsonDataObj.armor;
            shieldData = jsonDataObj.shield;
                        
            SettingCtrl.viewChange();
          }
        }
        httpObj.send("sendData=" + sendSelectData.monster + "," + sendSelectData.lv + "," + sendSelectData.weapon + "," + sendSelectData.armor + "," + sendSelectData.shield + "," + sendSelectData.item);
        return;
      }            
		};
		var AjaxCtrl = new AjaxConttoller();		
		var SettingCtrl = new settingController();
		SettingCtrl.init();
  };
document.addEventListener("DOMContentLoaded", top, false);
})(this);