///////////////////////////////////////////////////////////////////////////////
var debug=false;
//////////////////////////////////////////////////////////////////////////////

/////// Custom vars ////////////// Configurables!
//
var screenpadding=30;      // Border for comfort area.
var layout;
var txtwidth;

//screensize=[screen.width,screen.height];
//screensize=[300,400];

var frametime=1000/30;          // ms for each frame.
var chartime=0;                 // ms for each character.
var forecolor=[50,200,50];      // All characters color.
var glowcolor=[255,255,255];    // Glow color attack.
var backcolor=[20,22,20];       // Background color.

var miniimgsize=[100,100];      // Size for in-line images.

var cursorchar="&nbsp;";        // 

var soundstate=false;           // Initial click sound state.
var fontsize=10;
//
//////////////////////////////////

setupable.push("soundstate");
setupable.push("fontsize");
//introtxt="\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n"+	introtxt;

///////////////////////////////////////////////////////////////////////////////
var vars={};
var funcs={};
funcs["hesheyou"]=function(k){
	var out="she";
	vars["s"]="s";
	if(H[k].sex=="male"){out="he";}
	if(k==h){out="you";vars["s"]="";}
	return out;
}
///////////////////////////////////////////////////////////////////////////////
var screensize=calcscreensize();
document.body.style.fontSize=fontsize+"px";

document.body.innerHTML+=''+
'<textarea id="debug" cols="30" rows="6" style="position:absolute;top:0;right:0;"></textarea>'+
'<div id="fontcalc" style="position:absolute;top:-100px;">x</div>'+
'<div style=" position: fixed; top:'+screenpadding+';left:0; overflow:hidden; padding:0 '+screenpadding+'px; word-break:break-all; " id="baseframe">'+
'<span id="oldtext" style="line-height:14px; word-break:break-all; "></span><span id="txtscreen" style="word-break:break-all; line-height:14px;"></span><span id="cursor"></span>'+
'</div>'+
'<div id="basealias" style="position: fixed; top:0;left:0;pointer-events:none;z-index:99;"><canvas width='+screensize[0]+' height='+screensize[1]+' id="aliasfilter" style="pointer-events:none;"></canvas></div>'+
'<div id="borderfilter" style=" background-image: url(\'scrborder.svg\'); z-index:98;    pointer-events: none; position: fixed; top:0;left:0;  background-repeat: no-repeat; background-size: 100% 100%; -moz-background-size: 100% 100%; "></div>'+
'';

// Var-entity helpers.
var oldtxt = document.getElementById("oldtext");
var txtsc = document.getElementById("txtscreen");
var cursor = document.getElementById("cursor");
var aliasfilter = document.getElementById("aliasfilter");
var baseframe = document.getElementById("baseframe");

cursor.className="cursor";

function resetScreen(){
	lastglewok=charnum;
	txtsc.innerHTML="";
} 

// Format some custom visuals.
document.body.style.background="rgb("+backcolor+")";
document.body.style.color="rgb("+forecolor+")";
document.body.style.overflow="hidden";
document.body.style.maxWidth=screensize[0];
document.body.style.maxHeight=screensize[1];
document.body.style.position="relative";

// Some globals declarations.
var framego=false;
var curs=0;
//var line=0;
var fbzero=0;
var gwzero=0;
var writebuf="";
var ctrlmode=false;
var shiftmode=false;
var altmode=false;
var charnum=0;
var lastglewok=0;
var tc=0;
var row=0;
var clicksnd = new Audio('click.wav');
var boldmode=false;
var underlinemode=false;
docursor(cursorchar);

var saveoptname = [];
var dumptxt="";
var framems;
var flushcount=0;
var lastframetime=0;
var mschar=0;
var loading=true;
var pause=false;
var ismobile=mobileAndTabletcheck();

if(!debug){
	document.getElementById("debug").
		parentNode.removeChild(document.
				getElementById("debug"));
}else{introtxt="(Debug mode) "+introtxt;
}


function calcscreensize(){ 
	scrw= window.innerWidth;
	scrh= window.innerHeight;
	return [scrw, scrh];
}

