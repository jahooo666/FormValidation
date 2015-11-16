function isEmpty(element) {
    if (element.value != '') {
        element.style.backgroundColor = "#FFFFFF"
        return false;
    } else {
        //alert("To pole musi być wypełnione!");
        element.style.backgroundColor = "#E52B50";
        element.onkeypress = function () {
            isEmpty(element);
        };
        return true;
    }
}

function checkPasswd(element) {
    var str = element.value;
    if (str.length < 6) {
        alert("haslo jest za krótkie");
        return ("too short");
    } else if (str.length > 50) {
        alert("hasło jest za długie");
        return ("too long");
    } else if (str.search(/\d/) == -1) {
        alert("W haśle powinny być liczby");
        return ("no num");
    } else if (str.search(/[a-zA-Z]/) == -1) {
        alert("W haśle powinny być litery");
        return ("no letter");
    } else if (str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) != -1) {
        alert("Niedozwolony znak");
        return ("bad char");
    }
    alert("Hasło ok!!");
    return ("ok");
}

function setSex(plec) {
    if (plec == "kobieta") {
        woman.setAttribute("checked", "checked");
        man.removeAttribute("checked");
    } else if (plec == "mezczyzna") {
        man.setAttribute("checked", "checked");
        woman.removeAttribute("checked");
    }
}


function isWoman(element) {
    //words[] = element.value.s
    var splited = element.value.split(" ");
    //alert(imie);
    if (splited.length == 2) {
        imie = splited[0];
        if (imie[imie.length - 1] == "a") {
            setSex("kobieta");
        } else {
            setSex("mezczyzna");
        }
    }
}

function isWomanFromPesel(element) {
    var znak = element.value.charAt(element.value.length - 2);
    if (znak % 2 != 0) {
        setSex("mezczyzna");
    } else {
        setSex("kobieta");
    }
}

function setErrorText(element, text) {
    parent = element.parentElement;
    parent.innerHTML
}

function getDateFromPesel(element) {
    var monthNumber = parseInt(element.value.substr(2, 2));
    var year, month, day;
    month = "";
    if ((monthNumber > 12) && (monthNumber < 40)) {
        year = "20" + element.value.substr(0, 2);
        month = monthNumber - 20;
        if (month < 10) {
            month = "0" + month;
        }
        day = element.value.substr(4, 2);
    } else if ((monthNumber > 0) && (monthNumber < 13)) {
        year = "19" + element.value.substr(0, 2);
        month = element.value.substr(2, 2);
        day = element.value.substr(4, 2);
    }

    var fulldate = year + "-" + month + "-" + day;
    birthdate.value = fulldate;
    //alert(year + "-" + month + "-" + day);
    //TODO: zrobić
}

function setPeselFromDate(element) {
    var year = element.value.substr(2, 2);
    var month = element.value.substr(5, 2);
    var day = element.value.substr(8, 2);

    if ((parseInt(element.value.substr(0, 4)) > 1999)) {
        month = parseInt(month) + 20;
    }
    var peselStart = year + month + day;

    var len = pesel.value.length;
    var dif = len - 6;
    var rest = "";
    if (dif > 0) {
        rest = pesel.value.substr(6, dif);
    }
    pesel.value = peselStart + rest;
}

function isComplicated(element) {
    if (element.value.length < 7) {
        //	alert("Za krótkie haslo!");
    }
}

function arePasswdsTheSame(element, element2) {
    if (element.value != element2.value) {
        alert("hasla są różne!");
    }
}

function isLongEnoughtPesel(element) {
    if (element.value.length != 11) {
    }
    //	alert("zla dlugosc peselu");
}

var fullname = document.getElementById('fullname');
var login = document.getElementById('login');
var passwd = document.getElementById('password');
var passwdrp = document.getElementById('password-rep');
var woman = document.getElementById('sex2');
var man = document.getElementById('sex1');
var pesel = document.getElementById('pesel');
var birthdate = document.getElementById('date');
var photo = document.getElementById('photo');
var form = document.getElementById('form');
var sexBox = document.getElementById('sexBox');


fullname.onblur = function () {
    isEmpty(this);
    if (this.value == "Maciej Kłos") {
        var pedal = document.createElement("input");
        pedal.setAttribute("id", "pedal");
        pedal.setAttribute("type", "radio");
        sexBox.appendChild(pedal);
        sex1 = document.getElementsByName('sex1')[0];
        sex2 = document.getElementsByName('sex2')[0];
        sex1.checked = false;
        sex1.disabled = true;
        sex2.disabled = true;
        pedal.setAttribute("checked", "checked");
        //sex1.setAttribute("checked","false");
        var nazwaPedal = document.createElement("p");
        sexBox.innerHTML += "pedal";
        sexBox.appendChild(nazwaPedal);
    }
    isWoman(this);
};

login.onblur = function () {
    isEmpty(this);
};

passwd.onblur = function () {
    isEmpty(this);
    checkPasswd(this);
};

passwdrp.onblur = function () {
    isEmpty(this);
    arePasswdsTheSame(this, passwd);
};

pesel.onblur = function () {
    isEmpty(this);
    isLongEnoughtPesel(this);
    isWomanFromPesel(this);
    getDateFromPesel(this);
};

birthdate.onblur = function () {
    isEmpty(this);
    setPeselFromDate(this);
};

photo.onblur = function () {
    isEmpty(this);
};

sex1.onblur = function () {
    isPeselCorrect();
};

sex2.onblur = function () {
    isPeselCorrect();
};



