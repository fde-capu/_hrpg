window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

function getran(min,max,obs){
	var gr = ((Math.random()*(max-min))+min);
	gr=Math.round(gr*100)/100;
	if(obs){gr=Math.round(gr);}
	return gr;
}

function formattime(decim){
      var hrs = Math.floor(decim);
  var min = Math.round(decim%1*60);
  min = min<10 ? "0"+min : min.toString();
  return hrs+"h"+min+"";
}

function round(num, dec){
    if(!dec){dec=0;}
    var zeros=Math.pow(10,dec);
    return Math.round(num * zeros) / zeros;
}

function moneyFormat(num){
   num=toNumber(num);
    return twoDecimals(num);
}

function toNumber(a){
   return parseFloat(a);
 }

function where(){
   return H[h].local;
}

function home(){
   return H[h].home;
}

function calcDeliveryDays(){
   return 
    Math.floor(diagonal(where(),home())/2);
}

function calcDelivery(){
   var freight=diagonal(where(),home());
   freight=twoDecimals(
      (getCost(carrier)/10)*freight   );
   return toNum(freight);
}

function diagonal(a,b){
   var w=b[0]-a[0];
   var h=b[1]-a[1];
   var d=Math.sqrt((Math.pow(w,2))+(Math.pow(h,2)));
   return d;
}

function twoDecimals(num){
    return parseFloat(Math.round(num * 100) / 100).toFixed(2);
}

function formatMoney(num){
    return moneyFormat(num);
}

function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function isNull(n) {
    if(n==null){
	    return true;
    }else{
        return false;
    }
}

function timeNow(){
    var d = new Date();
    return parseInt(d.getTime()/1000);
}

function decimalFix(numb){
    return parseInt(numb*100)/100;
}

function isDefined(n) {
    if (typeof n !== 'undefined') {
        return true;
    }
    return false;
}

function dorep(atxt,it,forthat){
    
    while(atxt!=writebuf.replace(it,forthat)){
        atxt=atxt.replace(it,forthat);
    }
}

///////

function getObjectByName(obj,nm){
	for (var i in obj){
	    for (var k in obj[i]) {
	        if((isDefined(nm))&&(isDefined(obj[i].name))){ 
    	        if(obj[i].name.toLowerCase()==nm.toLowerCase()){return obj[i];}
	        }
	    }
	}
	return false;
}

function getLinkFromOptionMenu(menuname,opt){
    var myobj = getObjectByName(optscreens,menuname);
    for (var i in myobj.options) {
        if(myobj.options[i]==opt){return myobj.links[i];}
    }
    return false;
}

function getUnusedTraits(){
	var alltraits=getObjectsNames(trait);
	var untlist=[];
	for(var i in alltraits){
		if(!inArray(H[h].traits,alltraits[i])){
			untlist.push(alltraits[i]);
		}
	}
	return untlist;
}

function getUsedTraits(){
	return H[h].traits;
}

function getUsedHobbies(){
	return H[h].hobbies;
}

function getUnusedHobbies(){
	var allhobbies=getItemsNamesByType(item);
	var untlist=[];
	for(var i in allhobbies){
		if(!inArray(H[h].hobbies,allhobbies[i])){
			untlist.push(allhobbies[i]);
		}
	}
	return untlist;
}

function getItemsNamesByType(atype){
    atype="type_"+atype;
    var out=[];
    for(var i in item){
        if(item[i][atype]){out.push(item[i].name);}
    }
    return out;
}

function inArray(arr,vname){
	for(var i in arr){
		if(arr[i]==vname)return true;
	}
	return false;
}

function getAdjectives(){
	return H[h].adjectives;
}

function cloneObject(obj){
    return JSON.parse(JSON.stringify(obj));
}

function readable(prop,val){
	var out=val;
	if(prop=="name"){
	    out=H[h].name.trim();
	    if(val==""){out="undefined";} 
	}
	if(prop=="age"){
		out=val===0?"not set":val;
	}
	if(prop=="description"){
		out=val.length==0?"not set":val;
	}
	if(prop=="home"){
	    out=val.length==0?"not set":"["+val.join(",")+"]";
	}
	if((prop=="traits")||(prop=="adjectives")||(prop=="hobbies")
	){
		out=val.length==0?"none":comaList(val);
	}
	if(prop=="inGame"){
	    out=val?"yes":"no";
	}

	return out;
}

function comaList(arr){
	var out="";
	if(typeof arr=="object"){
		for(var i in arr){
			if(isDefined(arr[i])){
				out+=arr[i]+", ";
			}
		}
		out=out.replace(/, $/,"");
		
		var nameSplit = out.lastIndexOf(", ");
		if (nameSplit != -1) out = out.substr(0, nameSplit) + " and "+ out.substr(nameSplit + 2);
		
	}
	return out;
}

