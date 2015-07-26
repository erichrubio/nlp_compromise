// common first-names in compressed form.
//from http://www.ssa.gov/oact/babynames/limits.html  and http://www.servicealberta.gov.ab.ca/pdf/vs/2001_Boys.pdf
//not sure what regional/cultural/demographic bias this has. Probably a lot.
// 73% of people are represented in the top 1000 names
//used to reduce redundant named-entities in longer text. (don't spot the same person twice.)
//used to identify gender for coreference resolution

var main = []

//an ad-hoc prefix encoding for names. 2ms decompression of names
var male_names = {
  "will": "iam,ie,ard,is,iams",
  "fred": ",erick,die,rick,dy",
  "marc": "us,,o,os,el",
  "darr": "ell,yl,en,el,in",
  "fran": "k,cis,cisco,klin,kie",
  "terr": "y,ance,ence,ell",
  "rand": "y,all,olph,al",
  "brad": "ley,,ford,y",
  "jeff": "rey,,ery,ry",
  "john": ",ny,nie,athan",
  "greg": "ory,,g,orio",
  "mar": "k,tin,vin,io,shall,ty,lon,lin",
  "car": "l,los,lton,roll,y,ey",
  "ken": "neth,,t,ny,dall,drick",
  "har": "old,ry,vey,ley,lan,rison",
  "ste": "ven,phen,ve,wart,phan,rling",
  "jer": "ry,emy,ome,emiah,maine,ald",
  "mic": "hael,heal,ah,key,hel",
  "dar": "yl,in,nell,win,ius",
  "dan": "iel,ny,,e",
  "wil": "bur,son,bert,fred,fredo",
  "ric": "hard,ky,ardo,k,key",
  "cli": "fford,nton,fton,nt,ff",
  "cla": "rence,ude,yton,rk,y",
  "ben": "jamin,,nie,ny,ito",
  "rod": "ney,erick,olfo,ger,",
  "rob": "ert,erto,bie,",
  "gar": "y,ry,rett,land",
  "sam": "uel,,my,mie",
  "and": "rew,re,y,res",
  "jos": "eph,e,hua,h",
  "joe": ",l,y,sph",
  "leo": "nard,n,,nardo",
  "tom": ",my,as,mie",
  "bry": "an,ant,ce,on",
  "ant": "hony,onio,oine,on",
  "jac": "k,ob,kson",
  "cha": "rles,d,rlie,se",
  "sha": "wn,ne,un",
  "bre": "nt,tt,ndan,t",
  "jes": "se,us,s",
  "al": "bert,an,len,fred,exander,ex,vin,lan,fredo,berto,ejandro,fonso,ton,,onzo,i,varo",
  "ro": "nald,ger,y,nnie,land,n,ss,osevelt,gelio,lando,man,cky,yce,scoe,ry",
  "de": "nnis,rek,an,rrick,lbert,vin,wey,xter,wayne,metrius,nis,smond",
  "ja": "mes,son,y,red,vier,ke,sper,mal,rrod",
  "el": "mer,lis,bert,ias,ijah,don,i,ton,liot,liott,vin,wood",
  "ma": "tthew,nuel,urice,thew,x,tt,lcolm,ck,son",
  "do": "nald,uglas,n,nnie,ug,minic,yle,mingo,minick",
  "er": "ic,nest,ik,nesto,ick,vin,nie,win",
  "ra": "ymond,lph,y,mon,fael,ul,miro,phael",
  "ed": "ward,win,die,gar,uardo,,mund,mond",
  "co": "rey,ry,dy,lin,nrad,rnelius",
  "le": "roy,wis,ster,land,vi",
  "lo": "uis,nnie,renzo,ren,well,uie,u,gan",
  "da": "vid,le,ve,mon,llas,mian,mien",
  "jo": "nathan,n,rge,rdan,nathon,aquin",
  "ru": "ssell,ben,dolph,dy,fus,ssel,sty",
  "ke": "vin,ith,lvin,rmit",
  "ar": "thur,nold,mando,turo,chie,mand",
  "re": "ginald,x,ynaldo,uben,ggie",
  "ge": "orge,rald,ne,rard,offrey,rardo",
  "la": "rry,wrence,nce,urence,mar,mont",
  "mo": "rris,ses,nte,ises,nty",
  "ju": "an,stin,lio,lian,lius,nior",
  "pe": "ter,dro,rry,te,rcy",
  "tr": "avis,oy,evor,ent",
  "he": "nry,rbert,rman,ctor,ath",
  "no": "rman,el,ah,lan,rbert",
  "em": "anuel,il,ilio,mett,manuel",
  "wa": "lter,yne,rren,llace,de",
  "mi": "ke,guel,lton,tchell,les",
  "sa": "lvador,lvatore,ntiago,ul,ntos",
  "ch": "ristopher,ris,ester,ristian,uck",
  "pa": "ul,trick,blo,t",
  "st": "anley,uart,an",
  "hu": "gh,bert,go,mberto",
  "br": "ian,uce,andon,ain",
  "vi": "ctor,ncent,rgil,cente",
  "ca": "lvin,meron,leb",
  "gu": "y,illermo,stavo",
  "lu": "is,ther,ke,cas",
  "gr": "ant,ady,over,aham",
  "ne": "il,lson,al,d",
  "t": "homas,imothy,odd,ony,heodore,im,yler,ed,yrone,aylor,erence,immy,oby,eddy,yson",
  "s": "cott,ean,idney,ergio,eth,pencer,herman,ylvester,imon,heldon,cotty,olomon",
  "r": "yan",
  "n": "icholas,athan,athaniel,ick,icolas",
  "a": "dam,aron,drian,ustin,ngelo,braham,mos,bel,gustin,ugust,dolfo",
  "b": "illy,obby,arry,ernard,ill,ob,yron,lake,ert,oyd,illie,laine,art,uddy,urton",
  "e": "ugene,arl,verett,nrique,van,arnest,frain,than,steban",
  "h": "oward,omer,orace,ans,al",
  "p": "hillip,hilip,reston,hil,ierre",
  "c": "raig,urtis,lyde,ecil,esar,edric,leveland,urt",
  "j": "immy,im,immie",
  "g": "lenn,ordon,len,ilbert,abriel,ilberto",
  "m": "elvin,yron,erle,urray",
  "k": "yle,arl,urt,irk,ristopher",
  "o": "scar,tis,liver,rlando,mar,wen,rville,tto",
  "l": "loyd,yle,ionel",
  "f": "loyd,ernando,elix,elipe,orrest,abian,idel",
  "w": "esley,endell,m,oodrow,inston",
  "d": "ustin,uane,wayne,wight,rew,ylan",
  "z": "achary",
  "v": "ernon,an,ance",
  "i": "an,van,saac,ra,rving,smael,gnacio,rvin",
  "q": "uentin,uinton",
  "x": "avier"
}
var female_names = {
  "mari": "a,e,lyn,an,anne,na,ssa,bel,sa,sol,tza",
  "kris": "ten,tin,tina,ti,tine,ty,ta,tie",
  "jean": "ette,ne,nette,nie,ine,nine",
  "chri": "stine,stina,sty,stie,sta,sti",
  "marg": "aret,ie,arita,uerite,ret,o",
  "ange": "la,lica,lina,lia,line",
  "fran": "ces,cine,cisca",
  "kath": "leen,erine,y,ryn,arine",
  "sher": "ry,ri,yl,i,rie",
  "caro": "l,lyn,line,le,lina",
  "dian": "e,a,ne,na",
  "jenn": "ifer,ie,y,a",
  "luci": "lle,a,nda,le",
  "kell": "y,i,ey,ie",
  "rosa": ",lie,lind",
  "jani": "ce,e,s,ne",
  "stac": "y,ey,ie,i",
  "shel": "ly,ley,ia",
  "laur": "a,en,ie,el",
  "trac": "y,ey,i,ie",
  "jane": "t,,lle,tte",
  "bett": "y,ie,e,ye",
  "rose": "mary,marie,tta",
  "joan": ",ne,n,na",
  "mar": "y,tha,jorie,cia,lene,sha,yann,cella,ta,la,cy,tina",
  "lor": "i,raine,etta,a,ena,ene,na,ie",
  "sha": "ron,nnon,ri,wna,nna,na,una",
  "dor": "othy,is,a,een,thy,othea",
  "cla": "ra,udia,ire,rice,udette",
  "eli": "zabeth,sa,sabeth,se,za",
  "kar": "en,la,a,i,in",
  "tam": "my,ara,i,mie,ika",
  "ann": "a,,e,ie,ette",
  "car": "men,rie,la,a,mela",
  "mel": "issa,anie,inda",
  "ali": "ce,cia,son,sha,sa",
  "bri": "ttany,dget,ttney,dgette",
  "lyn": "n,da,ne,ette",
  "del": "ores,la,ia,oris",
  "ter": "esa,ri,i",
  "son": "ia,ya,ja,dra",
  "deb": "orah,ra,bie,ora",
  "jac": "queline,kie,quelyn,lyn",
  "lat": "oya,asha,onya,isha",
  "che": "ryl,lsea,ri,rie",
  "vic": "toria,ki,kie,ky",
  "sus": "an,ie,anne,ana",
  "rob": "erta,yn",
  "est": "her,elle,ella,er",
  "lea": "h,,nne,nn",
  "lil": "lian,lie,a,y",
  "ma": "ureen,ttie,xine,bel,e,deline,ggie,mie,ble,ndy,ude,yra,nuela,vis,gdalena,tilda",
  "jo": "yce,sephine,,di,dy,hanna,sefina,sie,celyn,lene,ni,die",
  "be": "verly,rtha,atrice,rnice,th,ssie,cky,linda,ulah,rnadette,thany,tsy,atriz",
  "ca": "therine,thy,ssandra,ndace,ndice,mille,itlin,ssie,thleen,llie",
  "le": "slie,na,ona,ticia,igh,la,nora,ola,sley,ila",
  "el": "aine,len,eanor,sie,la,ena,oise,vira,sa,va,ma",
  "sa": "ndra,rah,ra,lly,mantha,brina,ndy,die,llie",
  "mi": "chelle,ldred,chele,nnie,riam,sty,ndy,randa,llie",
  "co": "nnie,lleen,nstance,urtney,ra,rinne,nsuelo,rnelia",
  "ju": "lie,dith,dy,lia,anita,ana,stine",
  "da": "wn,nielle,rlene,na,isy,rla,phne",
  "re": "becca,nee,na,bekah,ba",
  "al": "ma,lison,berta,exandra,yssa,ta",
  "ra": "chel,mona,chael,quel,chelle",
  "an": "drea,ita,a,gie,toinette,tonia",
  "ge": "raldine,rtrude,orgia,nevieve,orgina",
  "de": "nise,anna,siree,na,ana,e",
  "ja": "smine,na,yne",
  "lu": "cy,z,la,pe,ella,isa",
  "je": "ssica,nifer,well,ri",
  "ad": "a,rienne,die,ele,riana,eline",
  "pa": "tricia,mela,ula,uline,tsy,m,tty,ulette,tti,trice,trica,ige",
  "ke": "ndra,rri,isha,ri",
  "mo": "nica,lly,nique,na,llie",
  "lo": "uise,is,la",
  "he": "len,ather,idi,nrietta,lene,lena",
  "me": "gan,rcedes,redith,ghan,agan",
  "wi": "lma,lla,nnie",
  "ga": "il,yle,briela,brielle,le",
  "er": "in,ica,ika,ma,nestine",
  "ce": "cilia,lia,celia,leste,cile",
  "ka": "tie,y,trina,yla,te",
  "ol": "ga,ivia,lie,a",
  "li": "nda,sa,ndsay,ndsey,zzie",
  "na": "ncy,talie,omi,tasha,dine",
  "la": "verne,na,donna,ra",
  "vi": "rginia,vian,ola",
  "ha": "rriet,nnah",
  "pe": "ggy,arl,nny,tra",
  "br": "enda,andi,ooke",
  "ki": "mberly,m,mberley,rsten",
  "au": "drey,tumn,dra",
  "bo": "nnie,bbie,nita,bbi",
  "do": "nna,lores,lly,minique",
  "gl": "oria,adys,enda,enna",
  "tr": "icia,ina,isha,udy",
  "ta": "ra,nya,sha,bitha",
  "ro": "sie,xanne,chelle,nda",
  "am": "y,anda,ber,elia",
  "fa": "ye,nnie,y",
  "ni": "cole,na,chole,kki",
  "ve": "ronica,ra,lma,rna",
  "gr": "ace,etchen,aciela,acie",
  "b": "arbara,lanca,arbra,ianca",
  "r": "uth,ita,honda",
  "s": "hirley,tephanie,ylvia,heila,uzanne,ue,tella,ophia,ilvia,ophie,tefanie,heena,ummer,elma,ocorro,ybil,imone",
  "c": "ynthia,rystal,indy,harlene,ristina,leo",
  "e": "velyn,mily,dna,dith,thel,mma,va,ileen,unice,ula,ssie,ffie,tta,ugenia",
  "a": "shley,pril,gnes,rlene,imee,bigail,ida,bby,ileen",
  "t": "heresa,ina,iffany,helma,onya,oni,herese,onia",
  "i": "rene,da,rma,sabel,nez,ngrid,va,mogene,sabelle",
  "w": "anda,endy,hitney",
  "p": "hyllis,riscilla,olly",
  "n": "orma,ellie,ora,ettie,ell",
  "f": "lorence,elicia,lora,reda,ern,rieda",
  "v": "alerie,anessa",
  "j": "ill,illian",
  "y": "vonne,olanda,vette",
  "g": "ina,wendolyn,wen,oldie",
  "l": "ydia",
  "m": "yrtle,yra,uriel,yrna",
  "h": "ilda,illary",
  "o": "pal,ra,felia",
  "k": "rystal",
  "d": "ixie,ina",
  "u": "rsula"
}
var ambiguous = [
  "casey",
  "jamie",
  "lee",
  "jaime",
  "jessie",
  "morgan",
  "rene",
  "robin",
  "devon",
  "kerry",
  "alexis",
  "guadalupe",
  "blair",
  "kasey",
  "jean",
  "marion",
  "aubrey",
  "shelby",
  "jan",
  "shea",
  "jade",
  "kenyatta",
  "kelsey",
  "shay",
  "lashawn",
  "trinity",
  "regan",
  "jammie",
  "cassidy",
  "cheyenne",
  "reagan",
  "shiloh",
  "marlo",
  "andra",
  "devan",
  "rosario",
  "lee",
  "bernie",
  "rand",
  "jeb"
]

