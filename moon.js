// Following sections of code is extremely heavily based on http://www.stargazing.net/mas/hayes/ephemeris.html

// Functions for the moon
// Meeus first edition table 45.A Longitude and distance of the moon
var T45AD = new Array(0, 2, 2, 0, 0, 0, 2, 2, 2, 2,
                      0, 1, 0, 2, 0, 0, 4, 0, 4, 2,
                      2, 1, 1, 2, 2, 4, 2, 0, 2, 2,
                      1, 2, 0, 0, 2, 2, 2, 4, 0, 3,
                      2, 4, 0, 2, 2, 2, 4, 0, 4, 1,
                      2, 0, 1, 3, 4, 2, 0, 1, 2, 2);

var T45AM = new Array(0,  0,  0,  0,  1,  0,  0, -1,  0, -1,
                      1,  0,  1,  0,  0,  0,  0,  0,  0,  1,
                      1,  0,  1, -1,  0,  0,  0,  1,  0, -1,
                      0, -2,  1,  2, -2,  0,  0, -1,  0,  0,
                      1, -1,  2,  2,  1, -1,  0,  0, -1,  0,
                      1,  0,  1,  0,  0, -1,  2,  1,  0,  0);

var T45AMP = new Array( 1, -1,  0,  2,  0,  0, -2, -1,  1,  0,
                       -1,  0,  1,  0,  1,  1, -1,  3, -2, -1,
                        0, -1,  0,  1,  2,  0, -3, -2, -1, -2,
                        1,  0,  2,  0, -1,  1,  0, -1,  2, -1,
                        1, -2, -1, -1, -2,  0,  1,  4,  0, -2,
                        0,  2,  1, -2, -3,  2,  1, -1,  3, -1);

var T45AF  = new Array( 0,  0,  0,  0,  0,  2,  0,  0,  0,  0,
                        0,  0,  0, -2,  2, -2,  0,  0,  0,  0,
                        0,  0,  0,  0,  0,  0,  0,  0,  2,  0,
                        0,  0,  0,  0,  0, -2,  2,  0,  2,  0,
                        0,  0,  0,  0,  0, -2,  0,  0,  0,  0,
                       -2, -2,  0,  0,  0,  0,  0,  0,  0, -2);

var T45AL = new Array(6288774, 1274027, 658314, 213618, -185116,
                      -114332,   58793,  57066,  53322,   45758,
                       -40923,  -34720, -30383,  15327,  -12528,
                        10980,   10675,  10034,   8548,   -7888,
                        -6766,   -5163,   4987,   4036,    3994,
                         3861,    3665,  -2689,  -2602,    2390,
                        -2348,    2236,  -2120,  -2069,    2048,
                        -1773,   -1595,   1215,  -1110,    -892,
                         -810,     759,   -713,   -700,     691,
                          596,     549,    537,    520,    -487,
                         -399,    -381,    351,   -340,     330,
                          327,    -323,    299,    294,       0);

var T45AR = new Array(-20905355, -3699111, -2955968, -569925,   48888,
                          -3149,   246158,  -152138, -170733, -204586,
                        -129620,   108743,   104755,   10321,       0,
                          79661,   -34782,   -23210,  -21636,   24208,
                          30824,    -8379,   -16675,  -12831,  -10445,
                         -11650,    14403,    -7003,       0,   10056,
                           6322,    -9884,     5751,       0,   -4950,
                           4130,        0,    -3958,       0,    3258,
                           2616,    -1897,    -2117,    2354,       0,
                              0,    -1423,    -1117,   -1571,   -1739,
                              0,    -4421,        0,       0,       0,
                              0,     1165,        0,       0,    8752);

// Meeus table 45B latitude of the moon
var T45BD = new Array(0, 0, 0, 2, 2, 2, 2, 0, 2, 0,
                      2, 2, 2, 2, 2, 2, 2, 0, 4, 0,
                      0, 0, 1, 0, 0, 0, 1, 0, 4, 4,
                      0, 4, 2, 2, 2, 2, 0, 2, 2, 2,
                      2, 4, 2, 2, 0, 2, 1, 1, 0, 2,
                      1, 2, 0, 4, 4, 1, 4, 1, 4, 2);

