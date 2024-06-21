const label = $('.inputGroup label')
const btn = $('.btn')
const outs = $('.num')

var date = function(day,month,year){
  this.day=day
  this.month=month
  this.year=year
}

var indate = new date(0,0,0)

let currentDate = new date(moment().format("DD"),moment().format("MM"),moment().format("YYYY"))
console.log(currentDate);
// console.log(moment('2021-02-30').format("YYYY-MM-DD"));
console.log('2'.length);

const checkYear = function(){
  let yearLab = label.eq(2)
  let year = yearLab.children('input').val()
  while(year.length < 4) year = '0' + year
  if(year == ''){
    yearLab.children('err2').css('display','none')
    yearLab.children('err').css('display','block')
  }
  else if(year > currentDate.year) {
    yearLab.children('err').css('display','none')
    yearLab.children('err2').css('display','block')
  }
  else{
    yearLab.children('err').css('display','none')
    yearLab.children('err2').css('display','none')
    indate.year = year
    return 0
  }
  indate.year = 0
}

const checkMonth = function(){
  let monthLab = label.eq(1)
  let month = monthLab.children('input').val()
  if(month == ''){
    monthLab.children('err2').css('display','none')
    monthLab.children('err').css('display','block')
  }
  else if(month > 12 || month<1) {
    monthLab.children('err').css('display','none')
    monthLab.children('err2').css('display','block')
  }
  else{
    monthLab.children('err').css('display','none')
    monthLab.children('err2').css('display','none')
    return 0
  }
  indate.month = 0
}

const checkDay = function(){
  let dayLab = label.eq(0)
  let day = dayLab.children('input').val()
  if(day == ''){
    dayLab.children('err2').css('display','none')
    dayLab.children('err3').css('display','none')
    dayLab.children('err').css('display','block')
  }
  else if(day > 31 || day<1) {
    dayLab.children('err').css('display','none')
    dayLab.children('err3').css('display','none')
    dayLab.children('err2').css('display','block')
  }
  else if(indate.month && indate.year){
    if(!(moment(`${indate.year}-${indate.month}-${day}`).format("YYYY-MM-DD").includes('-'))){
      dayLab.children('err').css('display','none')
      dayLab.children('err2').css('display','none')
      dayLab.children('err3').css('display','block')
    }
  }
  else{
    dayLab.children('err').css('display','none')
    dayLab.children('err2').css('display','none')
    dayLab.children('err3').css('display','none')
    indate.day = day
    return 0
  }
  indate.day = day
}

btn.on('click', function (){

})