window.onload=function(){pers_core_init();};

var gameison;
var backstring="[back]";
var addstring="[add]";
var removestring="[remove]";
var unsetstring="[unset]";

function createEmptyCharacter () {
    H.push(cloneObject(baseH));
    h=H.length-1;
    H[h].birthday=hrpg.day;
}

function createHouse() {
    local.push(cloneObject(baseLocal));
    var k = local.length-1;
    local[k].name=H[h].name+"'s";
    local[k].description="Where _hesheyou("+h+") live_s.";
    local[k].gps=H[h].home;
    local[k].isPrivate=true;
    H[h].houseObject=local[k];
}

var optscreens=[{
	name:"main",
	caption:"$nHRPG$nMain Menu$n",
	options:["Continue","New Game","Create Character","Edit Character","Setup"],
	links:["continuegame","newgame","characterCreation","characterEdition","gamesetup"]
},{
    name:"charcreation",
	caption:"$nCharacter Creation",
	options:[backstring,"Name","Description","Age","Sex","Race","Body Type","Body Parts","Hobbies","Traits","Adjectives","Home","In Game?"],
	links:["","setname","setdescription","setage","setsex","setrace","setbodytype","setbodyparts","sethobbies","settraits","setadjectives","sethome","setinGame"]
}];

/////////////////////////////////////

