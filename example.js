let count=0;
let clickcounter=0;
let boxes;
let t;
let studentaverige=0;
let missedCount=0;
let missed;
let averigecounter=0;
let rowcount=0;
let getrow;
let student;
var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
let day = new Date([5]);
let getTot = daysInMonth(day.getMonth(),day.getFullYear()); //Get total days in a month
let mon = new Array();   //Declaring array for inserting mondays
  mon.push(30);
let daycount =0
/*---------------------------------------------- adding boxes by Click -------------------------------------------------*/
document.getElementById("add_day").addEventListener("click", function(){
    if (count == 0){
        averigecounter=0
        document.getElementById('Average_mark').innerHTML = "Avarage mark " + averigecounter
    }
      let Ldays= document.createElement('div');
      if(count>= 15){
        let text = document.createTextNode("May / " +mon[daycount]);
        Ldays.appendChild(text)
        daycount++;
      }
      else{
       let text = document.createTextNode("April / " +mon[daycount]);
       Ldays.appendChild(text)
       daycount++;}
      document.querySelector('#flex_box').appendChild(Ldays)
       
      Ldays.setAttribute('class',"lesson_days")
      Ldays.setAttribute('id',"lesson_days"+ count)
      
    for (let i=1; i<=15; i++){
        count ++;
         boxes = document.createElement("div");
         t = document.createTextNode(0);
        document.getElementById('flex_box').appendChild(boxes)
        boxes.appendChild(t);
        boxes.setAttribute('id', "box"+count);
        boxes.setAttribute('class', "box row"+i);
        }
        document.querySelector(".total_days").innerHTML ="Total Days "+(count/15);//counts total days on adding days 
                     missedLessons()//count missed lessons on click
                     studentAverage()
                  
})

/*-----------------------------------------removing boxes on Click button---------------------------------------------*/
document.getElementById("remove_day").addEventListener("click", function(){

    if (count == 0){
        alert("There is no div to remove!")
        averigecounter=0
        document.getElementById('Average_mark').innerHTML = "Avarage mark " + averigecounter
    }
   else{
       let lessondays = document.querySelector('#lesson_days'+(count-15))
       let lessondaysparent = document.querySelector('#flex_box');
        lessondaysparent.removeChild(lessondays)
    for (let j=count; j > count-15; j--){
        let child=  document.querySelector("#box"+j);
        let parent = document.querySelector('#flex_box')
         parent.removeChild(child);
         if(child.innerHTML==0){
            missedCount--;
         document.getElementById("missed_lessons").innerHTML =" Missed Lessons " + missedCount;
            }
        }
        count -= 15;
    }
    document.querySelector(".total_days").innerHTML ="Total Days " + (count / 15);// counts totL Days when removing days
    studentAverage()
    
})
/*---------------------------------------------------- counting missed lessons-------------------------------------- */
function missedLessons(){
  
    for( a=count-14; a<=count; a++){
       missed = document.getElementById("box"+a).innerHTML
       if(missed == 0){
        missedCount++;
     document.getElementById("missed_lessons").innerHTML =" Missed Lessons " + missedCount;
        }
      
    }

}
/*-------------------------------------- adding click on all boxes we create above-------------------------------------*/
document.querySelector('#flex_box').addEventListener("click", function(event){//changing scores of students
    let clicked = event.target;
    let currentID = clicked.id ;// getting id of clicked element
    let score=Number(prompt("enter score"))
       if(score > 5){
             score=5 
             averigecounter += score;
             document.getElementById('Average_mark').innerHTML = "Avarage mark " + (averigecounter/count).toFixed(2);
             document.getElementById(currentID).innerHTML=score;
             document.getElementById(currentID).style.backgroundColor="green"
      
        }else if( isNaN(score)){
            score=Number(prompt("enter score"))
            missedCount++
            document.getElementById("missed_lessons").innerHTML =" Missed Lessons " + missedCount;
  
        }else if(score == 0  || score < 0){
            document.getElementById(currentID).style.backgroundColor="red"
            missedCount++
        document.getElementById("missed_lessons").innerHTML =" Missed Lessons " + missedCount;
       score=0;
        }
            else{
        document.getElementById(currentID).innerHTML=score;
        document.getElementById(currentID).style.backgroundColor="green"}
        missedCount--
        document.getElementById("missed_lessons").innerHTML =" Missed Lessons " + missedCount;
         averigecounter += score;
        document.getElementById('Average_mark').innerHTML = "Avarage mark " + (averigecounter/count).toFixed(2);
        if(count==0){
            document.getElementById(currentID).style.backgroundColor="#DCDCDC"
        }
        studentAverage()
        })
 /*------------------------------- updating average of students by clicking button Update Table------------------------*/
    document.getElementById("update_table").addEventListener("click", function(){
  
        studentAverage()
})
/*-------------------------------------------looping through days in month--------------------------------------------*/
for(var i=1;i<=getTot;i++){   
    var newDate = new Date(day.getFullYear(),day.getMonth(),i)
    if(newDate.getDay()==1 || newDate.getDay()==6 || newDate.getDay()==3 || newDate.getDay()==5){   //if Sunday
        mon.push(i);
        
    }  
}
function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}
console.log(mon);

/*--------------------------------------------- student average -------------------------------------------------------*/
function studentAverage(){
    for(let k=1; k<=15; k++){
        let getrow=document.getElementsByClassName('row'+k)
 for(let i=0; i<count/15; i++){
     studentaverige += Number(getrow[i].innerHTML)
     
   }

 document.getElementById("student_"+k).innerHTML=(studentaverige/(document.getElementsByClassName('row'+k).length)).toFixed(2)
 studentaverige=0
 }
}
