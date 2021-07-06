var Chart= require('chart.js')
var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
var graphbtn = document.getElementById('graphbtn');
var localMDB = new PouchDB('s16marksdb')


 var labelum=['0-10','11-20','21-30','31-40','41-50','51-60','61-70','71-80','81-90','91-100'];
 var datum=[0,0,0,0,0,0,0,0,0,0];

 localMDB.createIndex({
    index: {
        fields: ['class','section','term','subject','name','marks']
      }
}).then(function(index) {	
    localMDB.find({
        selector: {
            class:"class1",
            section:"A",
            term:"second",
            subject:"english"
          
          },
    }).then(function(result) {
        console.log(result.docs.map(function(doc) {
      //   var inputum = document.createElement('INPUT');
        //   inputum.setAttribute("type","checkbox");
        //   inputum.setAttribute("placeholder",doc.name+" attendance");
        //   inputum.setAttribute("value","present");
        //   inputum.setAttribute("id",doc.name+" attendance");
        //   document.body.appendChild(inputum)
        //   console.log(doc.name )


        if(doc.marks<=100 && doc.marks>90){
            datum[9]++
        }
        if(doc.marks<=90 && doc.marks>80){
            datum[8]++
        }
        if(doc.marks<=80 && doc.marks>70){
            datum[7]++
        }
        if(doc.marks<=70 && doc.marks>60){
            datum[6]++
        }
        if(doc.marks<=60 && doc.marks>50){
            datum[5]++
        }
        if(doc.marks<=50 && doc.marks>40){
            datum[4]++
        }
        if(doc.marks<=40 && doc.marks>30){
            datum[3]++
        }
        if(doc.marks<=30 && doc.marks>20){
            datum[2]++
        }
        if(doc.marks<=20 && doc.marks>10){
            datum[1]++
        }
        if(doc.marks<=10 && doc.marks>0){
            datum[0]++
        }           
        console.log(datum)
        console.log(labelum)

          }));	

            
    });	
});





function graphshow(){
    console.log("graph processed")
var ctx1 = document.getElementById('myChart1').getContext('2d');
var myBarChart = new Chart(ctx1, {
  type: 'bar',
    data: {
        labels:labelum,
        datasets: [{
            label: '# of Students',
            data: datum,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

var myPieChart = new Chart(ctx3, {
    type: 'pie',
    data: {
      datasets: [{
        data:[65,59,80,81,56,55,40],
        backgroundColor: [
        'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)'
        ],
        label: 'Dataset 1'
      }],
      labels: [
        'Red',
        'Orange',
        'Yellow',
        'Green',
        'Blue'
      ]
    },
    options: {
      responsive: true
    }
});


}



graphbtn.addEventListener("click",function()
  {
      console.log("adc")
    graphshow();
  })