function firstCap(str){
    if(str==""){return "";}
	str=str.trim();
	str=str.substring(0,1).toUpperCase()+str.substring(1);
	return str;
}

function arrayList(arr) {
    var out="";
    for(var i in arr){
        out+=" - "+arr[i]+"$n";
    }
    out=out.replace(/\$\n$/,"");
    return out;
}

function addBodyParts(obj,objname) {
    var bplist=[];
    var bpnames=getObjectByName(obj,objname).bodyPartsPreset;
    for (var i in bpnames){
        if((objref=getObjectByName(bodyPart,bpnames[i]))&&(!getObjectByName(H[h].body.part,bpnames[i]))){
            bplist.push(cloneObject(objref));
            for(var j in bodyPartDetachedProperties){
                delete bplist[i][bodyPartDetachedProperties[j]];
            }
            for(var j in bodyPartAttachedProperties){
                bplist[i][bodyPartAttachedProperties[j][0]]=JSON.parse(JSON.stringify(bodyPartAttachedProperties[j][1])); /// to clone insted of point
            }
        }
    }
    
    H[h].body.part=H[h].body.part.concat(bplist);
    bpnames = getObjectsNames(bplist).concat(addAdjacentBodyParts(bpnames));
    return bpnames;
}

function addSingleBodyPart(bpn){
    var bp=[];
    if((objref=getObjectByName(bodyPart,bpn))&&(!getObjectByName(H[h].body.part,bpn))){
        bp.push(cloneObject(objref));
        for(var j in bodyPartDetachedProperties){
            delete bp[0][bodyPartDetachedProperties[j]];
        }
        for(var j in bodyPartAttachedProperties){
        	bp[0][bodyPartAttachedProperties[j][0]]
         =JSON.parse(JSON.stringify(
        	 bodyPartAttachedProperties[j][1]
         )); /// to clone insted of point
        }
    }
    
    H[h].body.part=H[h].body.part.concat(bp);
    var bpnames = getObjectsNames(bp).concat(addAdjacentBodyParts(bpnames));
    return bpnames;
    
}

function addAdjacentBodyParts(bpa){
    var out=[];
    for(var i in bodyPart){
        for(var j in bpa){
            if(bodyPart[i].isPartOf.toLowerCase()==bpa[j].toLowerCase()){
                out=out.concat(addSingleBodyPart(bodyPart[i].name));
            }
        }
    }
    return out;
}

function getObjectsNames(obj){
	var namelist=[];
	for (var i in obj){
		namelist.push(obj[i].name);
	}
	return namelist;
}

function countOcurrenceInArray(arr,name){
    var namecount=0;
    for(var i in arr){
        if(arr[i]==name){
            namecount++;
        }
    }
    return namecount;
}

function removeBodyParts(obj,objname){
    var myobj=getObjectByName(obj,objname);
    var itemtoremove=[];
    for (var i in myobj.bodyPartsPreset) {
        for (var j in H[h].body.part) {
            if(isDefined(H[h].body.part[j].name)){
                if(H[h].body.part[j].name.toLowerCase()==myobj.bodyPartsPreset[i].toLowerCase()){
                    itemtoremove.push(H[h].body.part[j].name);
                }
            }
        }
    }
    for (var i in itemtoremove) {
        H[h].body.part=removeSubObjByName(H[h].body.part,itemtoremove[i]);
    }
    return itemtoremove;
}

function removeItem(arr,itm){
	var retarr=[];
	for(var i in arr){
		if(arr[i]!=itm){retarr.push(arr[i]);}
	}
	return retarr;
}

function removeSubObjByName(obj,nameobj){
    var retarr=[];
    for (var i in obj){
        if(nameobj.toLowerCase()!=obj[i].name.toLowerCase()){
            retarr.push(obj[i]);
        }
    }
    return retarr;
}

function removeOccurrenceByName(obj,nameobj,ind){
    if(!isDefined(ind)){ind=0;}
    var icon=0;
    var removed=false;
        var retarr=[];
    for (var i in obj){
        
        if(nameobj.toLowerCase()!=obj[i].name.toLowerCase()){
            retarr.push(obj[i]);
        }
        if(nameobj.toLowerCase()==obj[i].name.toLowerCase()){
            if(icon==ind){removed=true;}else{
                retarr.push(obj[i]);    
            }
            icon++;
        }
    }
    return retarr;
}