function drawscreen(){
	aliasfilter.width = screensize[0];
	aliasfilter.height = screensize[1];
	var ctx = aliasfilter.getContext('2d');
	ctx.strokeStyle='#000000';	ctx.lineWidth=0.5;
	for(var i=0;i<=aliasfilter.height;i=i+3){
		ctx.beginPath(); ctx.moveTo(0,i);
		ctx.lineTo(aliasfilter.width,i);
		ctx.stroke(); ctx.closePath();
	}	
}

function sizeandposition(){
	screensize=calcscreensize();
	baseframe.style.width
		=screensize[0]-(screenpadding*2); 
	document.getElementById("borderfilter").
		style.width=screensize[0]; 
	document.getElementById("basealias").
		style.width=screensize[0];
	document.getElementById("aliasfilter").
		style.width=screensize[0]; 
	baseframe.style.height
		=screensize[1]-(screenpadding*2);
	document.getElementById("basealias").
		style.height=screensize[1];
	document.getElementById("aliasfilter").
		style.height=screensize[1];
	document.getElementById("borderfilter").
		style.height=screensize[1];
	genHouses();
	drawscreen();
	//cursor.scrollIntoView();
	baseframe.scrollTop = parseInt(baseframe.scrollHeight);
	loading=false;
}

var house=[];
var charheight;
var charwidth;

function genHouses(){
	charheight=
		document.getElementById("fontcalc")
		.clientHeight;
	charwidth=
		document.getElementById("fontcalc")
		.clientWidth;
	bfheight=baseframe.clientHeight
		-(screenpadding*2);
	bfwidth=baseframe.clientWidth
		-(screenpadding*2);
	if(!ismobile){charwidth+=.511;}
	cols=parseInt(bfwidth/charwidth);
	rows=parseInt(bfheight/charheight)-1;
	totalchars=rows*cols;
	//alert(bfwidth);
	//txtsc.innerHTML=hss;
	loading=false;
}

window.onresize = function(){
	sizeandposition();
};sizeandposition();sizeandposition();

window.requestAnimFrame = (function() {
		return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback) {
		window.setTimeout(callback, 30);
		};
		})();

function animate() {
	if(gameison){boo();}
	window.requestAnimFrame(function() {
			animate();
			});
} animate();

function clicksound(){
	if(soundstate)clicksnd.play();
}

var stopped=false;

function getframems(){
	var d=new Date();
	thisframetime=d.getTime();
	if(!lastframetime)
	{lastframetime=thisframetime;}
	framems=thisframetime-lastframetime;
	lastframetime=thisframetime;
}

