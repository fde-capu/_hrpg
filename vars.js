///////////////////////////////////////////////////////////////////////////////

var tosave=[];
var hrpg={    day:1,    hour:0,
   agenda:[]  };  
tosave.push("hrpg");
var H=[];                           tosave.push("H");
var local=[];
var item=[];
var sex=[];
var trait=[];

///////////////////////////////////////////////////////////////////////////////

var h;
var setupable=[];

///////////////////////////////////////////////////////////////////////////////

var sex=[{
	name:"female",
	description:"Universe owners.",
	bodyPartsPreset:[]
},{
	name:"male",
	description:"Normally strong and brave.",
	bodyPartsPreset:[]
},{
	name:"androgen",
	description:"Neutral beings.",
	bodyPartsPreset:[]
}];
var race=[{
    name:"human",
    description:"Earthling as we know it.",
	bodyPartsPreset:["Skin", "Hair", "Eyes", "Mouth"],
    modifiable:false
},{
	name:"alien",
    description:"Aliens have various shapes.",
	bodyPartsPreset:["Skin", "Hair", "Eyes", "Mouth","Wings","Fangs"],
    modifiable:true
}];
var trait=[{
    name:"happy",
    descriton:"Up lifted humor.",
    influences:[]
},{
	name:"sad",
    descriton:"Down humor.",
    influences:[]
}];
var bodyPart=[{
    name:"Skin",
    description:"",
    graceSequence:["soft","blush","sensible","goosebump","sweaty","wet"],
    stateSequence:["healty","tired","hurt","in pain","weak","barely standing","dying","zombie"],
    isPlural:false,
    storage:[0, 0],
    isPartOf:"",
    customize:["color:black;white;red;yellow"],
    customdefaults:["random","normal"],
    availableToSexes:["all"],
    availableToRaces:["all"]
},{
    name:"Hair",
    description:"Strange strains from the head.",
    graceSequence:["soft","graceful"],
    stateSequence:["fit","messy","destroyed"],
    isPlural:false,
    storage:[0, 0],
    isPartOf:"",
    customize:["color:white;red;pink;black","shape:normal;curly", "size:short;medium;long"],
    customdefaults:["random","normal","random"],
    availableToSexes:["all"],
    availableToRaces:["all"]
},{
    name:"Eyes",
	description:"To look at things.",
    isPlural:true,
    graceSequence:["placid","bright","radiant"],
    stateSequence:["good","compromised","sore","hurt","defective"],
    storage:[0, 0],
    isPartOf:"",
    customize:["color:red;pink;white;black","lashes:normal;big"],
    customdefaults:["random","normal"],
    availableToSexes:["all"],
    availableToRaces:["all"]
},{
    name:"Wings",
    description:"So to fly.",
    isPlural:true,
    graceSequence:[],
    stateSequence:["healthy","perfurated","torn"],
    storage:[0, 0],
    isPartOf:"",
    customize:["color:red;pink;white;black","size:big;medium;small"],
    customdefaults:["random","random"],
    availableToSexes:["all"],
    availableToRaces:["alien"]
},{
    name:"Fangs",
    description:"Proeminent canines.",
    isPlural:true,
    graceSequence:[],
    stateSequence:[],
    storage:[0, 0],
    isPartOf:"Mouth",
    customize:["size:big;medium;small"],
    customdefaults:["medium"],
    availableToSexes:["all"],
    availableToRaces:["all"]
},{
    name:"Mouth",
    description:"",
    isPlural:false,
    graceSequence:[],
    stateSequence:[],
    storage:[0, 0],
    isPartOf:"",
    customize:["color:red;pink;white;black","lips:big;medium;small"],
    customdefaults:["random","random"],
    availableToSexes:["all"],
    availableToRaces:["alien"]
}];
var bodyPartAttachedProperties=[["holding",""],["custom",[]]];
var bodyPartDetachedProperties=["isPlural","storage","isPartOf","customize","customdefaults","availableToSexes","availableToRaces","description"];

