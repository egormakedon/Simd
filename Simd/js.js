/*
@author: Весь код данной лабораторной работы полностью разработан ст. группы 521701 Македоном Е.А.
 */

"use strict"                //Использование современного стандарта

//Инициализация переменных, используемых в работе программы

var p = 0;
var m = 0;
var q = 0;
var N = 0;

var constM = 0;
var constN = 0;

var t1 = 0;
var t2 = 0;
var t3 = 0;
var t4 = 0;
var t5 = 0;

var T1 = 0;
var Tn = 0;
var D = 0;

var arrA = [];
var arrB = [];
var arrC = [];

function run() {
    m = constM;
    N = constN;

    //Проверки на ввод корректных данных

    if (isNaN(p) || isNaN(m) || isNaN(q) || p < 1 || m < 1 || q < 1) {
        alert("Ошибка ввода");
        return;
    }

    if (isNaN(t1) || isNaN(t2) || isNaN(t3) || isNaN(t4) || isNaN(t5) ||
        t1 < 1 || t2 < 1 || t3 < 1 || t4 < 1 || t5 < 1) {
        alert("Ошибка ввода");
        return;
    }

    if (isNaN(N) || N < 1) {
        alert("Ошибка ввода");
        return;
    }

    //Получение элементов из документа HTML

    var matrixA = document.getElementById("matrixA");
    var matrixB = document.getElementById("matrixB");
    var matrixC = document.getElementById("matrixC");
    var timeT1 = document.getElementById("T1");
    var timeTn = document.getElementById("Tn");
    var tableKy = document.getElementById("Ky");
    var tableE = document.getElementById("e");
    var tableD = document.getElementById("D");

    setArrA();      //Вызов функции заполенния матрицы A числами от [-1, 1]
    setArrB();      //Вызов функции заполенния матрицы B числами от [-1, 1]
    setArrC();      //Вызов функции заполенния матрицы C в соответствии с Вариантом №6

    drawMatrixA(matrixA);        //Вызов функции отрисовки матрицы A на экране
    drawMatrixB(matrixB);        //Вызов функции отрисовки матрицы B на экране
    drawMatrixC(matrixC);        //Вызов функции отрисовки матрицы C на экране

    //Выозов функций отрисовки элементов на экране

    drawEl(timeT1, T1);
    drawEl(timeTn, Tn);
    drawEl(tableKy, parseFloat((T1 / Tn).toFixed(2)));
    drawEl(tableE, parseFloat(((T1 / Tn) / N).toFixed(2)));
    drawEl(tableD, parseFloat(D.toFixed(2)));

    m = 50;

    setArrA();
    setArrB();

    //Вызов функций отрисовки графиков

    drawCH1();
    drawCH2();
    drawCH3();
    drawCH4();
    drawCH5();
    drawCH6();
}               //Основная функция запуска программы

//Функции установелния введенного значения

function setP(text) {
    p = +text;
}
function setM(text) {
    m = +text;
    constM = m;
}
function setQ(text) {
    q = +text;
}
function setT1(text) {
    t1 = +text;
}
function setT2(text) {
    t2 = +text;
}
function setT3(text) {
    t3 = +text;
}
function setT4(text) {
    t4 = +text;
}
function setT5(text) {
    t5 = +text;
}
function setN(text) {
    N = +text;
    constN = N;
}