var T45BM = new Array( 0,  0,  0,  0,  0,  0,  0, 0,  0,  0,
                      -1,  0,  0,  1, -1, -1, -1, 1,  0,  1,
                       0,  1,  0,  1,  1,  1,  0, 0,  0,  0,
                       0,  0,  0,  0, -1,  0,  0, 0,  0,  1,
                       1,  0, -1, -2,  0,  1,  1, 1,  1,  1,
                       0, -1,  1,  0, -1,  0,  0, 0, -1, -2);

var T45BMP = new Array(0,  1, 1,  0, -1, -1,  0,  2,  1,  2,
                       0, -2, 1,  0, -1,  0, -1, -1, -1,  0,
                       0, -1, 0,  1,  1,  0,  0,  3,  0, -1,
                       1, -2, 0,  2,  1, -2,  3,  2, -3, -1,
                       0,  0, 1,  0,  1,  1,  0,  0, -2, -1,
                       1, -2, 2, -2, -1,  1,  1, -1,  0,  0);

var T45BF = new Array( 1,  1, -1, -1,  1, -1,  1,  1, -1, -1,
                      -1, -1,  1, -1,  1,  1, -1, -1, -1,  1,
                       3,  1,  1,  1, -1, -1, -1,  1, -1,  1,
                      -3,  1, -3, -1, -1,  1, -1,  1, -1,  1,
                       1,  1,  1, -1,  3, -1, -1,  1, -1, -1,
                       1, -1,  1, -1, -1, -1, -1, -1, -1,  1);

var T45BL = new Array(5128122, 280602, 277693, 173237, 55413,
                        46271,  32573,  17198,   9266,  8822,
                         8216,   4324,   4200,  -3359,  2463,
                         2211,   2065,  -1870,   1828, -1794,
                        -1749,  -1565,  -1491,  -1475, -1410,
                        -1344,  -1335,   1107,   1021,   833,
                          777,    671,    607,    596,   491,
                         -451,    439,    422,    421,  -366,
                         -351,    331,    315,    302,  -283,
                         -229,    223,    223,   -220,  -220,
                         -185,    181,   -177,    176,   166,
                         -164,    132,   -119,    115,   107);

// MoonPos calculates the Moon position, based on Meeus chapter 45
// and the illuminated percentage from Meeus equations 46.4 and 46.1
function MoonPos(obs) {
  // julian date
  var jdobs=jd(obs);
  var T=(jdobs-2451545.0)/36525;
  var T2=T*T;
  var T3=T2*T;
  var T4=T3*T;

  // Moons mean longitude L'
  var LP=218.3164477+481267.88123421*T-0.0015786*T2+T3/538841.0-T4/65194000.0;
  // Moons mean elongation Meeus first edition
  // var D=297.8502042+445267.1115168*T-0.0016300*T2+T3/545868.0-T4/113065000.0;
  // Moons mean elongation Meeus second edition
  var D=297.8501921+445267.1114034*T-0.0018819*T2+T3/545868.0-T4/113065000.0; 
  // Moons mean anomaly M' Meeus first edition
  // var MP=134.9634114+477198.8676313*T+0.0089970*T2+T3/69699.0-T4/14712000.0;
  // Moons mean anomaly M' Meeus second edition
  var MP=134.9633964+477198.8675055*T+0.0087414*T2+T3/69699.0-T4/14712000.0;
  // Moons argument of latitude
  var F=93.2720950+483202.0175233*T-0.0036539*T2-T3/3526000.0+T4/863310000.0;
  // Suns mean anomaly
  var M=357.5291092+35999.0502909*T-0.0001536*T2+T3/24490000.0;
  // Additional arguments
  var A1=119.75+131.849*T;
  var A2=53.09+479264.290*T;
  var A3=313.45+481266.484*T;
  var E=1-0.002516*T-0.0000074*T2;
  var E2=E*E;
  // Sums of periodic terms from table 45.A and 45.B
  var Sl=0.0;
  var Sr=0.0;
  for (var i=0; i<60; i++) {
    var Eterm=1;
    if (Math.abs(T45AM[i])==1) Eterm=E;
    if (Math.abs(T45AM[i])==2) Eterm=E2;
    Sl+=T45AL[i]*Eterm*sind(rev(T45AD[i]*D+T45AM[i]*M+T45AMP[i]*MP+T45AF[i]*F));
    Sr+=T45AR[i]*Eterm*cosd(rev(T45AD[i]*D+T45AM[i]*M+T45AMP[i]*MP+T45AF[i]*F));
  }
  var Sb=0.0;
  for (var i=0; i<60; i++) {
    var Eterm=1;
    if (Math.abs(T45BM[i])==1) Eterm=E;
    if (Math.abs(T45BM[i])==2) Eterm=E2;
    Sb+=T45BL[i]*Eterm*sind(rev(T45BD[i]*D+T45BM[i]*M+T45BMP[i]*MP+T45BF[i]*F));
  }
  // Additional additive terms
  Sl=Sl+3958*sind(rev(A1))+1962*sind(rev(LP-F))+318*sind(rev(A2));
  Sb=Sb-2235*sind(rev(LP))+382*sind(rev(A3))+175*sind(rev(A1-F))+
     175*sind(rev(A1+F))+127*sind(rev(LP-MP))-115*sind(rev(LP+MP));
  // geocentric longitude, latitude and distance
  var mglong=rev(LP+Sl/1000000.0);
  var mglat=rev(Sb/1000000.0);
  if (mglat > 180.0) mglat=mglat-360;
  var mr=Math.round(385000.56+Sr/1000.0);
  // Obliquity of Ecliptic
  var obl=23.4393-3.563E-7*(jdobs-2451543.5);
  // RA and dec
  var ra=rev(atan2d(sind(mglong)*cosd(obl)-tand(mglat)*sind(obl),
                    cosd(mglong)))/15.0;
  var dec=rev(asind(sind(mglat)*cosd(obl)+cosd(mglat)*sind(obl)*sind(mglong)));
  if (dec > 180.0) dec=dec-360;
  // phase angle
  var pa=180.0-D-6.289*sind(MP)+2.1*sind(M)-1.274*sind(2*D-MP)
         -0.658*sind(2*D)-0.214*sind(2*MP)-0.11*sind(D);
  // Altitude and azimuth
  var altaz=radtoaa(ra,dec,obs);

  return {
    RightAscension: ra,
    Declination: dec,
    Distance: mr,
    Altitude: altaz[0],
    Azimuth: altaz[1]
  }
}