function removeOccurrence(arr,itm,ind){
    if(!isDefined(ind)){ind=0;}
    var icon=0;
    var removed=false;
    	var retarr=[];
	for(var i in arr){
		if(arr[i]!=itm){retarr.push(arr[i]);}
		if(arr[i]==itm){
		    if(icon==ind){removed=true;}else{
		        retarr.push(arr[i]);
		    }
		    icon++;
		}
	}
	return retarr;
}

function getCustomizableBodyParts(){
    var bplist=[];
    var customtestlist=getObjectsNames(H[h].body.part);
    for (var i in customtestlist) {
        if(isDefined(getObjectByName(bodyPart,customtestlist[i]).customize)){
            if(getObjectByName(bodyPart,customtestlist[i]).customize.length!=0){
                bplist.push(customtestlist[i]);
            }
        }
    }
    return bplist;
}

function getCustomNames(bpname){
    var customs=
    	getObjectByName(bodyPart,bpname).customize;
    var copt=[];
    for (var i in customs){
        copt.push
        	(customs[i].replace(/\:.*$/,""));
    }
    return copt;
}

function getCustomOptions(bpname,bpopt){
	   var customs=
    	getObjectByName(bodyPart,bpname).customize;
    var copt=[];
    for (var i in customs){
    	testopt=customs[i].replace(/\:.*$/,"");
    	if(testopt==bpopt){
    		opts=customs[i].replace(/.*\:/,"");
    		copt=opts.split(";");
    	}
    }
    return copt;
}

function subtractArrays(a1,a2){
    var outa=[];var pass;
    for (var i in a1){
        pass=true;
        for (var j in a2) {
            if(a1[i]==a2[j]){pass=false;}
        }
        if(pass){outa.push(a1[i]);}
    }
    return outa;
}

function isPlural(arr){
    if(notOne(arr)){return "s";}
    else {return "";}
}

function isPluralYIes(arr){
    if(notOne(arr)){
        return "ies";
    }else{
        return "y";
    }
}

function notOne(arr){
    if(typeof arr=="object"){
        return arr.length!=1?true:false;
    };
    if(typeof arr=="number"){
        return anum!=1?true:false;
    };
    write("$nERROR. Unidetified plural variable.");
}

function getDescription(obj,name){
    return getObjectByName(obj,name).description;
}

function exchangeBodyParts(objref, oldname, newname){
    var bprem=[];
    if(oldname!=""){
        bprem=removeBodyParts(objref,oldname);
    }
	var bpadd=addBodyParts(objref,newname);
	return; // silent: avoid lines below.
	//var bpremoved=subtractArrays(bprem,bpadd);
	//if(bpremoved.length){
	//    write("$nBody part"+isArrayPlural(bpremoved)+" removed: "+comaList(bpremoved)+".");
	//}
	//var bpadded=subtractArrays(bpadd,bprem);
	//if(bpadded.length){
	//    write("$nNew body part"+isArrayPlural(bpadded)+": "+comaList(bpadded)+".");
	//}
}

function excludeEmptyIndexes(list){
    var out = [];
    for (var i in list){
        if((isDefined(list[i]))&&(list[i]!="")){
            out.push(list[i]);
        }
    }
    return out;
}

function getAvailableBodyPartsToAdd(){
    var pass;
    var out=[];
    for (var i in bodyPart){
        pass1=false;
        pass2=false;
        pass3=true;
        for (var j in bodyPart[i].availableToSexes){
            if(bodyPart[i].availableToSexes[j]=="all"){pass1=true;}
            if(bodyPart[i].availableToSexes[j]==H[h].sex){pass1=true;}
        }
        if(bodyPart[i].availableToSexes.length==0){pass1=true;}
        
        for (var j in bodyPart[i].availableToRaces){
            if(bodyPart[i].availableToRaces[j]=="all"){pass2=true;}
            if(bodyPart[i].availableToRaces[j]==H[h].race){pass2=true;}
        }
        if(bodyPart[i].availableToRaces.length==0){pass2=true;}
        
        for (var j in H[h].body.part){
            if (H[h].body.part[j].name==bodyPart[i].name) {pass3=false;}
        }
        
        if((pass1)&&(pass2)&&(pass3)){
            out.push(bodyPart[i].name);
        }
    }
    return out;
}