function setArrA() {
    arrA = [];

    for (var i = 0; i < p; i++) {
        var mass = [];
        arrA.push(mass);

        for (var j = 0; j < m; j++) {
            var rand = -1 + Math.random() * 2;
            rand = parseFloat(rand.toFixed(2));
            arrA[i][j] = rand;
        }
    }
}           //Заполенние матрицы А рандомными значениями [-1, 1]
function setArrB() {
    arrB = [];

    for (var i = 0; i < m; i++) {
        var mass = [];
        arrB.push(mass);

        for (var j = 0; j < q; j++) {
            var rand = -1 + Math.random() * 2;
            rand = parseFloat(rand.toFixed(2));
            arrB[i][j] = rand;
        }
    }
}           //Заполенние матрицы B рандомными значениями [-1, 1]
function setArrC() {
    arrC = [];

    T1 = 0;
    Tn = 0;
    D = 0;

    var operationMass = [];        //матриаца хранения рангов операций на каждом блоке задачи

    for (var i = 0; i < 5; i++) {
        var newMass = [];
        operationMass.push(newMass);
    }

    //Переменные хранения количества всех операций за выполенние всей программы

    var kolT1 = 0;
    var kolT2 = 0;
    var kolT3 = 0;
    var kolT4 = 0;
    var kolT5 = 0;

    for (var i = 0; i < p; i++) {
        var mass = [];
        arrC.push(mass);

        for (var j = 0; j < q; j++) {
            var sum = 0;

            for (var k = 0; k < m; k++) {
                kolT5 += 2;
                kolT4++;

                operationMass[4].push(1);
                operationMass[4].push(1);
                operationMass[3].push(2);

                if (Math.abs(arrA[i][k]) <= Math.abs(arrB[k][j])) {
                    sum += arrA[i][k] * arrB[k][j];

                    kolT3++;
                    operationMass[2].push(2);
                }

                else {
                    kolT4++;
                    operationMass[3].push(2);

                    if (arrA[i][k] == 0) {
                        sum += arrA[i][k] * arrA[i][k] + arrB[k][j];

                        kolT1++;
                        kolT3++;

                        operationMass[0].push(3);
                        operationMass[2].push(2);
                    }

                    else {
                        sum += arrA[i][k] * arrA[i][k] - Math.abs(arrA[i][k] * arrB[k][j]);

                        kolT3 += 2;
                        kolT2++;
                        kolT5++;

                        operationMass[2].push(2);
                        operationMass[2].push(2);
                        operationMass[1].push(4);
                        operationMass[4].push(2);
                    }
                }
            }

            sum = parseFloat(sum.toFixed(2));
            arrC[i][j] = sum;
        }
    }

    calculation(kolT1, kolT2, kolT3, kolT4, kolT5, operationMass);
}

function calculation(kolT1, kolT2, kolT3, kolT4, kolT5, operationMass) {
    T1 += kolT1 * t1 + kolT2 * t2 + kolT3 * t3 + kolT4 * t4 + kolT5 * t5 + (m - 1) * p * q * t1;

    if (kolT1 != 0 && kolT1 % N != 0) Tn += Math.ceil(kolT1 / N) * t1;
    else Tn += (kolT1 / N) * t1;

    if (kolT2 != 0 && kolT2 % N != 0) Tn += Math.ceil(kolT2 / N) * t2;
    else Tn += (kolT2 / N) * t2;

    if (kolT3 != 0 && kolT3 % N != 0) Tn += Math.ceil(kolT3 / N) * t3;
    else Tn += (kolT3 / N) * t3;

    if (kolT4 != 0 && kolT4 % N != 0) Tn += Math.ceil(kolT4 / N) * t4;
    else Tn += (kolT4 / N) * t4;

    if (kolT5 != 0 && kolT5 % N != 0) Tn += Math.ceil(kolT5 / N) * t5;
    else Tn += (kolT5 / N) * t5;

    if (N == 1) Tn += (m - 1) * p * q * t1;
    else {
        var kol = (m - 1) * p * q;

        if (kol != 0 && kol % N != 0) Tn += Math.ceil(kol / N) * t1;
        else Tn += (kol / N) * t1;
    }

    var Lcp = 0;
    var R = 0;

    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < operationMass[i].length; j++) {
            if (i == 0) Lcp += operationMass[i][j] * t1;
            if (i == 1) Lcp += operationMass[i][j] * t2;
            if (i == 2) Lcp += operationMass[i][j] * t3;
            if (i == 3) Lcp += operationMass[i][j] * t4;
            if (i == 4) Lcp += operationMass[i][j] * t5;

            R += operationMass[i][j];
        }
    }

    for (var i = 1; i <= m - 1; i++) {
        Lcp += i * 4 * t1 * p * q;
        R += i * 4 * p * q;
    }

    D = Tn * R / Lcp;
}       //Функция вычисления T1, Tn, D после выполнения программы