function jd(obs) {
  var j = jd0(obs.year,obs.month,obs.day);
  j+=(obs.hours+((obs.minutes+obs.tz)/60.0)+(obs.seconds/3600.0))/24;
  return j;
}

function jd0(year,month,day) {
  var y  = year;
  var m = month;
  if (m < 3) {m += 12; y -= 1};
  var a = Math.floor(y/100);
  var b = 2-a+Math.floor(a/4);
  var j = Math.floor(365.25*(y+4716))+Math.floor(30.6001*(m+1))+day+b-1524.5;
  return j;
}

function rev(angle){return angle-Math.floor(angle/360.0)*360.0;}
function sind(angle){return Math.sin((angle*Math.PI)/180.0);}
function cosd(angle){return Math.cos((angle*Math.PI)/180.0);}
function tand(angle){return Math.tan((angle*Math.PI)/180.0);}
function asind(c){return (180.0/Math.PI)*Math.asin(c);}
function acosd(c){return (180.0/Math.PI)*Math.acos(c);}
function atan2d(y,x){return (180.0/Math.PI)*Math.atan(y/x)-180.0*(x<0);}

function local_sidereal(obs) {
  var res=g_sidereal(obs.year,obs.month,obs.day);
  res+=1.00273790935*(obs.hours+(obs.minutes+obs.tz+(obs.seconds/60.0))/60.0);
  res-=obs.longitude/15.0;
  while (res < 0) res+=24.0;
  while (res > 24) res-=24.0;
  return res;
}

function g_sidereal(year,month,day) {
  var T=(jd0(year,month,day)-2451545.0)/36525;
  var res=100.46061837+T*(36000.770053608+T*(0.000387933-T/38710000.0));
  return rev(res)/15.0;
}

function radtoaa(ra,dec,obs) {
  var lst=local_sidereal(obs);
  var x=cosd(15.0*(lst-ra))*cosd(dec);
  var y=sind(15.0*(lst-ra))*cosd(dec);
  var z=sind(dec);
  // rotate so z is the local zenith
  var xhor=x*sind(obs.latitude)-z*cosd(obs.latitude);
  var yhor=y;
  var zhor=x*cosd(obs.latitude)+z*sind(obs.latitude);
  var azimuth=rev(atan2d(yhor,xhor)+180.0); // so 0 degrees is north
  var altitude=atan2d(zhor,Math.sqrt(xhor*xhor+yhor*yhor));
  return new Array(altitude,azimuth);
}