function menu(mu){
	myobj=getObjectByName(optscreens,mu);
	toplay=mu+"menu";
	previousmenu="backandsave()";
    currentmenu="menu(charcreation)";
	input("$n"+myobj.caption+"$n",myobj.options,toplay);
}
function mainmenu(str){
    mylink=getLinkFromOptionMenu("main",str);
    play(mylink);
}
function charcreationmenu(str){
    mylink=getLinkFromOptionMenu("charcreation",str);
    play(mylink);
}
function newgame(){
    input("$nNew game. Are you sure you want to erase all your records? ",["Yes","No"],"newgameopt");
}
function newgameopt(yon){
    if(yon=="No"){menu("main");}else{newGame();}
}
function gamesetup(){
    if(setupable[0]!=backstring){setupable.unshift(backstring);};
    input("$nVariable: ",setupable,"vartoset");
    previousmenu="menu(main)";
    currentmenu="gamesetup()";
    setup("vartoset");
}
function characterCreation(){
    createEmptyCharacter();
    menu("charcreation");
}
function characterEdition(){
	var chlist=getObjectsNames(H);
	if(chlist.length){
    	input("$nChoose character to edit: ",chlist,
    		"goEditCharacter");
	}else{
	    write("$nThere is no character to edit.");
        directto("menu(main)");
	}
}
function goEditCharacter(chname){
	h=getIndexByName(H,chname);
	menu("charcreation");
}
function getIndexByName(obj,name){
	for(var i in obj){
		if(obj[i].name.toLowerCase()==
			name.toLowerCase()){
				return i;
		}
	}
	return false;
}
function setname(){
    var nametxt=H[h].name==""?"Set name: ":"_name - new name: ";
    input("$n"+nametxt,"gosetname");
}
function gosetname(newname){
    if(countOcurrenceInArray(getObjectsNames(H),newname)){
        write("$nThis name is already taken.");
        directto("setname()");
        return;
    };
    if(newname!=""){H[h].name=newname;}
    else{write("_name (kept).");}
    directto(currentmenu);
}
function setdescription(){
    var nametxt=H[h].name==""?"C":"_name's c";
    input("$n"+nametxt+"urrent description:$n_description$n$nNew description: ","gosetdescription");
}
function gosetdescription(newdesc){
    if(newdesc!=""){H[h].description=newdesc;}
    else{write("(Previous description kept.)");}
    directto(currentmenu);
}
function setsex(){
    var nametxt=H[h].name==""?"Define":"_name's new";
    var current=H[h].sex==""?"":" (currently _sex)";
	input("$n"+nametxt+" sex"+current+": ",getObjectsNames(sex),"gosetsex");
}
function gosetsex(newsex){
    write("$n"+getDescription(sex,newsex));
    exchangeBodyParts(sex,H[h].sex,newsex);
    H[h].sex=newsex;
	directto(currentmenu);
}
function setage(){
    var nametxt=H[h].name==""?"Define":"_name's new";
    var current=H[h].age==0?"":" (currently _age)";
	input("$n"+nametxt+" age"+current+": ","gosetage");
}
function gosetage(newage){
    if(newage!=""){H[h].age=parseInt(newage);}
    else{write("_age (kept).")}
    directto(currentmenu);
}
function sethome(){
    var nametxt=H[h].name==""?"Set coordinates for":"_name's new";
    var current=H[h].home.length==0?"":" (currently _home)";
	input("$n"+nametxt+" home"+current+". x,y: ","gosethome");
}
function gosethome(newhome){
    if(newhome!=""){
        H[h].home=newhome.split(",");
        H[h].home[0]=round(H[h].home[0],2);
        H[h].home[1]=round(H[h].home[1],2);
    }else{ write("_home (kept)."); }
    directto(currentmenu);
}
function setinGame(){
    input("$nIn game? (currently _inGame) ",["Yes","No"],"gosetinGame");
}
function gosetinGame(isitinGame){
    isitinGame=isitinGame=="Yes"?true:false;
    H[h].inGame=isitinGame;
    directto(currentmenu);
}
function settraits(){
    [unused,used]=[getUnusedTraits(),getUsedTraits()];
    if(unused+used==0){write(" None to choose.");directto(currentmenu);return;}
    var nametxt=H[h].name==""?"Define":"_name's";
	input("$n_"+nametxt+" traits "+
		"(currently _traits): "
		,["Add","Remove"],"addorremovetraits");
}
function addorremovetraits(addorrem){
	if(addorrem=="Add"){
		input("$nChoose new trait: ",
			getUnusedTraits(),"goaddtrait");
	}
	if(addorrem=="Remove"){
		input("$nChoose to remove: ",
			getUsedTraits(),"goremovetrait");
	}
}
function goaddtrait(newtrait){
    write("$n"+getDescription(trait,newtrait));
    H[h].traits.push(newtrait);
    directto(currentmenu);
}
function goremovetrait(oldtrait){
    write(" Removed.");
	H[h].traits=removeItem(H[h].traits,oldtrait);
	directto(currentmenu);
}
function sethobbies(){
    [unused,used]=[getUnusedHobbies(),getUsedHobbies()];
    if(unused+used==0){write(" None to choose.");directto(currentmenu);return;}
    
    var nametxt=H[h].name==""?"Define":"_name's";
    input("$n_"+nametxt+" hobb"+isPluralYIes(H[h].hobbies)+" "+
		"(currently _hobbies): "
		,["Add","Remove"],"addorremovehobbies");
}
function addorremovehobbies(addorrem){
	if(addorrem=="Add"){
		input("$nChoose new hobby: ",
			getUnusedHobbies(),"goaddhobby");
	}
	if(addorrem=="Remove"){
		input("$nChoose to remove: ",
			getUsedHobbies(),"goremovehobby");
	}
}
function goaddhobby(newhobby){
    write("$n"+getDescription(item,newhobby));
    H[h].hobbies.push(newhobby);
    directto(currentmenu);
}
function goremovehobby(oldhobby){
    write(" Removed.");
	H[h].hobbies=removeItem(H[h].hobbies,oldhobby);
	directto(currentmenu);
}
function setadjectives(){
    var nametxt=H[h].name==""?"Set":"_name's";
	input("$n"+nametxt+" adjectives "+
		"(currently _adjectives): "
		,["Add","Remove"],"addorremoveadjectives");
}
function addorremoveadjectives(addorrem){
	if(addorrem=="Add"){
		input("$nType new adjective: ",
			"goaddadjective");
	}
	if(addorrem=="Remove"){
		input("$nChoose to remove: ",
			getAdjectives(),"goremoveadjective");
	}
}
function goaddadjective(newadj){
	newadj=newadj.toLowerCase();
 H[h].adjectives.push(newadj);
 directto(currentmenu);
}
function goremoveadjective(oldadj){
	H[h].adjectives
		=removeItem(H[h].adjectives,oldadj);
	directto(currentmenu);
}
function setrace(){
    var nametxt=H[h].name==""?"Set":"_name's new";
	input("$n"+nametxt+" race: ",getObjectsNames(race),"gosetrace");
}
function gosetrace(newrace){
    write("$n"+getDescription(race,newrace));
    exchangeBodyParts(race,H[h].race,newrace);
    H[h].race=newrace;
	directto(currentmenu);
}
function setbodytype(){
    var nametxt=H[h].body.type==""?"Set":"_name's new";
    previousmenu="menu(charcreation)";
	input("$n"+nametxt+" body type: ",[backstring].concat(getAvailableBodyTypes()),"gosetbodytype");
}
function gosetbodytype(newbt){
    write("$n"+getDescription(bodyType,newbt));
    H[h].body.type=newbt;
	directto(currentmenu);
}
function setbodyparts(){
    var needed=[];
    if(H[h].race==""){        needed.push("race");    }
    if(H[h].sex==""){        needed.push("sex");    }
    if(needed.length>0){
        write("$nYou need to set "+comaList(needed)+" first.");
        directto(currentmenu); return;
    } 
    previousmenu="menu(charcreation)";
    var bpmenu=[backstring];
    if(getObjectByName(race,H[h].race).modifiable){bpmenu.push(addstring,removestring);}
    bpmenu=bpmenu.concat(getCustomizableBodyParts());
    input("$nChoose body part to customize: ",bpmenu,"custombody");
}
var lastBodyPart="";
function custombody(bodyparttocustom){
    previousmenu="setbodyparts()";
    if(bodyparttocustom==addstring){directto("addbodypart()"); return;}
    if(bodyparttocustom==removestring){directto("removebodypart()"); return;}
    if(lastBodyPart!=bodyparttocustom){write("$n"+getDescription(bodyPart,bodyparttocustom));}
    lastBodyPart=bodyparttocustom;
    var customlist=[backstring].concat(getCustomNames(bodyparttocustom));
    input("$nCustoms: ",customlist,"choosecustom");
}
var lastCustom="";
function choosecustom(bpcustom){
	lastCustom=bpcustom;
    var optlist=getCustomOptions(lastBodyPart,bpcustom);
    input(" Option: ",optlist,"definecustom");
}
function definecustom(optcustom){
    var bpset=getObjectByName(H[h]["body"]["part"],lastBodyPart);
    var cuset=getObjectByName(bpset.custom,lastCustom);
    if(!cuset){bpset.custom.push({name:lastCustom,value:optcustom});}
    else{cuset.value=optcustom;}
    directto("custombody("+lastBodyPart+")");
}
function addbodypart(){
    input("$nChoose a body part to add: " ,
        [backstring].concat(getAvailableBodyPartsToAdd()), "goAddBodyPart");
}
function goAddBodyPart(bpn){
    if(bpn==backstring){directto("setbodyparts()");return;}
    addSingleBodyPart(bpn);
    directto("addbodypart()");
}
function removebodypart(){
    input("$nChoose a body part to remove: " ,
        [backstring].concat(getRemovableBodyParts()), "goRemoveBodyPart");
}
function goRemoveBodyPart(bpn){
    if(bpn==backstring){directto("setbodyparts()");return;}
    removeSingleBodyPart(bpn);
    directto("removebodypart()");
}