function drawMatrixA(matrixA) {
    var html = "";

    for (var i = 0; i < p; i++) {
        html += "<tr>";

        for (var j = 0; j < m; j++) {
            html += "<td>";
            html += arrA[i][j];
            html += "</td>";
        }

        html += "</tr>";
    }

    matrixA.innerHTML = html;
}                   //Функция отрисовки матрицы А на экране
function drawMatrixB(matrixB) {
    var html = "";

    for (var i = 0; i < m; i++) {
        html += "<tr>";

        for (var j = 0; j < q; j++) {
            html += "<td>";
            html += arrB[i][j];
            html += "</td>";
        }

        html += "</tr>";
    }

    matrixB.innerHTML = html;
}                   //Функция отрисовки матрицы B на экране
function drawMatrixC(matrixC) {
    var html = "";

    for (var i = 0; i < p; i++) {
        html += "<tr>";

        for (var j = 0; j < q; j++) {
            html += "<td>";
            html += arrC[i][j];
            html += "</td>";
        }

        html += "</tr>";
    }

    matrixC.innerHTML = html;
}                   //Функция отрисовки матрицы С на экране
function drawEl(table, el) {
    var html = "<tr><td>"
    html += el + "</td></tr>";
    table.innerHTML = html;
}                       //Функция отрисовки элемента на экране