function boo(){    

	if(inputanimating) {
		baseframe.scrollTop = parseInt(baseframe.scrollHeight);
		//inputout.scrollIntoView({block: "end"});
	}

	if(loading)return;
	if(pause)return;

	getframems();
	mschar+=framems;
	gonxt=false;
	if(mschar>=chartime)
	{mschar-=chartime;gonxt=true;}
	if(debug){
		document.getElementById("debug").innerHTML=
			writebuf        
			// Change this to whatever you want to debug.
			;}

	if((gonxt)&&(writebuf!="")){

		if(writebuf.match(/^\_/)){
			writebuf=writebuf.substr(1);
			for (var key in vars){
				val=vars[key];
				flen=key.length;
				if(key.substr(0,flen)==writebuf.substr(0,flen)){
					writebuf=writebuf.substr(flen);
					writebuf=val+writebuf;
					break;
				}
			};
			for (var key in funcs){
				flen=key.length;
				if(key.substr(0,flen)==writebuf.substr(0,flen)){
					writebuf=writebuf.substr(writebuf.indexOf("(")+1);
					param=writebuf.substr(0,writebuf.indexOf(")"));
					writebuf=writebuf.substr(param.length+1);
					writebuf=funcs[key](param)+writebuf;
					break;
				}
			};
			for (var key in H[h]){
				val=H[h][key];
				flen=key.length;
				if(key.substr(0,flen)==writebuf.substr(0,flen)){
					writebuf=writebuf.substr(flen);
					writebuf=readable(key, val)+writebuf;
					break;
				}
			};
		}

		if(writebuf.match(/^\&\#[0-9]*\;/)){
			// HTML codes as &#0000; also counts.
			numofchars=writebuf.indexOf(";")+1;
		} else { numofchars=1; 
		}
		if((writebuf.match(/^\$\./))||(writebuf.match(/^\$\*/))){ //just null
			writebuf=writebuf.substr(2); 
			numofchars=0;
		}

		if(writebuf.match(/^\$INPUT/)){
			ask();
			writebuf=writebuf.substr(6); 
			numofchars=0;
		}

		if(writebuf.match(/^\$PLAY/)){
			writebuf=writebuf.substr(5);
			vst="";
			while(!writebuf.match(/^\$/)){
				vst+=writebuf.substr(0,1);
				writebuf=writebuf.substr(1);
			}
			writebuf=writebuf.substr(1);
			numofchars=0;
			goplay(vst);
		}

		if(writebuf.match(/^\$DIRECT/)){
			writebuf=writebuf.substr(7);
			vst="";
			while(!writebuf.match(/^\$/)){
				vst+=writebuf.substr(0,1);
				writebuf=writebuf.substr(1);
			}
			writebuf=writebuf.substr(1);
			numofchars=0;
			godirectto(vst);
		}

		if(writebuf.match(/^\$SETUP/)){
			writebuf=writebuf.substr(6);
			vst="";
			while(!writebuf.match(/^\$/)){
				vst+=writebuf.substr(0,1);
				writebuf=writebuf.substr(1);
			}
			writebuf=writebuf.substr(1);
			numofchars=0;
			gosetup(vst);
		}

		if(writebuf.match(/^ /)){
			var nbspout="";
			manychars=0;
			while(writebuf.match(/^ /)){
				nbspout+="&nbsp;";
				writebuf=writebuf.substr(1);
				curC++;if(curC==cols){nbspout+="<br>";curC=1;}
			}
			curC--;
			numofchars=nbspout.length;
			writebuf=nbspout+writebuf;
		}

		if(writebuf.match(/^\$n/)){
			writebuf="<br>"+writebuf.substr(2);
			numofchars=4;
		}

		makechar(writebuf.substr(0,numofchars));
		writebuf=writebuf.substr(numofchars); 
		clicksound();
	}
	doCoreEveryFrame();	
}

function reducePage(){
	var htmlarr=oldtxt.innerHTML.split("<br>");
	if(htmlarr.length<rows){return;}
	htmlarr=htmlarr.slice(htmlarr.length-rows,htmlarr.length);
	oldtxt.innerHTML=htmlarr.join("<br>"); 
}

function jumptoold(){
	oldtxt.innerHTML+=this.innerHTML;
	//this.removeEventListener("animationend",jumptoold,false);
	txtsc.removeChild(this);
}

function createGlowChar(chartxt){
	var nc=document.createElement("span");
	nc.className="glow";
	nc.innerHTML=chartxt;
	nc.addEventListener("animationend", jumptoold, false);
	txtsc.appendChild(nc);
}

var curI=1;
var curC=1;


function makechar(chartxt) {

	if(chartxt==" ")chartxt="&nbsp;";

	if(boldmode){chartxt="<b>"+chartxt+"</b>";}
	if(underlinemode)
	{chartxt="<u>"+chartxt+"</u>";}

	curI++;
	curC++;
	manychars=1;
	if(curC == cols){
		chartxt+="<br>";
	}

	createGlowChar(chartxt);

	if((chartxt.match(/^\<br\>/))||(chartxt.match(/\<br\>$/))){
		curC=1;
		reducePage();
		//cursor.scrollIntoView();
		baseframe.scrollTop = parseInt(baseframe.scrollHeight)
	}

}


var box;
var inputout;
var typequestcarrier=[];
var optlist=[];
var varlist=[];



function ask(){ // goinput
	pause=true;
	if(typequestcarrier[0]=="string"){
		box=document.createElement("input");
		inputtype="text";
		box.style="position:absolute;top:-200px;";
		box.onkeyup=function(event){
			writeinput();
		};
		box.onkeydown=function(event){
			if(event.keyCode==13){
				document.body.onclick=function(event){};
				vars[varlist[0]]=box.value;
				varlist.shift();
				//			xwrite(" ");
				pause=false;
				document.body.removeChild(box);
				oldtxt.innerHTML+=inputout.innerHTML;
				txtsc.removeChild(inputout);
			}
		};
		document.body.appendChild(box);

		document.body.onclick=function(event){
			box.focus();
			document.body.className="";
		};

		if(ismobile){
			document.body.className="attention";
		}else{
			box.focus();
		}
		inputout=document.createElement("span");
		//inputout.className="glow";
		inputout.style="word-break:break-all;";
		txtsc.appendChild(inputout);
	}

	if(typequestcarrier[0]=="object"){
		makeopts(optlist[0]);
	}


	optlist.shift();    
	typequestcarrier.shift();
}

var echoopt;
function input(quest,typequest,varname){

	echoopt=true;
	if(typeof typequest=="string"){varname=typequest;typequest="";echoopt=false;}
	optlist.push(typequest);
	varlist.push(varname);
	typequestcarrier.push(typeof typequest);
	write(quest+"$INPUT");
	if(varname!="vartoset"){play(varname);}
}

var catcarrier=[];

function categories(varname){
	screenSequence[2]="categories("+varname+")";
	typequest=varname=="buy"?getBuyables():varname=="sell"?getSaleables():getEquipables();
	catcarrier[0]=typequest;
	catcarrier[1]=varname;
	typequest=getCategories(typequest);
	if(typequest.length==0){
		var out=varname=="buy"?"$nNothing here for you.$n":varname=="sell"?"$nNothing to sell.$n":"$nNothing to equip.";
		write(out);
		directto(screenSequence[1]);return;
	}
	previousmenu=screenSequence[1];
	silentBack=true;
	var spacer=backed?"":" ";backed=false;
	input(spacer,[backstring].concat(typequest),"gocategory");
}

function gocategory(cat){
	screenSequence[3]="gocategory("+cat+")";
	subcats=[];
	for(var i in catcarrier[0]){
		if(getCategory(catcarrier[0][i])==cat){subcats.push(getSubCategory(catcarrier[0][i]));}
	}
	subcats=deleteRepeated(subcats);
	if(subcats.length==0){directto(screenSequence[2]);return;}
	previousmenu=screenSequence[2];
	silentBack=true;
	var spacer=backed?"":" ";backed=false;
	input(spacer,[backstring].concat(subcats),"gosubcat");
}

function gosubcat(subcat){
	screenSequence[4]="gosubcat("+subcat+")";
	var selitems=[];
	for(var i in catcarrier[0]){
		if(getSubCategory(catcarrier[0][i])==subcat){selitems.push(catcarrier[0][i]);}
	}
	if(selitems.length==0)
	{directto(screenSequence[3]);return;}
	previousmenu=screenSequence[3];
	silentBack=true;
	showbuycaption();
	if(catcarrier[1]!="sell"){
		showcase(selitems);
	}else{br();}
	input("",[backstring].concat(selitems),
			catcarrier[1]);
}

function showbuycaption(){
	write("$n"+H[h].name+" : "+money(H[h].cash)+
			" : Storage: "+getFreeStorage());
}

function init(){
} init();

function play(vst){
	write("$*$PLAY"+vst+"$");
}

var silentClick=false;
var silentBack=false;
var backed=false;

function goplay(vst){
	val=vars[vst];
	if(val==backstring){if(!silentBack){xwrite(backstring);}
		silentBack=false;silentClick=false;backed=true;
		directto(previousmenu);return;
	};
	if((isDefined(val))&&(echoopt)&&(!silentClick)){
		xwrite(val+".");
	}
	silentBack=false;silentClick=false;
	toeva=vst+"('"+makeEscape(val)+"');"
		eval(toeva);
}

function makeEscape(str) {
	if(!isDefined(str)){return false;}
	str=str.replace(/"/g, '\\\"');
	str=str.replace(/'/g, '\\\'');
	//  str=str.replace(/\(/g, '\\\(');
	//  str=str.replace(/\)/g, '\\\)');
	return str;
}

function directto(vst){
	vst=vst.replace(/\(/,"(\'");
	vst=vst.replace(/\)$/,"\')");
	write("$*$DIRECT"+vst+"$");
}

function godirectto(vst) {
	eval(vst);
}

function setup(vst){
	write("$*$SETUP"+vst+"$");
}

var varnamecarrier;
var previousmenu;
var currentmenu;
var screenSequence=[];

function gosetup(vst){
	val=vars[vst];
	if(val==backstring){write(backstring);directto(previousmenu);return;};
	if(isDefined(val))xwrite(val);
	varnamecarrier=val;
	vartype=eval("typeof "+val);
	//////// Do for other types besides bol.:
	if(vartype == "boolean"){
		input(" ",["On","Off"],"setupchange");
		play("setupchange");
	}
	directto(currentmenu);
}

function setupchange(vst){
	if(vst=="On"){eval(varnamecarrier+"=true;");};
	if(vst=="Off"){eval(varnamecarrier+"=false;");};
	//write(".");
}

function writeinput(){
	inputout.innerHTML=towbrs(box.value);
}

function towbrs(str){
	//str=str.replace(/(.)/g,"$1<wbr>");
	return str;
}

function write(txt){
	writebuf+=txt;
}

function center(txt){
	var ipos=Math.floor((cols/2)-(txt.length/2));
	var spc="";
	while(spc.length<ipos){
		spc+=" ";
	}
	write(spc+txt);
}

function centerunderline(txt,sch){
	if(!sch){sch="=";}
	var ipos=Math.floor((cols/2)-(txt.length/2));
	var spc="";
	var und="";
	while(spc.length<ipos){
		spc+=" ";
	}
	while(und.length<txt.length){
		und+=sch;
	}
	write(spc+txt+"$n"+spc+und+"$n");
}

function centerbox(txt,sch){
	if(!sch){sch="=";}
	txt=txt.split("$n");
	var big=0;
	for(var i in txt){
		if(txt[i].length>big){big=txt[i].length;}
	}
	big+=2;
	var lr=0;
	for(var i in txt){
		while(txt[i].length<big){
			lr=lr?0:1;
			txt[i]=lr?" "+txt[i]:txt[i]+" ";
		}
	}
	for(var i in txt){
		txt[i]="|"+txt[i]+"|";
	}
	big+=2;
	var ipos=Math.floor((cols/2)-(big/2));
	var spc="";
	var und="";
	while(spc.length<ipos){
		spc+=" ";
	}
	while(und.length<big){
		und+=sch;
	}
	var towrite=spc+und+"$n";
	for(var i in txt){
		towrite+=spc+txt[i]+"$n";
	}
	towrite+=spc+und+"$n";
	write(towrite);
}

function fullline(txt,ln){
	if(txt){txt=" "+txt+" "}else{txt="";}
	ln=ln?ln:"-";
	var lr=0;
	while(txt.length<cols-1){
		lr=lr?0:1;
		txt=lr?ln+txt:txt+ln;
	}
	write(txt);
}

function underline(str,sch){
	if(!sch){sch="=";}
	strsplit=str.split("");
	undl="";
	for (var i in strsplit){
		undl+=sch;
	}
	str=str+"$n"+undl+"$n";
	return str;
}

function xwrite(txt){
	writebuf=txt+writebuf;
}

var inputanimating=false;
var scrollblink;

//var pin = document.createElement("div");
//pin.style="position:absolute;border:0;height:10px;width:10px;margin-bottom:-10px;top:0;background:red;";
//txtsc.appendChild(pin);

function makeopts(list){
	list=excludeEmptyIndexes(list);
	inputout=document.createElement("span");
	inputout.className="buttonsarea";
	list.forEach(function(val){
			box=document.createElement("span");
			box.innerHTML=val;
			box.className="button";
			box.onclick=function(event){
			vars[varlist[0]]=this.innerHTML;
			varlist.shift();
			inputout.style.opacity=0;
			inputout.style.maxHeight=0;
			inputout.style.maxWidth=0;
			inputout.style.marginTop="8px";
			inputout.style.marginBottom="-12px";
			setTimeout(
					function(){
					txtsc.removeChild(inputout);
					pause=false;
					}
					, 1000);
			};
			inputout.appendChild(box);
			});
	inputout.addEventListener("animationend", function(){
			inputanimating=false;
			if(inputout.scrollHeight>parseInt(window.getComputedStyle(inputout).height)){
			if(!scrollblink){
			scrollblink=document.createElement("div");
			scrollblink.style="position:absolute;top:0;right:0;color:rgb(25,100,25);cursor:default;";
			scrollblink.innerHTML="&bullet;";
			inputout.appendChild(scrollblink);
			inputout.onscroll=function(){
			thisH=parseInt(window.getComputedStyle(inputout).height);
			totH=this.scrollHeight;
			curSc=this.scrollTop;
			maxSc=totH-thisH;
			scrollblink.style.top=((curSc/maxSc)*(totH-parseInt(window.getComputedStyle(scrollblink).height)))+"px";
			}
			}
			}
			//curheight=parseInt(document.getElementById("baseframe").scrollHeight)-10;
			//if(curheight>parseInt(pin.style.top)){                pin.style.top=curheight+"px";                }
			}, false);
	txtsc.appendChild(inputout);
	inputanimating=true;
}

///////////////////////////////////////////////////////////////////////////
// Done with layout and drawings, we need some helpfull functions so we can
// interact with our terminal. SECOND PART:

// Some globals for the second part, the user interface/interaction.
var waiting=false;
var inchars="";
var invaropt="";
var singlechar=false;

var thinkloading=false;

// Call this if you want to add other elements, rather than text, to the bottom of the screen.
// This will not count as character col nor will be nicelly typed.
// Works well for invisible HTML elements when needed.
function simplewrite(txt){
	txt=txt.replace(/\n/g,"<br>");
	txtsc.innerHTML+=txt;
}

// Changes the cursor content.
function docursor(str){
	cursor.innerHTML=str;
}

// This puts a image, intended to be a small avatar or ilustration, within the terminal text.
function writeimg(ffile){
	makechar("<img src='"+ffile+"' style='max-width:"+miniimgsize[0]+"px;max-height:"+miniimgsize[1]+"px;vertical-align:middle;'>");
}

/////// Helpers

function niceList(arr){
	return niceTable(arr);
}

function niceListLetterOption(arr){
	var out="";
	var c1l=0;
	var c2l=0;
	var thl="";
	var spc="";
	var curc=0;
	var emp1="";
	var emp2="";
	var aline="";
	var separator=" : "
		var thl1="";
	var thl2="";
	for (var i in arr){
		if(arr[i][0].length>c1l)
		{c1l=arr[i][0].length;}
		if(arr[i][1].length>c2l)
		{c2l=arr[i][1].length;}
	}
	while(emp1.length<c1l+separator.length){
		emp1+=" ";
	}
	while(emp2.length<c2l+separator.length){
		emp2+=" ";
	}
	for (var i in arr){
		thl=arr[i][0];
		spc="";
		while(thl.length<c1l)
		{thl+=" ";spc+=" ";}
		thl1=spc+arr[i][0];

		thl=arr[i][1];
		spc="";
		while(thl.length<c2l)
		{thl+=" ";spc+=" ";}
		thl2=spc+arr[i][1];

		aline=thl1+separator+thl2+separator+arr[i][2];
		j=0;
		curc=0;
		while(j<aline.length){
			curc++;
			if(curc==cols-1){
				aline=aline.substring
					(0,curc+j-cols-1)+"$n"
					+emp1+aline.substring
					(curc+j-cols-1);
				curc=(emp1).length;
				j+=(emp1).length-1;
			}
			j++;
		}
		out+=aline+"$n";
	}
	write(out);
	return out;
}

function niceTable(arr){
	var out="";
	var c1l=0;
	var thl="";
	var spc="";
	var curc=0;
	var emp="";
	var aline="";
	var separator=" : "
		for (var i in arr){
			if(arr[i][0].length>c1l)
			{c1l=arr[i][0].length;}
		}
	while(emp.length<c1l+separator.length){
		emp+=" ";
	}
	for (var i in arr){
		thl=arr[i][0];
		spc="";
		while(thl.length<c1l)
		{thl+=" ";spc+=" ";}
		thl=spc+arr[i][0];
		aline=thl+separator+arr[i][1];
		j=0;
		curc=0;
		while(j<aline.length){
			curc++;
			if(curc==cols-1){
				aline=aline.substring
					(0,curc+j-cols-1)+"$n"
					+emp+aline.substring
					(curc+j-cols-1);
				curc=emp.length;
				j+=emp.length-1;
			}
			j++;
		}
		out+=aline+"$n";
	}
	write(out);
	return out;
}

function br(a){
	a=a?a:1;
	var i=0;
	while(i<a){
		write("$n");
		i++;
	}
}
