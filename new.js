var indcase = document.querySelector('.inacase');
var temperature = document.querySelector('.temp');
var humidy = document.querySelector('.humid');
var co = document.querySelector('.covid');
var temperature1 = document.querySelector('.temp1');
var humidy1 = document.querySelector('.humid1');
var co1 = document.querySelector('.covid1');
var coa = document.querySelector('.coa');
var itemp = document.querySelector('.itemp');
var ihumid = document.querySelector('.ihumid');
var icase = document.querySelector('.icase');

var tempv;
var t;
var ctx = document.getElementById('myChart').getContext('2d');
var arr = [];
var h;
var arra;
var urllh;
var url = "https://api.thingspeak.com/update?api_key=RCZVUE4ZKR8IZ4LV&field1=";
var urlh = "https://api.thingspeak.com/update?api_key=RCZVUE4ZKR8IZ4LV&field3=";
var humidty;
var cases;
var data;
var urlc = "https://api.thingspeak.com/update?api_key=RCZVUE4ZKR8IZ4LV&field4=";


var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Temperature', 'Humidity', 'Cases'],
        datasets: [{
            label: 'Factors',
            data: [0, 0, 0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(255, 206, 86, 0.4)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {

        responsive: false,
        maintainAspectRatio: false,

        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function updatec(arra) {
    myChart.data.datasets[0].data = arra;
    myChart.update();
}

var ctx1 = document.getElementById('sarea').getContext('2d');
var myChart1 = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ['Temperature', 'Humidity', "Cases"],
        datasets: [{
            label: 'Factors',
            data: [0, 0, 0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(255, 206, 86, 0.4)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {

        responsive: false,
        maintainAspectRatio: false,

        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function updates(arra) {
    myChart1.data.datasets[0].data = arra;
    myChart1.update();
}

async function myfunction() {


    var url1 = "https://api.openweathermap.org/data/2.5/weather?q=";
    var url2 = "&appid=07a118790ed3d6e7e939705dfd3539fa";
    var i = "India";
    var d = "Delhi";
    var url3 = url1 + i + url2;
    var url4 = url1 + d + url2;
    var data2 = await fetch(url4);
    var data1 = await fetch(url3);
    const jdata2 = await data2.json();
    const jdata1 = await data1.json();

    ihumid.innerHTML = jdata1['main']['humidity'];
    itemp.innerHTML = jdata1['main']['temp'];

    humidty = jdata2['main']['humidity'];
    tempv = jdata2['main']['temp'];
    temperature.innerHTML = tempv;
    temperature1.innerHTML = tempv;
    t = tempv;
    humidy.innerHTML = humidty;
    humidy1.innerText = humidty;

    urll = url + t;
    arr[0] = t;
    h = humidty;
    arr[1] = h;

    urllh = urlh + h;
    fetch(urll, { method: 'POST' });
    fetch(urllh, { method: 'POST' });

    var data3 = await fetch("https://api.apify.com/v2/actor-tasks/Dau8q3IjtaxIvQRru/runs/last/dataset/items?token=GWQfkcTTgNnN4MzfxxttF7D4Z");

    const jdata = await data3.json();
    var activecase;
    var incase = Number(jdata[0].activeCasesNew);
    if (incase < 0) {
        incase = incase * -1;
    }
    var inacase1 = jdata[0].activeCases;
    icase.innerHTML = incase;
    var inca = document.querySelector('.inacase');
    indcase.innerText = inacase1;
    for (var i = 0; i < jdata[0].regionData.length; i++) {

        if (jdata[0].regionData[i].region == "Delhi") {
            cases = Number(jdata[0].regionData[i].newInfected);

            activecase = jdata[0].regionData[i].activeCases;
            if (cases < 0) {
                cases = cases * -1;
            }

        }
    }
    coa.innerHTML = activecase;
    co1.innerHTML = cases;

    var urllc = urlc + cases;
    arr[2] = cases;
    fetch(urllc, { method: "POST" });
    updatec(arr);
}

async function searchl() {
    var loc = document.getElementById('place').value;
    var url1 = "https://api.openweathermap.org/data/2.5/weather?q=";
    var url2 = "&appid=07a118790ed3d6e7e939705dfd3539fa";
    var surl = url1 + loc + url2;
    var dataa = await fetch(surl);
    const jdata2 = await dataa.json();
    var humidtys = jdata2['main']['humidity'];
    var tempvs = jdata2['main']['temp'];
    var shumid1 = document.querySelector('.shumid');
    var stemp1 = document.querySelector('.stemp');
    var templ = [];
    var huml = [];
    stemp1.innerHTML = tempvs;
    shumid1.innerHTML = humidtys;
    var scases;
    var arr = [];
    arr[0] = tempvs;
    arr[1] = humidtys;
    var data2 = await fetch("https://api.apify.com/v2/actor-tasks/Dau8q3IjtaxIvQRru/runs/last/dataset/items?token=GWQfkcTTgNnN4MzfxxttF7D4Z");

    const jdata = await data2.json();

    for (var i = 0; i < jdata[0].regionData.length; i++) {

        if (jdata[0].regionData[i].region == loc) {
            scases = -Number(jdata[0].regionData[i].newInfected);
            if (scases < 0) {
                scases = scases * -1;
            }
        }
    }
    arr[2] = scases;
    huml[0] = scases;
    huml[1] = humidtys;
    templ[0] = scases;
    templ[1] = tempvs;
    createline(templ, huml);
    updates(arr);
}

var ctx2 = document.getElementById('comp').getContext('2d');
var arr1 = [];
var arr2 = [];
var myChart3 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Humidity', 'Temperature', 'corona Cases'],
        datasets: [{
                label: 'Location1',
                data: [0, 0, 0],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(54, 162, 235, 0.4)',
                    'rgba(54, 162, 235, 0.4)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1

            },
            {
                label: 'Location2',
                data: [0, 0, 0],
                borderColor: ['rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                backgroundColor: ['rgba(255, 99, 132, 0.2)',
                    'rgba(255, 99, 132, 0.1)',
                    'rgba(255, 99, 132, 0.2)'
                ]
            }
        ]
    },
    options: {

        responsive: false,
        maintainAspectRatio: false,

        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
var arra1 = [];
var arra2 = [];

function updatecomp(arra1, arra2) {
    myChart3.data.datasets[0].data = arra1;
    myChart3.data.datasets[1].data = arra2;
    myChart3.update();
}
var line = [];
var cline = [];
cline[0] = document.getElementById('line1').getContext('2d');
cline[1] = document.getElementById('line2').getContext('2d');
var pie = [];
var labels = [];
var cpie = [];
cpie[0] = document.getElementById('pie1').getContext('2d');
cpie[1] = document.getElementById('pie2').getContext('2d');
cpie[2] = document.getElementById('pie3').getContext('2d');

var lname = ['Temperature line chart', 'Humidity line Chart', 'Cases line Chart'];

line[1] = new Chart(cline[1], {
    type: 'line',
    data: {
        labels: ['cases', 'Humidity'],
        datasets: [{
            label: 'Locations',
            data: [0, 0],
            backgroundColor: [
                'rgba(255,69,0, 0.4)',
                'rgba(54, 162, 235, 0.4)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1

        }]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Cases V/S Humidity'
            }
        }
    },

});


line[0] = new Chart(cline[0], {
    type: 'line',
    data: {
        labels: ['cases', 'Temperature'],
        datasets: [{
            label: 'Locations',
            data: [0, 0],
            backgroundColor: [
                'rgba(255,69,0, 0.4)',
                'rgba(54, 162, 235, 0.4)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1

        }]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Cases V/S Temperature'
            }
        }
    },

});



for (var i = 0; i < 3; i++) {


    pie[i] = new Chart(cpie[i], {
        type: 'line',
        data: {
            labels: ['location 1', 'loaction 2'],
            datasets: [{
                label: 'Locations',
                data: [0, 0],
                backgroundColor: [
                    'rgba(255,69,0, 0.4)',
                    'rgba(54, 162, 235, 0.4)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1

            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: lname[i]
                }
            }
        },

    });

}

function createpie(set1, set2, set3) {
    pie[0].data.datasets[0].data = set1;
    pie[1].data.datasets[0].data = set2;
    pie[2].data.datasets[0].data = set3;
    pie[0].update();
    pie[1].update();
    pie[2].update();


}

function createline(setl1, setl2) {
    line[0].data.datasets[0].data = setl1;
    line[1].data.datasets[0].data = setl2;

    line[0].update();
    line[1].update();



}





async function compares() {
    var loc1 = document.getElementById('comp1').value;
    var loc2 = document.getElementById('comp2').value;
    var url1 = "https://api.openweathermap.org/data/2.5/weather?q=";
    var url2 = "&appid=07a118790ed3d6e7e939705dfd3539fa";
    var surl1 = url1 + loc1 + url2;
    var surl2 = url1 + loc2 + url2;
    var scases1;
    var scases2;
    var par1 = [];
    var par2 = [];
    var par3 = [];

    var dataa1 = await fetch(surl1);
    const jdata1 = await dataa1.json();
    var humidtys1 = jdata1['main']['humidity'];
    var tempvs1 = jdata1['main']['temp'];
    var dataa2 = await fetch(surl2);
    const jdata2 = await dataa2.json();
    var humidtys2 = jdata2['main']['humidity'];
    var tempvs2 = jdata2['main']['temp'];
    arr1[0] = humidtys1;
    arr1[1] = tempvs1;
    arr2[0] = humidtys2;
    arr2[1] = tempvs2;
    var data2 = await fetch("https://api.apify.com/v2/actor-tasks/Dau8q3IjtaxIvQRru/runs/last/dataset/items?token=GWQfkcTTgNnN4MzfxxttF7D4Z");

    const jdata = await data2.json();

    for (var i = 0; i < jdata[0].regionData.length; i++) {

        if (jdata[0].regionData[i].region == loc1) {
            scases1 = -Number(jdata[0].regionData[i].newInfected);
            if (scases1 < 0) {
                scases1 = scases1 * -1;
            }
        }
        if (jdata[0].regionData[i].region == loc2) {
            scases2 = -Number(jdata[0].regionData[i].newInfected);
            if (scases2 < 0) {
                scases2 = scases2 * -1;
            }

        }
    }
    arr1[2] = scases1;
    arr2[2] = scases2;
    par1[0] = tempvs1;
    par1[1] = tempvs2;
    par2[0] = humidtys1;
    par2[1] = humidtys2;
    par3[0] = scases1;
    par3[1] = scases2;
    createpie(par1, par2, par3);
    updatecomp(arr1, arr2);

}



setInterval(myfunction, 3000);