//////////////////////////////////////

function personalProfile(){
    niceTable([ ["Description", sOr(H[h].description,"-")],
                ["Age",         sOr(H[h].age,"not defined")],
                ["Sex",         sOr(firstCap(H[h].sex),"-")],
                ["Birthday",    sOr(H[h].birthday,"not defined")],
                ["Race",        sOr(firstCap(H[h].race),"-")],
                ["Hobb"+isPluralYIes(H[h].hobbies),      sOr(firstCap(comaList(H[h].hobbies)),"-")],
                ["Trait"+isPlural(H[h].traits),         sOr(firstCap(comaList(H[h].traits)),"-")],
                ["Adjective"+isPlural(H[h].adjectives), sOr(firstCap(comaList(H[h].adjectives)),"-")],
                ["Home",        sOr(H[h].home[0],"-")+", "+sOr(H[h].home[1],"-")]
    ]);
}
function bodyProfile(){
    write("$nBody:$n");
    var tab=[];
    tab.push(["Type",H[h].body.type]);
    for(var i in H[h].body.part){
        tab.push([H[h].body.part[i].name,sOr(firstCap(getCustomsString(H[h].body.part[i])),"no customs")]);
    }
    niceTable(tab);
}
function powerProfile(){
    write("$nPowers:$n");
    niceTable([
        ["Exp",H[h].exp],
        ["HP",H[h].hp+"/"+H[h].hpMax],
        ["MP",H[h].mp+"/"+H[h].mpMax],
        ["XP",H[h].sp+"/"+H[h].spMax],
        ["Attack",H[h].attack],
        ["Defense",H[h].defense]
    ]);
}

