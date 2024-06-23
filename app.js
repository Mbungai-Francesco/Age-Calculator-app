const label = $('.inputGroup label')
const btn = $('.btn')
const outs = $('.num')

var date = function(year,month,day){
  this.year=Number(year)
  this.month=Number(month)
  this.day=Number(day)
}

var indate

let currentDate = new date(moment().format("YYYY"),moment().format("MM"),moment().format("DD"))
console.log(currentDate);
// console.log(moment('2021-02-30').format("YYYY-MM-DD"));
console.log('2'.length);

const stringAndCheck = (obj) =>{
  y = String(obj.year)
  while(y.length < 4 && y!= '') y = '0' + y
  m = String(obj.month)
  while(m.length < 2 && m!= '') m = '0' + m
  d = String(obj.day)
  while(d.length < 2 && d!= '') d = '0' + d
  return {
    day:d,
    month1:m,
    year:y
  }
}

const checkYear = function(){
  let yearLab = label.eq(2)
  let year = yearLab.children('input').val()
  while(year.length < 4 && year!= '') year = '0' + year
  if(year == 0){
    yearLab.children('.err2').css('display','none')
    yearLab.children('.err').css('display','block')
    label.addClass('turnRed')
  }
  else if(year > currentDate.year) {
    yearLab.children('.err').css('display','none')
    yearLab.children('.err2').css('display','block')
    label.addClass('turnRed')
  }
  else{
    yearLab.children('.err').css('display','none')
    yearLab.children('.err2').css('display','none')
    indate.year = Number(year)
    return 0
  }
  indate.year = 0
}

const checkMonth = function(){
  let monthLab = label.eq(1)
  let month = monthLab.children('input').val()
  while(month.length < 2 && month!= '') month = '0' + month
  if(month == 0){
    monthLab.children('.err2').css('display','none')
    monthLab.children('.err').css('display','block')
    label.addClass('turnRed')
  }
  else if(month > 12 || month<1) {
    monthLab.children('.err').css('display','none')
    monthLab.children('.err2').css('display','block')
    label.addClass('turnRed')
  }
  else{
    monthLab.children('.err').css('display','none')
    monthLab.children('.err2').css('display','none')
    console.log(month);
    indate.month = Number(month)
    console.log(indate.month);
    return 0
  }
  indate.month = 0
}

const checkDay = function(){
  let dayLab = label.eq(0)
  let day = dayLab.children('input').val()
  inD = stringAndCheck(indate)
  console.log(day);
  if(day == 0){
    dayLab.children('.err2').css('display','none')
    dayLab.children('.err3').css('display','none')
    dayLab.children('.err').css('display','block')
    label.addClass('turnRed')
  }
  else if(day > 31 || day<1) {
    dayLab.children('.err').css('display','none')
    dayLab.children('.err3').css('display','none')
    dayLab.children('.err2').css('display','block')
    label.addClass('turnRed')
  }
  else if(inD.month && inD.year){
    console.log(`${String(inD.year)}-${String(inD.month)}-${String(inD.day)}`);
    if(!(moment(`${String(inD.year)}-${String(inD.month)}-${String(inD.day)}`).format("YYYY-MM-DD").includes('-'))){
      dayLab.children('.err').css('display','none')
      dayLab.children('.err2').css('display','none')
      dayLab.children('.err3').css('display','block')
      label.addClass('turnRed')
    }
    else{
      dayLab.children('.err').css('display','none')
      dayLab.children('.err2').css('display','none')
      dayLab.children('.err3').css('display','none')
      indate.day = Number(day)
      return 0
    }
  }
  else{
    dayLab.children('.err').css('display','none')
    dayLab.children('.err2').css('display','none')
    dayLab.children('.err3').css('display','none')
    indate.day = Number(day)
    return 0
  }
  indate.day = 0
}

const displayAge = (y,m,d) =>{
  outs.eq(0).text(0)
  outs.eq(1).text(0)
  outs.eq(2).text(0)
  let time = 50
  let [yi,mi,di] = [0,0,0]
  console.log(yi,mi,di);
  let animey = setInterval(() =>{
    if(outs.eq(0).text() < y){
      yi++
      outs.eq(0).text(yi)
    }
    else clearInterval(animey)
  },time)
  let animem = setInterval(() =>{
    if(outs.eq(1).text() < m){
      mi++
      outs.eq(1).text(mi)
    }
    else clearInterval(animem)
  },time)
  let animed = setInterval(() =>{
    if(outs.eq(2).text() < d){
      di++
      outs.eq(2).text(di)
    }
    else clearInterval(animed)
  },time)
  
}

btn.on('click', function (){
  indate = new date(label.eq(2).children('input').val(),label.eq(1).children('input').val(),label.eq(0).children('input').val())
  checkYear()
  checkMonth()
  checkDay()
  console.log(indate);
  if(indate.month && indate.year && indate.day){
    label.removeClass('turnRed')
    let numYears = Number(currentDate.year - indate.year)
    let numMon = Number(currentDate.month - indate.month)
    console.log(numMon);
    let numDay = Number(currentDate.day - indate.day)
    if(indate.month == currentDate.month && indate.day == currentDate.day){
      displayAge(numYears,0,0)
    }
    if(numMon < 0) {
      console.log(numYears);
      numMon = (12 - Number(indate.month)) + Number(currentDate.month)
      if(currentDate.day == indate.day){
        displayAge(numYears-1,numMon,0)
      }
      else if(currentDate.day < indate.day){
        numDay = (31 - indate.day) + currentDate.day
        displayAge(numYears-1,numMon-1,numDay)
      }
      else{
        numDay = currentDate.day - indate.day
        displayAge(numYears-1,numMon,numDay)
      }
    }
    else{
      if(currentDate.day == indate.day){
        displayAge(numYears,numMon,0)
      }
      else if(currentDate.day < indate.day){
        numDay = (31 - indate.day) + currentDate.day
        displayAge(numYears,numMon-1,numDay)
      }
      else{
        numDay = currentDate.day - indate.day
        displayAge(numYears,numMon,numDay)
      }
    }
    // else if(currentDate.day < indate.day){
    //   outs.eq(0).text(numYears)
    //   outs.eq(1).text(numMon - 1)
    //   outs.eq(2).text(numMon - 1)
    // }
    
  };
})