function observatory(year, month, day, hours, lat, lon) {
  this.year = year;
  this.month = month;
  this.day = day;
  this.hours = hours;
  this.minutes = 0;
  this.seconds = 0;
  this.tz = 0;
  this.latitude = lat;
  this.longitude = lon;
}

// From https://www.valentinog.com/blog/html-table/ and modified
function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();

  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);

    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();

    for (key in element) {
      let cell = row.insertCell();

      let text = document.createTextNode(element[key]);

      cell.appendChild(text);

      if(key === "Window Altitude Delta" || key === "Window Azimuth Delta")
      {
        if(-5 < element[key] && element[key] < 5)
        {
          cell.style.color = "MediumSeaGreen"
        }
        else if(-10 < element[key] && element[key] < 10)
        {
          cell.style.color = "gold"
        }
        else if(-20 < element[key] && element[key] < 20)
        {
          cell.style.color = "orange"
        }
        else if(-20 >= element[key] || element[key] >= 20)
        {
          cell.style.color = "red"
        }        
      }
    }
  }
}

// all mine from here down
Date.prototype.addHours= function(h){
  this.setHours(this.getHours()+h);
  return this;
}

function setValidation(isValid, Id) {
  if(isValid) {
    document.getElementById(Id).className = "form-group";
  }
  else {
    document.getElementById(Id).classList.add("has-error");
    document.getElementById(Id).classList.add("has-feedback");
  }
}

function display(form) {
  // should check these values are in bounds
  var latitude = parseFloat(document.getElementById("latitude").value);
  var longitude = parseFloat(document.getElementById("longitude").value);
  var windowAltitude = parseFloat(document.getElementById("windowAltitude").value);
  var windowAzimuth = parseFloat(document.getElementById("windowAzimuth").value);

  // validate latitude
  var isValid = true;
  if (isNaN(latitude) || (latitude > 90 || latitude < -90)) {
    setValidation(false, "latGroup");

    isValid = false;
  }
  else {
    setValidation(true, "latGroup");
  }
 
  // validate longitude
  if (isNaN(longitude) || (longitude > 180 || longitude < -180)) {
    setValidation(false, "longGroup");

    isValid = false;
  }
  else {
    setValidation(true, "longGroup");
  }

  // validate altitude
  if (isNaN(windowAltitude) || (windowAltitude > 90 || windowAltitude < -90)) {
    setValidation(false, "altGroup");

    isValid = false;
  }
  else {
    setValidation(true, "altGroup");
  }

  // validate Azimuth
  if (isNaN(windowAzimuth) || (windowAzimuth > 360 || windowAzimuth < 0)) {
    setValidation(false, "azGroup");

    isValid = false;
  }
  else {
    setValidation(true, "azGroup");
  }

  // alert and stop if we failed validation
  if(isValid == false)
  {
    alert("One or more form elements was filled out in-correctly");
    return;
  }

  // calculate the table 
  var hoursCount = 24 * 30;

  var data = [];
  for(var k = 0; k <= hoursCount; k++)
  {
    var date = new Date().addHours(k);

    var observer = new observatory(
      date.getUTCFullYear(), 
      date.getUTCMonth() + 1, 
      date.getUTCDate(),
      date.getUTCHours(),
      latitude, 
      longitude * -1);

    var moonPos = MoonPos(observer);

    data.push({
      Time: date.toDateString() + " " + date.getHours() + ":00:00",
      // RightAscension: moonPos.RightAscension,
      // Declination: moonPos.Declination,
      // Distance: moonPos.Distance,
      "Moon Altitude": moonPos.Altitude,
      "Moon Azimuth": moonPos.Azimuth,
      "Window Altitude Delta": windowAltitude - moonPos.Altitude,
      "Window Azimuth Delta": windowAzimuth - moonPos.Azimuth
    })

  }

  // build the table
  let table = document.querySelector("table");
  let keys = Object.keys(data[0]);

  table.innerHTML = "";
  
  generateTableHead(table, keys);
  generateTable(table, data);
}