//////////////////////////////////////

function backandsave(){
    var faults=checkfaults();
    if(faults==false){
   			 	br(2);
    				spitSave();
    				fullline(H[h].name);
    				br();
        personalProfile();
        bodyProfile();
        powerProfile();
        directto("menu(main)");
    }else{
        write("$nYou need to set "+comaList(faults)+" to proceed.");
        input ("$nDo you want to discard the character? ",["Yes","No"],"discardcharacterornot");
    }
}
function discardcharacterornot(yon){
    if(yon=="Yes"){
        tname=H[h].name==""?"":H[h].name+" ";
        write("$nCharacter "+tname+"cancelled."); H.pop(); directto("menu(main)");
    }
    if(yon=="No"){
        directto("menu(charcreation)"); 
    }
}
function checkfaults(){
    var faultlist=[];
    if(H[h].name==""){faultlist.push("name");}
    if(H[h].sex==""){faultlist.push("sex");}
    if(H[h].race==""){faultlist.push("race");}
    if(H[h].body.type==""){faultlist.push("body type");}
    if(H[h].age==0){H[h].age=getran(18,25,1);}
    [a,b,c,d]=getMapSize();
    if(H[h].home.length==0){H[h].home=[getran(a,c),getran(b,d)];}// Check if address is unique (to do).
    fillCustomDefaults();
    createHouse();
    if(faultlist.length==0){return false;}
    return faultlist;
}
function fillCustomDefaults(){
    var pass;
    for(var i in H[h].body.part){
        var pname=H[h].body.part[i].name;
        var soset=H[h].body.part[i].custom;
        var hasto=getCustomNames(pname);
        var defset=[];
        for(var j in hasto){
        	pass=false;
        	for (var k in soset){
        		if(soset[k].name==hasto[j]){
              		pass=true;
        		}
        	}
        	if(!pass){
        		defset=
        		getObjectByName(bodyPart,pname)
        		.customdefaults[j];
        		if((defset=="random")||(defset=="")
        		||(!isDefined(defset))){
        			defset=
        			getCustomOptions(pname,hasto[j]);
        			defset=
        			defset[getran(0,defset.length-1,1)];
        		}
        		if(!isDefined(H[h].body.part[i]
        		.custom[j])){
        			H[h].body.part[i].custom[j]={};
        		}
        		H[h].body.part[i].custom[j]={name:hasto[j],value:defset};
        	}
        }
    }
}

//////////////////////////////////////

function pers_core_init(){
    h=H.length-1;
    for(var i in H){
        local.push(H[h].houseObject);
    }
    // centerbox("HRPG$n---------------$n"+H.length+" character"+isPlural(H)+"$n"+item.length+" item"+isPlural(item)+"$n"+local.length+" local"+isPlural(local)+"");
    menu("main");
    gameison=true;
}
function doCoreEveryFrame(){
   // boo..? 
}
function newGame(){
    pause=true;
    var http = new XMLHttpRequest();
    http.open("POST", "cgi-bin/save.pl", true);
    http.send("");
    http.onload = function() {
        pause=false;
        write("$n$n$n$n$n$n$n$n$n$nAll data erased. "+
       	 "Reestarting.");
        setTimeout(function(){ 
        	location.reload(true); }
        , 5000);
    }
}