function getAvailableBodyTypes(){
    var base=getObjectsNames(bodyType);
    var out=[];
    for(var i in base){
        var obj=getObjectByName(bodyType,base[i]).availableTo;
        var allowedSexes=obj.sexes;
        var allowedRaces=obj.races;
        var pass1=false;
        var pass2=false;
        if(allowedSexes.length==0){pass1=true;}
        if(allowedRaces.length==0){pass2=true;}
        for(var j in allowedSexes){
            if(allowedSexes[j].toLowerCase()==H[h].sex.toLowerCase()){pass1=true;}
        }
        for(var j in allowedRaces){
            if(allowedRaces[j].toLowerCase()==H[h].race.toLowerCase()){pass2=true;}
        }
        if(pass1 && pass2){
            out.push(base[i]);
        }
    }
    return out;
}

function getEquipables(){
    var eqps=getObjectsNames(H[h].item);
    var out=[];
    for(var i in eqps){
        var obj=getObjectByName(item,eqps[i]);
        if( (obj.equipable)
        &&  (canEquip(obj))){
            out.push(obj.name);
        }
    }
    return removeDuplicates(out);
}

function canEquip(obj){
    var pass=true;
    if((!foundOnArray(
    		obj.availableTo.sexes,
    		H[h].sex))
    ||(!foundOnArray(
    		obj.availableTo.races,
    		H[h].race))
    ||(!foundOnArray(
    		obj.availableTo.bodyTypes,
    		H[h].body.type))
    ||(!bodyPartPass(
    	obj.availableTo.bodyParts
    )))    {pass=false;}
    return pass;
}

function getRemovableBodyParts(){
    var out=[];
    var sexmandatory=getObjectByName(sex,H[h].sex).bodyPartsPreset;
    var racemandatory=getObjectByName(race,H[h].race).bodyPartsPreset;
    var pass;
    for (var i in H[h].body.part){
        pass=true;
        for (var j in sexmandatory){
            if (sexmandatory[j].toLowerCase()==H[h].body.part[i].name.toLowerCase()) {pass=false;}
        }
        for (var j in racemandatory){
            if (racemandatory[j].toLowerCase()==H[h].body.part[i].name.toLowerCase()) {pass=false;}
        }
        if(pass){out.push(H[h].body.part[i].name);}
    }
    return out;
}

function removeSingleBodyPart(bp){
    for (var i in H[h].body.part) {
        if (H[h].body.part[i].name==bp){
            H[h].body.part=removeItem(H[h].body.part,H[h].body.part[i]);break;
        }
    }
}

function getMapSize(){
    var out=[Infinity,Infinity,-Infinity,-Infinity];
    for(var i in H.length){
        if(H[i].home[0]<out[0]){out[0]=H[i].home[0];}
        if(H[i].home[1]<out[1]){out[1]=H[i].home[1];}
        if(H[i].home[0]>out[2]){out[2]=H[i].home[0];}
        if(H[i].home[1]>out[3]){out[3]=H[i].home[1];}
    }
    for(var i in local.length){
        if(local[i].gps[0]<out[0]){out[0]=local[i].gps[0];}
        if(local[i].gps[1]<out[1]){out[1]=local[i].gps[1];}
        if(local[i].gps[0]>out[2]){out[2]=local[i].gps[0];}
        if(local[i].gps[1]>out[3]){out[3]=local[i].gps[1];}
    }
    if(out[0]==Infinity){out[0]=-5;}
    if(out[1]==Infinity){out[1]=-5;}
    if(out[2]==-Infinity){out[2]=5;}
    if(out[3]==-Infinity){out[3]=5;}
    return out;
}

function getInGameIndexes(){
    var out=[];
    for(var i in H){
        if(H[i].inGame){out.push(i);}
    }
    return out;
}

function br(){
    write ("$n");
}

function getBuyables(){
    var out=[];
    var pass;
    for(var i in item){
        pass=false;
        for(var k in place.store_saleType){
  						 if(item[i].type
         ==place.store_saleType[k]){pass=true;}
        }
        if(H[h].exp<item[i].expNeeded)
         {pass=false;}
        if(!agePass(item[i].availableTo.ages,
        		H[h].age)){pass=false;}
        if(pass){out.push(item[i].name);};
    }
    return out;
}

function getSaleables(){
    var out=[];
    for(var i in H[h].item){
        if(H[h].item[i].resaleable){out.push(H[h].item[i].name);}
    }
    return removeDuplicates(out);
}

function agePass(agestr,age){
	age=parseInt(age);
	agestrn=parseInt(agestr);
	if(agestr=="")return true;
	if((agestr.match(/\+$/))
		&&(age>=agestrn)){return true;}
	if((agestr.match(/\-$/))
		&&(age<=agestrn)){return true;}
		
	if(age==agestrn){return true;}
	return false;
}

function foundOnArray(xarr,name){
	if(xarr.length==0){return true;}
	for(var i in xarr){
		if(xarr[i].toLowerCase()==name.toLowerCase()){return true;}
	}
	return false;
}