var local=[{
	name:"General Store",
	description:"Basics clothing and equipments.",
	gps:[0,0],
    furniture:[],
    objects:[],
    vibe:0,
    isPrivate:false,
    isStore:true,
    store_saleType:["clothes"],
    allowed:{
        ages:[],
        sexes:[],
        races:[]
    },
    actions:[]
}];

var item=[{
    type:"clothes",//weapon,item,goods,magic,
    	//action,hobby,vehicle,furniture,bodytype
    category:"Basic",
    subCategory:"T-shirts",
    
    name:"T-shirt A",
    description:"The basic.",
    
    cost:10,
    resaleable:true,
    
    size:[1, 1],
    exclusiveOnStores:[],
    customize:["color:white;black;blue;red"],
    customdefaults:[],
    
    state:1,
    fragility:0.5,
    stateSequence:["nice","scratch",
        "open scratch","ripped","very ripped",
    	"tore apart","useless"],
    degrationDecay:0.01,
    verbs:{ past:["wore"], 
    	infinitive:["weares"], 
    	future:["wear"], gerund:["wearing"]},

    furnitureDependancy:[],
    inBattle:false,
    offBattle:false,
    equipable:true,
    
    attack: { hp:0,   mp:0,   sp:0    },
    defense:{ hp:0.01,mp:0,   sp:0.01 },
    reverse:{ hp:0,   mp:0,   sp:0    },

    expNeeded:0,
    availableTo:{ 
    	ages:"0+", 
    	sexes:["female","male"], 
    	races:["human"],
     bodyTypes:[],       
     bodyParts:[]},

    usableTo:{    ages:[], sexes:[], races:[],
             bodyTypes:[],       bodyParts:[]},
    
    weapon_succes:[],
    weapon_fail:[],
    
    clothes_isPlural:false,
    clothes_bodyLayer:0,
    clothes_coverBodyPart:["chest",
    	"shoulders","hips"],
    clothes_storage:[0, 0],
    
    magic_maxPlayers:0,
    magic_rounds:0,
    magic_dificulty:0,
    magic_generate:{ hp:0,  mp:0,   sp:0    },
    magic_conditionate:"",
    magic_reverseCondition:"",
    
    hobby_level:0,
    hobby_hoursToMaster:0,
    hobby_levelTable:[], 
    				// 0, "noob", 1, "beginner", ...
    hobby_leveledGreeting:[],
    hobby_showAsAction:"",
    
    vehicle_speed:0,
},{
    type:"clothes",//weapon,item,goods,magic,
    	//action,hobby,vehicle,furniture,bodytype
    category:"Basic",
    subCategory:"Pants",
    
    name:"Pant A",
    description:"Just basic.",
    
    cost:35,
    resaleable:true,
    
    size:[1, 1],
    exclusiveOnStores:[],
    customize:["color:white;black;blue;red","adjustment:tight;normal;loose"],
    customdefaults:[],
    
    state:1,
    fragility:0.5,
    stateSequence:["nice","scratch",
        "open scratch","ripped","very ripped",
    	"tore apart","useless"],
    degrationDecay:0.01,
    verbs:{ past:["wore"], 
    	infinitive:["weares"], 
    	future:["wear"], gerund:["wearing"]},

    furnitureDependancy:[],
    inBattle:false,
    offBattle:false,
    equipable:true,
    
    attack: { hp:0,   mp:0,   sp:0    },
    defense:{ hp:0.01,mp:0,   sp:0.01 },
    reverse:{ hp:0,   mp:0,   sp:0    },

    expNeeded:0,
    availableTo:{ 
    	ages:"0+", 
    	sexes:[], 
    	races:["human"],
        bodyTypes:[],
        bodyParts:[]},

    usableTo:{    ages:[], sexes:[], races:[],
             bodyTypes:[],       bodyParts:[]},
    
    weapon_succes:[],
    weapon_fail:[],
    
    clothes_isPlural:true,
    clothes_bodyLayer:0,
    clothes_coverBodyPart:[],
    clothes_storage:[4, 1],
    
    magic_maxPlayers:0,
    magic_rounds:0,
    magic_dificulty:0,
    magic_generate:{ hp:0,  mp:0,   sp:0    },
    magic_conditionate:"",
    magic_reverseCondition:"",
    
    hobby_level:0,
    hobby_hoursToMaster:0,
    hobby_levelTable:[], 
    				// 0, "noob", 1, "beginner", ...
    hobby_leveledGreeting:[],
    hobby_showAsAction:"",
    
    vehicle_speed:0,
}];