//////////// SAVING RELATED:
function spitSave(){

    outstr="";
    for(isave=0;isave<tosave.length;isave++){
        outstr+=vartojson(tosave[isave]);
    }

				pause=true;
    var http = new XMLHttpRequest();
    http.open("POST", "cgi-bin/save.pl", true);
    http.send(outstr);
    http.onload = function() {
        pause=false;
        write("$n");
        fullline("Saved.");
    }
}
function vartojson(thevar){
		ret="var "+thevar+" = ";
		ret+=JSON.stringify(eval(thevar));
		ret+=";\r";
		return ret;
}
function saveVar(thevar){
    os="";
    os+="var "+thevar+"=";
    vartosave=window[thevar];
    if(vartosave instanceof Object){
        os+="[";
        for (var key in vartosave) {
			var obj = vartosave[key];
			if(obj instanceof Object){
    			os+="{\n";
                objobjcount=0;
    			for (var prop in obj) {
    				if (obj[prop] instanceof Array) {
    					os+=prop+":[";
    					for(ari=0;ari<obj[prop].length;ari++){
    						if((isNumber(obj[prop][ari]))||(isNull(obj[prop][ari]))){quotes="";}else{quotes="\"";}
    						os+=quotes+makescape(obj[prop][ari])+quotes+",";
    					}
    					os=os.substr(0,os.length-1);
    					os+="],";
    				} else {
    				    if((isNumber(obj[prop]))||(isNull(obj[prop]))||(obj[prop] instanceof Object)){quotes="";}else{quotes="\"";}
    				    if(obj[prop] instanceof Object){
    				        os+=objobjcount+":{";objobjcount++;
    				        for(var prop2 in obj[prop]){
    				            if(isNumber(obj[prop][prop2])||(isNull(obj[prop][prop2]))){quotes="";}else{quotes="\"";}
    				            os+=prop2+":"+quotes+obj[prop][prop2]+quotes+",";
    				        }
    				        os=os.substr(0,os.length-1);
    				        os+="},";
    				    }else{
    					    os+=""+prop+":"+quotes+(makescape(obj[prop]+""))+quotes+",";
    				    }
    				}
    			}
    			os=os.substr(0,os.length-1);
    			os+="\n},";
            }else{
				if((isNumber(obj))||(isNull(obj))){quotes="";}else{quotes="\"";}
				os+=quotes+makescape(obj)+quotes+",";
            }
		}
		os=os.substr(0,os.length-1);
		os+="];\n";
	} else {
        os+=vartosave+";\n";
    }
    os=os.replace(/\=\]/g,"=[]");
    return os;
    
	function makescape(lien){
			lien = lien.replace(/\'/g,"\\\'");
			lien = lien.replace(/\"/g,"\\\"");
			return lien;
	}
}

///////////////////////////////

var inGame=[];
var place={};

function continuegame(){
    inGame=getInGameIndexes();
    h=inGame[0]; /// make it Random? Save h?
    //H[h].local=H[h].home;
    H[h].local=[0,0];
    game();
}

function checkPlace(){
    var description="";
    for(var i in local){
        if((H[h].local[0]==local[i].gps[0])&&(H[h].local[1]==local[i].gps[1])){
            place=local[i];
            break;
        }
    }
    if(place.name){
        write("$nYou are "+(place.name.match(H[h].name)?"home":"at "+place.name)+". "+place.description+"$n");
        if(place.isStore){
            previousmenu=screenSequence[0];
            screenSequence[1]="checkPlace()";
            input("",[backstring,"Buy","Sell","Equip"],"buysellequip");
        }
        return true;
    }
    return false;
}

function buysellequip(bse){
    backed=false;
    if(bse=="Buy"){ categories("buy"); }
    if(bse=="Sell"){ categories("sell"); }
    if(bse=="Equip"){ directto("equip"); }
}

var carrier="";
var forcedelivery=false;

function buy(it){
    write(" "+getDescription(item,it));
    var itm=getObjectByName(item,it);
    forcedelivery=false;
    if(getFreeStorage()<calcSize(itm.size)){
        write("$nCannot carry, will need delivery.");
        forcedelivery=true;
    }
    carrier=it;
    var out=[];
        if(!foundOnArray(
        		itm.availableTo.sexes,
        		H[h].sex)){out.push(H[h].sex);}
        if(!foundOnArray(
        		itm.availableTo.races,
        		H[h].race)){out.push(H[h].race);}
        if(!foundOnArray(
        		itm.availableTo.bodyTypes,
        		H[h].body.type)){out.push(H[h].body.type);}
        if(!bodyPartPass(
        	itm.availableTo.bodyParts
        )){out.push("your body parts");}
        
        if(out.length>=1){out="$nNot for "+comaList(out)+".";}
        
        if(!forcedelivery){
    input(out+"$nCost: $ "+getCost(it)+". Confirm? ",["Yes","No"],"completeBuy");
    }else{
       write(out+"$n");
       
       niceList([["Cost",
       money(getCost(it))],["Delivery",
       money(calcDelivery())+
       ", "+calcDeliveryDays()+
       " days."],["Total",
       money(getCost(it)+calcDelivery())]]);
       input("Confirm? ",["Yes","No"],"completeBuy");
    }
}

