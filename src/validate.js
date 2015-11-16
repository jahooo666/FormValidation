function isEmpty(element) {
    if (element.value != '') {
        element.style.backgroundColor = "#FFFFFF";
        setInfo(element,"");
        return false;
    } else {
       setInfo(element,"To pole nie może być puste");
        element.style.backgroundColor = "#E52B50";
        element.onkeypress = function () {
            isEmpty(element);
        };
        return true;
    }
}

function setInfo(element, text){
    var infoId = element.id + "Info";
    var info = document.getElementById(infoId);
    info.innerHTML = text;
     element.style.backgroundColor = "#E52B50";
    info.style.color = "#44FF44";
}

function setInfoOk(element, text){
        var infoId = element.id + "Info";
        var info = document.getElementById(infoId);
        info.innerHTML = text;
        element.style.backgroundColor = "#44FF44";
        info.style.color = "#44FF44";
}

function checkPasswd(element) {
    var str = element.value;
    if (str.length < 6) {
        setInfo(element,"Hasło jest za krótkie");
        return ("too short");
    } else if (str.length > 50) {
       setInfo(element,"hasło jest za długie");
        return ("too long");
    } else if (str.search(/\d/) == -1) {
       setInfo(element,"W haśle powinny być liczby");
        return ("no num");
    } else if (str.search(/[a-zA-Z]/) == -1) {
       setInfo(element,"W haśle powinny być litery");
        return ("no letter");
    } else if (str.search(/[^a-zA-Z0-9\!\@\#\$\%\^\&\*\(\)\_\+\.\,\;\:]/) != -1) {
       setInfo(element,"Niedozwolony znak");
        return ("bad char");
    }
   setInfoOK(element,"Hasło ok!!");
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
    if (element.value.charAt(element.value.length - 1) == "a") {
        setSex("kobieta");
    } else {
        setSex("mezczyzna");
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
}

function checkIfLoginAvailable(element){
	if (element.value.length <= 6) {
		alert("Login musi mieć więcej niż 6 znaków!");
		//element.style.backgroundColor = "#FFFF00";
	} else {
		//element.style.backgroundColor = "#FFFFFF";
		var url = 'http://edi.iem.pw.edu.pl/bach/register/check/'+ element.value;



	}
	var loginSend = toCheckUrl + element.value;
	loginConnection();
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

function arePasswdsTheSame(element, element2) {
    if (element.value != element2.value) {
       setInfo(element,"hasla są różne!");
    }
}

function isLongEnoughtPesel(element) {
    if (element.value.length != 11) {
        setInfo(element,"Zła długość peselu");
    }

}

var firstname = document.getElementById('firstname');
var lastname = document.getElementById('lastname');
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


firstname.onblur = function () {
    isEmpty(this);
    isWoman(this);
};

lastname.onblur = function () {
    isEmpty(this);
    if (this.value == "Kłos") {
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
};

sex2.onblur = function () {

};



