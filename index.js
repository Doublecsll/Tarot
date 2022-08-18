//api below
function start() {
    callApi()
    firstCheck()
}

//click Card test then show out
function cardTest() {
    var ct = document.getElementById("apiTest");
    if (ct.style.display === "block") {
        ct.style.display = "none";
    } else {
        ct.style.display = "block";
    }
}

//read Json inside
function callApi() {
    var request = new XMLHttpRequest();
    // 2.設定請求方法與路徑
    request.open("get", "http://localhost:10888/tarot/getAllCard");  //網站是api的網址或文檔位置
    console.log()
    // 3.不傳送資料到伺服器，如果是有要跟backend合作才需要
    request.send(null);
    //4.XHR物件獲取到返回資訊後執行,下面這個request.onload必須寫呀還有下面的==200到Json那條，其他格式都差不多用for ll
    request.onload = function () {
        if (request.status == 200) {
            var data = JSON.parse(request.responseText);
            apiData = data;
        }
    }
}

//check card
function checkCard() {
    var request = new XMLHttpRequest();
    var url = "http://localhost:10888/tarot/checkCard"
    // 2.設定請求方法與路徑
    request.open("get", url + "?name=" + document.getElementById('cardName').value);  //網站是api的網址或文檔位置         
    // 3.不傳送資料到伺服器，如果是有要跟backend合作才需要
    request.send(null);
    //4.XHR物件獲取到返回資訊後執行,下面這個request.onload必須寫呀還有下面的==200到Json那條，其他格式都差不多用for ll
    request.onload = function () {
        if (request.status == 200) {
            var data = JSON.parse(request.responseText);
            console.log(data);
        }
    }
}

//add card to api
function addCard() {
    var url = "http://localhost:10888/tarot/createCard";

    var data = {};
    data.name = document.getElementById('cardName').value;      //这里要的是对应你要输入的内容,左边是必须填入的信息（限定前台一定要填写）=右边是从哪里来的资料，所以后面取html里面id的value(值)
    data.suite = document.getElementById('suite').value;
    data.image = document.getElementById('image').value;
    data.description = document.getElementById('description').value;
    data.interpretation = document.getElementById('interpretation').value;
    var json = JSON.stringify(data);

    var addCard = new XMLHttpRequest();
    addCard.open("POST", url, true);
    addCard.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    addCard.onload = function () {
        var card = JSON.parse(addCard.responseText);

        if (addCard.readyState == 4 && addCard.status == "200") {
            console.log(card);
            console.log(data);
            console.log(addCard);
            alert('add successfully');
        } else {
            alert('fail!add again')
        }
    }
    addCard.send(json);
}

//delete card
function delCard() {
    var url = "http://localhost:10888/tarot/deleteCard";
    var delC = new XMLHttpRequest();

    console.log(document.getElementById('cardName').value);

    delC.open("DELETE", url + "?name=" + document.getElementById('cardName').value + "&name=" + document.getElementById('suite').value, true);
    delC.onload = function () {
        var users = JSON.parse(delC.responseText);
        if (delC.readyState == 4 && delC.status == "200") {
            alert("You delete card named" + " " + document.getElementById('cardName').value);
        } else {

        }
    }
    delC.send(null);
}
//api end

var apiData;
//confirm the seletion
function firstCheck() {
    var output = '';
    var desc = "";
    if (document.getElementById("area").value === "") {
        alert("Sorry you have to write down your question then continue!");
    } else {
        document.getElementById('area').style.display = "none";
        document.getElementById('w1').style.display = "none";
        document.getElementById('w2').style.display = "block";
        document.getElementById('w3').style.display = "block";
        for (let i = 0; i <= document.getElementById("spread").value; i++) {
            const randomNum = Math.floor(Math.random() * Object.keys(apiData).length);
            desc += "<h4>&#127775" + apiData[randomNum].name + "&#127775</h4>" + "<h6>" + "Card description:" + "</h6><p>" + apiData[randomNum].description + "</p><br><h6>" + "Interpretation:" + "</h6><p>" + apiData[randomNum].interpretation + "</p>";
            if (i == 0) {
                output += '<div class="row">' +
                    '<div class="col-4"><div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front"><img src="./img/b.PNG" alt="Avatar" style="width:250px;height:300px;"></div><div class="flip-card-back">'
                    + '<img src="' + apiData[randomNum].image + '" alt="' + apiData[randomNum].name + '" style="width:250px;height:300px;"></div></div></div></div>'
            } else
                if (i > 5) {
                    output += '</div>'
                } else {
                    output +=
                        '<div class="col-4"><div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front"><img src="./img/b.PNG" alt="Avatar" style="width:250px;height:300px;"></div><div class="flip-card-back">'
                        + '<img src="' + apiData[randomNum].image + '" alt="' + apiData[randomNum].name + '" style="width:250px;height:300px;"></div></div></div></div>'
                }
        }
        console.log(output)
        document.getElementById("tarotcard").innerHTML = output;
        document.getElementById("card1").innerHTML = desc;
    }
}

//refresh the website
function refresh() {
    window.location.reload("Refresh")
}

