function isOnArray(parent,name){
    for(var i in parent){
        if(parent[i].toLowerCase()==name.toLowerCase()){return true;}
    }
    return false;
}

function bodyPartPass(bps){
		if(bps.length==0)return true;
	var allbp=getObjectsNames(H[h].body.part);
	for(var i in bps){
		if(foundOnArray(allbp,bps[i])){
			return true;}
	}
	return false;
}

function getCategories(itemarr){
    var out=[];
    for(var i in item){
        for(var j in itemarr){
            if(item[i].name==itemarr[j]){out.push(item[i].category);}
        }
    }
    out=deleteRepeated(out);
    
    return out;
}

function getCategory(itemname){
    var out="";
    for(var i in item){
        if(item[i].name==itemname){return item[i].category;}
    }
    return "";
}

function getSubCategory(itemname){
    var out="";
    for(var i in item){
        if(item[i].name==itemname){return item[i].subCategory;}
    }
    return "";
}

function deleteRepeated(arr){
    var out=[];
    for(var i in arr){
        if(!isOnArray(out,arr[i])){out.push(arr[i]);}
    }
    return out;
}

function removeDuplicates(arr){
    return deleteRepeated(arr);
}

function getAllStorage(){
    var free=10;
    for (var i in H[h].body.part){
            free+=calcSize(getObjectByName(bodyPart,H[h].body.part[i].name).storage);
    }
    for (var i in H[h].item){
        free+=calcSize(getObjectByName(item,H[h].item[i].name).clothes_storage);
    }
    return free;
}

function calcSize(arr){
    return arr[0]*arr[1];
}

function getFreeStorage(){
    var free=getAllStorage();
    for (var i in H[h].item){
      if(H[h].item[i].location_body){
        free-=calcSize(
        getObjectByName(
        item,H[h].item[i].name).size);
      }
    }
    return free;
}

function getCost(itm){
    for(var i in item){
        if(item[i].name==itm){
            return toNum(moneyFormat(item[i].cost));
        }
    }
}

function toNum(n){
   return toNumber(n);
}

function calcSale(itm,ind){
    if(!isDefined(ind)){ind=0;}
    return moneyFormat((getCost(itm)/2)*getState(itm,ind));
}

function getState(itm,ind){
    if(!isDefined(ind)){ind=0;}
    var idc=0;
    for(var i in H[h].item){
        if(H[h].item[i].name==itm){
            if(idc==ind){return H[h].item[i].state;}
            idc++;
        }
    }
    return 0;
}

function hasAnother(it){
    for(var i in H[h].item){
        if(H[h].item[i].name==it){return true;}
    }
    return false;
}

function countHowMany(it) {
    var count=0;
    for(var i in H[h].item){
        if(H[h].item[i].name==it){count++;}
    }
    return count;
}

function showSameNameItems(it){
    br();
    var tab=[];
    var lcount=0;
    for(var i in H[h].item){
        if(H[h].item[i].name==it){
            tab.push([numberToLetter(lcount),Capitular(getStateString(H[h].item[i])),Capitular(getCustomsString(H[h].item[i]))]);
            lcount++;
        }
    }
    niceListLetterOption(tab);
}

function Capitular(str){
    return str.substring(0,1).toUpperCase()+str.substring(1);
}

function numberToLetter(n){
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".substring(n,n+1);
}

function letterList(n){
    return ("ABCDEFGHIJKLMNOPQRSTUVWXYZ".substring(0,n)).split("");
}

function letterToNumber(n){
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(n);
}

function getCustomsString(obj){
    var customs=[];
    for(var j in obj.custom){
        //customs.push(obj.custom[j].value+" "+obj.custom[j].name); // keys and parameters
        customs.push(obj.custom[j].value);   // only parameters
    }
    return comaList(customs);
}

function getStateString(obj){
    var state=1-obj.state;
    var len=obj.stateSequence.length;
    return obj.stateSequence[round(state*(len-1))];
}

function showcase(its){ // not currently used
    var showc=[];
    for (var i in its){
        var obj=getObjectByName(item,its[i]);
        showc.push([
            obj.name,
            money(obj.cost)+" : Size: "+
            calcSize(obj.size)+" : "+
            obj.description
        ]);
    }
    br();
    niceList(showc);   
}

function money(str){
   str+="";
    return "$ "+moneyFormat(str);
}

function somethingOr(x,orr){
    if(typeof x=="string"){
        x=x.trim();
        if(!x.length){return orr;}
    }
    return x;
}

function sOr(x,orr){
    return somethingOr(x,orr);
}
