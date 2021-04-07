/*firebase start*/
    let config = {
        apiKey: "AIzaSyBgNHmBw53QL51_4J-JP54PyWEF7fR-NUk",
        authDomain: "https://cieebikeservice.firebaseio.com/",
        databaseURL: "https://cieebikeservice.firebaseio.com/",
        storageBucket: "cieebikeservice.appspot.com",
        projectId: "cieebikeservice",
    };
    firebase.initializeApp(config);
    var msgRef = firebase.database();


/*Email start*/
    //config
    (function(){
        emailjs.init("user_bLcS7SbZdTLTMgGDlu4HP");
    })();
    //send
    function sendMail_rent(templateParams) {
        emailjs.send('service_3dk0adg', 'template_ljro6rq', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
                alert('Mailing Error, please try again');
            });
    }
    function sendMail_info(templateParams) {
        emailjs.send('service_3dk0adg', 'template_k6y7q2b', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
                alert('Mailing Error, please try again');
            });
    }



/*methods*/
    // format the Date
    function formatDate() {
        let d = new Date();
        let  month = '' + (d.getMonth() + 1);
        let  day = '' + d.getDate();
        let  year = d.getFullYear();
        let  hour= '' +d.getHours();
        let  minutes = '' +d.getMinutes();
        let  second = '' +d.getSeconds();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        if (hour.length < 2) hour = '0' + hour;
        if (minutes.length < 2) minutes = '0' + minutes;
        if (second.length < 2) second = '0' + second;
        return [year, month, day].join('-')+' '+[hour, minutes, second].join(':');
    }

    //capitalize
    function initCapital(str){
    var strarr = str.split(' ');
    var result = '';
    for(var i in strarr){
        result  = strarr[i].substring(0,1).toUpperCase()+strarr[i].substring(1);
    }
    return result;
}

    //email validation
    function ValidateEmail(email){
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
        return true;
    }
    else return false;
}

    //log out
    function logOutBtn(){
        alert('goodbye');
        msgRef.ref('/userActivity/').push(
            {
                action: 'sign_out',
                time: formatDate(),
                email: emailuser,
            }
        );
        firebase.auth().signOut()
            .then(function() {
                var user = firebase.auth().currentUser;
                console.log(user)
            });
    }

    //auto log out
    function autoLogOut (){
        alert('Timeout! please sign again');
        msgRef.ref('/userActivity/').push(
            {
                action: 'sign_out',
                time: formatDate(),
                email: emailuser,
            }
        )
        firebase.auth().signOut()
            .then(function() {
                var user = firebase.auth().currentUser;
                // console.log(user)
            })
    }