var politicianFirstNames = [
  "marco",
  "rand",
  "jeb",
  "scott",
  "ted",
  "ben",
  "ben",
  "benjamin",
  "donald",
  "hillary",
  "bernie",
  "martin"
]

var politicianLastNames = [
  "rubio",
  "paul",
  "bush",
  "walker",
  "cruz",
  "carson",
  "trump",
  "clinton",
  "sanders",
  "o'Malley"
]

var i, arr, i2, l, keys;
//add data into the main obj

//males
// keys = Object.keys(male_names)
// l = keys.length
// for (i = 0; i < l; i++) {
//   arr = male_names[keys[i]].split(',')
//   for (i2 = 0; i2 < arr.length; i2++) {
//     main[keys[i] + arr[i2]] = "m"
//   }
// }

//females
// keys = Object.keys(female_names)
// l = keys.length
// for (i = 0; i < l; i++) {
//   arr = female_names[keys[i]].split(',')
//   for (i2 = 0; i2 < arr.length; i2++) {
//     main[keys[i] + arr[i2]] = "f"
//   }
// }

//unisex names
// l = ambiguous.length
// for (i = 0; i < l; i += 1) {
//   main[ambiguous[i]] = "a"
// }

// l = lastNames.length
// for (i = 0; i < l; i += 1) {
//   main[lastNames[i]] = "l"
// }

// Politician first names
l = politicianFirstNames.length
for (i = 0; i < l; i += 1) {
  main[politicianFirstNames[i]] = "pf"
}

// Politician first names
l = politicianLastNames.length
for (i = 0; i < l; i += 1) {
  main[politicianLastNames[i]] = "pl"
}

module.exports = main;

// console.log(firstnames['spencer'])
// console.log(firstnames['jill'])
// console.log(firstnames['sue'])
// console.log(firstnames['jan'])
// console.log(JSON.stringify(Object.keys(firstnames).length, null, 2));