function completeBuy(yn){
    if(yn=="Yes"){
        H[h].cash-=getCost(carrier);
        askForCustoms(carrier);
    }else{
       write(" No deal.");
       directto(screenSequence[4]);
    }
}

function askDelivery(){
   input("$nDelivery ("+money(calcDelivery())+", "+calcDeliveryDays()+" days)? ",["Delivery","Take"],"takeOrDelivery");
}

function takeOrDelivery(td){
   if(td=="Take"){
      mountItem(customobjcarrier.name);
      write("$nDone.");
   }
   if(td=="Delivery"){
      H[h].cash-=calcDelivery();
      hrpg.agenda.push([hrpg.day+
         calcDeliveryDays(),
         "deliver("+h+",\""+carrier+"\");"]);
      write("$nScheduled for day "+(hrpg.day+
         calcDeliveryDays())+". Done.");
   }
   directto(screenSequence[4]);
}

var custcount=0;
var customobjcarrier={};
var customarrcarrier=[];

function askForCustoms(it){
    customobjcarrier=
     cloneObject(getObjectByName(item,it));
    var customs=
     cloneObject(customobjcarrier.customize);
    for(var i in customs){
        customs[i]=customs[i].split(":");
    }
    input("$nSet "+customs[custcount][0]+": ",
    customs[custcount][1].split(";"),
    "defineCustom");
}

function defineCustom(custopt){
    customarrcarrier.push({name:(customobjcarrier.customize[custcount]).replace(/\:.*/,""),value:custopt});
    custcount++;
    if(custcount
    >=customobjcarrier.customize.length){
        if(!forcedelivery){askDelivery();}
        else{takeOrDelivery("Delivery");}
        custcount=0;
        return;
    }
    askForCustoms(customobjcarrier.name);
}

function mountItem(it){
    var mountobj=
     cloneObject(getObjectByName(item,it));
    mountobj.equipped=false;
    mountobj.location_body=true;
    mountobj.location_home=false;
    mountobj.custom=customarrcarrier;
    H[h].item.push(mountobj);
    customobjcarrier={};
    customarrcarrier=[];
}

function unmountItem(it,ind){
    if(!isDefined(ind)){ind=0;}
    H[h].item=
     removeOccurrenceByName(H[h].item,it,ind);
    if(!hasAnother(it)){catcarrier[0]=
     removeOccurrence(catcarrier[0],it,ind);}
}

function sell(it){
    carrier=it;
    var many=countHowMany(it);
    if(many>1){
        showSameNameItems(it);
        input("",letterList(many),
         "mountedItemLetterChoice");
        return;
    }
    write(" "+Capitular(getStateString(
     getObjectByName(H[h].item,it))+", "+
     getCustomsString(
     getObjectByName(H[h].item,it))+".$n"));
    input("Sell for $ "+calcSale(it)+"? ",
     ["Yes","No"],"completeSell");
}
var indcarrier=0;
function mountedItemLetterChoice(letter){
    var objind=letterToNumber(letter);
    indcarrier=objind;
    input(" Sell for $ "+
     calcSale(carrier,indcarrier)+"? ",
     ["Yes","No"],"completeSell");
}

function completeSell(yn){
    if(yn=="Yes"){
     H[h].cash+=
      parseFloat(calcSale(carrier,indcarrier));
     unmountItem(carrier,indcarrier);
     indcarrier=0;
    }
    directto(screenSequence[4]);
}

function equip(){
    input("$n??ggggg?",[backstring,"Put on","Take out"],"isequipdup");
}

function isequipdup(it){
    var many;
    if(many=countHowMany(it)>1){
        showSameNameItems(it);
        input("",letterList(many),"equipItemLetterChoice");
        return;
    }
    equiporunequip(it);
}

function equiporunequip(it){
    
}

function equipItemLetterChoice(it){
    
}

function equipaddorremove(){
    
}