////////////////////////////////////////////////

var baseH={
	
     name:"",
     description:"",
     age:0,
     birthday:0,
     sex:"",
     race:"",
     hobbies:[],
     traits:[],
     adjectives:[],
     home:[], // x,y
     inGame:true,
    
     body:{state:"",type:"",part:[]},
     skincover:{substance:[],amount:[]},
    
     exp:1,
     hp:10,
     mp:10,
     sp:0,
     hpMax:10,
     mpMax:10,
     spMax:10,
     attack:1,
     defense:1,
     
     condition:"",
     
     local:[],
     cash:1000,
     vehicles:[],
     currentVehicle:"",
     
     friends:[], // *2
     friendship:[], // *2
     team:[], // *2
     
     stats:{
     	battles:0,
     	defeated:0,
     	madeh:0,
     	hexpeled:0,
     	swalowedh:0
     },
     
     item:[],
     houseObject:{}//for saving
   	
};

var bodyType=[{
    name:"Skinny",
    description:"Low-fat, skinny.",
    availableTo:{ sexes:[], races:["human"] },
    stateSequence:["healty","tired","hurt","in pain","weak","barely standing","dying","zombie"]
},{
    name:"Normal",
    description:"Normal body.",
    availableTo:{ sexes:[], races:[] },
    stateSequence:["healty","tired","hurt","in pain","weak","barely standing","dying","zombie"]
},{
    name:"Obese",
    description:"Fat.",
    availableTo:{ sexes:[], races:[] },
    stateSequence:["healty","tired","hurt","in pain","weak","barely standing","dying","zombie"]
}];

var baseItem={ // For ease cut-and-paste
    
    type:"",//weapon,item,goods,magic,action,hobby,vehicle,furniture,bodytype
    
    inBattle:false,
    offBattle:false,
    equipable:false,
    
    name:"",
    description:"",
    category:"",
    subCategory:"",
    
    cost:0,
    resaleable:false,
    
    size:[0, 0],
    exclusiveOnStores:[],
    customize:[],
    customdefaults:[],
    
    state:1,
    fragility:0,
    degrationNames:[],
    degrationDecay:0,

    attack: { hp:0,   mp:0,   sp:0    },
    defense:{ hp:0,   mp:0,   sp:0    },
    reverse:{ hp:0,   mp:0,   sp:0    },

    expNeeded:0,
    availableTo:{ ages:[], sexes:[], races:[],
             bodyTypes:[],       bodyParts:[]},

    usableTo:{    ages:[], sexes:[], races:[],
             bodyTypes:[],       bodyParts:[]},
    
    verbs:{ past:[], infinitive:[], 
    	  future:[],     gerund:[]},
    
    furnitureDependancy:[],
    
    weapon_succes:[],
    weapon_fail:  [],
    
    clothes_isPlural:false,
    clothes_bodyLayer:0,
    clothes_coverBodyPart:[],
    clothes_storage:[0, 0],
    
    magic_maxPlayers:0,
    magic_rounds:0,
    magic_dificulty:0,
    magic_generate:{ hp:0,  mp:0,   sp:0    },
    magic_conditionate:"",
    
    hobby_level:0,
    hobby_hoursToMaster:0,
    hobby_levelTable:[], 
    		// 0, "noob", 1, "beginner", ...
    hobby_leveledGreeting:[],
    hobby_showAsAction:"",
    
    vehicle_speed:0,
    
};

var baseLocal={
	name:"",
	description:"",
	gps:[0,0],
    furniture:[],
    objects:[],
    vibe:0,
    isPrivate:false,
    isStore:false,
    store_saleType:[],
    allowed:{
        ages:[],
        sexes:[],
        races:[]
    },
    activities:[]
};