function drawCH1() {
    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = new google.visualization.DataTable();

        var result = [];

        data.addColumn('number', 'r');
        for (var i = 1; i <= 15; i++) data.addColumn('number', 'n = ' + i);

        for (var i = 1; i <= 50; i++) {
            var mass = [];
            result.push(mass);
        }

        for (var i = 1; i <= 50; i++) {
            m = i;

            for (var j = 1; j <= 15; j++) {
                N = j;

                setArrC();

                result[i - 1].push(T1 / Tn);
            }
        }

        for (var i = 0; i < 50; i++) {
            data.addRows([
                [i + 1, result[i][0], result[i][1], result[i][2], result[i][3], result[i][4], result[i][5], result[i][6], result[i][7], result[i][8],
                    result[i][9], result[i][10], result[i][11], result[i][12], result[i][13], result[i][14]]
            ]);
        }

        var options = {
            chart: {
                title: 'График Ky(n,r), при фиксированном значении n'
            },
            width: 800,
            height: 600
        };

        var chart = new google.charts.Line(document.getElementById('chart1'));

        chart.draw(data, google.charts.Line.convertOptions(options));
    }
}                           //Построение графика ky от r
function drawCH2() {
    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = new google.visualization.DataTable();

        var result = [];

        data.addColumn('number', 'n');
        for (var i = 1; i <= 15; i++) data.addColumn('number', 'r = ' + i);

        for (var i = 1; i <= 50; i++) {
            var mass = [];
            result.push(mass);
        }

        for (var i = 1; i <= 50; i++) {
            N = i;

            for (var j = 1; j <= 15; j++) {
                m = j;

                setArrC();

                result[i - 1].push(T1 / Tn);
            }
        }

        for (var i = 0; i < 50; i++) {
            data.addRows([
                [i + 1, result[i][0], result[i][1], result[i][2], result[i][3], result[i][4], result[i][5], result[i][6], result[i][7], result[i][8],
                    result[i][9], result[i][10], result[i][11], result[i][12], result[i][13], result[i][14]]
            ]);
        }

        var options = {
            chart: {
                title: 'График Ky(n,r), при фиксированном значении r'
            },
            width: 800,
            height: 600
        };

        var chart = new google.charts.Line(document.getElementById('chart2'));

        chart.draw(data, google.charts.Line.convertOptions(options));
    }
}                           //Построение графика ky от n
function drawCH3() {
    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = new google.visualization.DataTable();

        var result = [];

        data.addColumn('number', 'r');
        for (var i = 1; i <= 15; i++) data.addColumn('number', 'n = ' + i);

        for (var i = 1; i <= 50; i++) {
            var mass = [];
            result.push(mass);
        }

        for (var i = 1; i <= 50; i++) {
            m = i;

            for (var j = 1; j <= 15; j++) {
                N = j;

                setArrC();

                result[i - 1].push((T1 / Tn) / N);
            }
        }

        for (var i = 0; i < 50; i++) {
            data.addRows([
                [i + 1, result[i][0], result[i][1], result[i][2], result[i][3], result[i][4], result[i][5], result[i][6], result[i][7], result[i][8],
                    result[i][9], result[i][10], result[i][11], result[i][12], result[i][13], result[i][14]]
            ]);
        }

        var options = {
            chart: {
                title: 'График e(n,r), при фиксированном значении n'
            },
            width: 800,
            height: 600
        };

        var chart = new google.charts.Line(document.getElementById('chart3'));

        chart.draw(data, google.charts.Line.convertOptions(options));
    }
}                           //Построение графика e от r
function drawCH4() {
    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = new google.visualization.DataTable();

        var result = [];

        data.addColumn('number', 'n');
        for (var i = 1; i <= 15; i++) data.addColumn('number', 'r = ' + i);

        for (var i = 1; i <= 50; i++) {
            var mass = [];
            result.push(mass);
        }

        for (var i = 1; i <= 50; i++) {
            N = i;

            for (var j = 1; j <= 15; j++) {
                m = j;

                setArrC();

                result[i - 1].push((T1 / Tn) / N);
            }
        }

        for (var i = 0; i < 50; i++) {
            data.addRows([
                [i + 1, result[i][0], result[i][1], result[i][2], result[i][3], result[i][4], result[i][5], result[i][6], result[i][7], result[i][8],
                    result[i][9], result[i][10], result[i][11], result[i][12], result[i][13], result[i][14]]
            ]);
        }

        var options = {
            chart: {
                title: 'График e(n,r), при фиксированном значении r'
            },
            width: 800,
            height: 600
        };

        var chart = new google.charts.Line(document.getElementById('chart4'));

        chart.draw(data, google.charts.Line.convertOptions(options));
    }
}                           //Построение графика e от n
function drawCH5() {
    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = new google.visualization.DataTable();

        var result = [];

        data.addColumn('number', 'r');
        for (var i = 1; i <= 15; i++) data.addColumn('number', 'n = ' + i);

        for (var i = 1; i <= 50; i++) {
            var mass = [];
            result.push(mass);
        }

        for (var i = 1; i <= 50; i++) {
            m = i;

            for (var j = 1; j <= 15; j++) {
                N = j;

                setArrC();

                result[i - 1].push(D);
            }
        }

        for (var i = 0; i < 50; i++) {
            data.addRows([
                [i + 1, result[i][0], result[i][1], result[i][2], result[i][3], result[i][4], result[i][5], result[i][6], result[i][7], result[i][8],
                    result[i][9], result[i][10], result[i][11], result[i][12], result[i][13], result[i][14]]
            ]);
        }

        var options = {
            chart: {
                title: 'График D(n,r), при фиксированном значении n'
            },
            width: 800,
            height: 600
        };

        var chart = new google.charts.Line(document.getElementById('chart5'));

        chart.draw(data, google.charts.Line.convertOptions(options));
    }
}                           //Построение графика D от r
function drawCH6() {
    google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        var data = new google.visualization.DataTable();

        var result = [];

        data.addColumn('number', 'n');
        for (var i = 1; i <= 15; i++) data.addColumn('number', 'r = ' + i);

        for (var i = 1; i <= 50; i++) {
            var mass = [];
            result.push(mass);
        }

        for (var i = 1; i <= 50; i++) {
            N = i;

            for (var j = 1; j <= 15; j++) {
                m = j;

                setArrC();

                result[i - 1].push(D);
            }
        }

        for (var i = 0; i < 50; i++) {
            data.addRows([
                [i + 1, result[i][0], result[i][1], result[i][2], result[i][3], result[i][4], result[i][5], result[i][6], result[i][7], result[i][8],
                    result[i][9], result[i][10], result[i][11], result[i][12], result[i][13], result[i][14]]
            ]);
        }

        var options = {
            chart: {
                title: 'График D(n,r), при фиксированном значении r'
            },
            width: 800,
            height: 600
        };

        var chart = new google.charts.Line(document.getElementById('chart6'));

        chart.draw(data, google.charts.Line.convertOptions(options));
    }
}                           //Построение графика D от n