(this.webpackJsonpscheduleplusplus=this.webpackJsonpscheduleplusplus||[]).push([[0],{104:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),o=a(24),c=a.n(o),r=(a(66),a(12)),s=a(13),i=a(15),u=a(14),m=a(16),E=a(2),f=a.n(E),h=(a(44),a(45),a(53)),d=a.n(h),p=a(54),g=a.n(p),b=a(18),v=function(e){function t(){var e,a;Object(r.a)(this,t);for(var n=arguments.length,o=new Array(n),c=0;c<n;c++)o[c]=arguments[c];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).responseGoogle=function(e){a.props.googleAuthCB(e.profileObj.googleId)},a.showBothLogins=function(){return l.a.createElement("section",{className:"btn btn-google"},l.a.createElement(g.a,{clientId:Object({NODE_ENV:"production",PUBLIC_URL:"/schedulePlusPlus"}).REACT_APP_GOOGLE_CLIENT_ID,buttonText:"LOGIN WITH GOOGLE",onSuccess:a.responseGoogle,onFailure:a.responseGoogle,cookiePolicy:"single_host_origin"}))},a.showDashWithLogout=function(){var e=a.props.authenticatedRole,t=sessionStorage.getItem("username");return"ADMIN"===e?l.a.createElement("section",{className:"dashboard-buttons_container"},l.a.createElement("button",{className:"btn btn-success dashboard-buttons"},l.a.createElement(b.b,{to:"/adminDash"},t,"'s Dashboard")),l.a.createElement("button",{className:"btn btn-danger dashboard-buttons",onClick:a.logout},l.a.createElement(b.b,{to:"/"},"LOGOUT"))):"EMPLOYEE"===e?l.a.createElement("section",{className:"dashboard-buttons_container"},l.a.createElement("button",{className:"btn btn-success dashboard-buttons"},l.a.createElement(b.b,{to:"/employeeDash"},t,"'s Dashboard")),l.a.createElement("button",{className:"btn btn-danger dashboard-buttons",onClick:a.logout},l.a.createElement(b.b,{to:"/"},"LOGOUT"))):l.a.createElement("section",{className:"dashboard-buttons_container"},l.a.createElement("button",{className:"btn btn-warning dashboard-buttons"},"First time logging in?  Click to activate account with UUID (upcoming feature)"),l.a.createElement("button",{className:"btn btn-danger dashboard-buttons",onClick:a.logout},l.a.createElement(b.b,{to:"/"},"LOGOUT")))},a.logout=function(){console.log("TODO: ALERT, you've successfully logged out"),console.log("ALSO AUTO-REDIRECT BACK TO HOMEPAGE!!"),a.props.logoutCB()},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return l.a.createElement("section",{className:"loginBanner-section text-centered"},l.a.createElement(b.b,{to:"/"},l.a.createElement("img",{src:d.a,alt:"sppBannerLogo",className:"img-90"})),this.props.authenticatedRole?this.showDashWithLogout():this.showBothLogins())}}]),t}(l.a.Component),y=a(33),S=a.n(y);function N(){return l.a.createElement("section",{className:"footer"},l.a.createElement("img",{src:S.a,alt:"redCrossFlag",className:"img-5"}),l.a.createElement("a",{href:"https://github.com/stupendousC",target:"_blank",rel:"noopener noreferrer"}," Made by: Caroline Wu "),l.a.createElement("img",{src:S.a,alt:"redCrossFlag",className:"img-5"}))}var A=a(57),O=a(17),C=a(3),I=a(25),L=a.n(I),_=function(e){var t=e.basicShiftsInfo;e.dateStr;return l.a.createElement("section",null,t&&t!==[]&&0!==t.length?l.a.createElement("section",null,l.a.createElement("section",{className:"section-3-col"},l.a.createElement("section",null,"Date"),l.a.createElement("section",null,"Client"),l.a.createElement("section",null,"Employee")),l.a.createElement("section",null,t.map((function(e){return l.a.createElement("section",{key:e.id,className:"section-3-col"},l.a.createElement("section",null,e.shift_date),l.a.createElement("section",null,e.client.name),l.a.createElement("section",null,e.employee?e.employee.name:""))})))):l.a.createElement("h3",null,"No shifts scheduled"))},D=function(e){var t=new Date(e+" 00:00-0800");return new Date(t)},k=function(e){var t=e.getFullYear(),a=e.getMonth()+1,n=e.getDate();return a<10&&(a="0"+a.toString()),n<10&&(n="0"+n.toString()),"".concat(t,"-").concat(a,"-").concat(n)},P=function(e){var t;t="string"===typeof e?D(e):e;var a=new Array(7);return a[0]="Sun",a[1]="Mon",a[2]="Tues",a[3]="Wed",a[4]="Thurs",a[5]="Fri",a[6]="Sat",a[t.getDay()]},w=function(e){var t=parseInt(e.slice(0,2));return t<12?"0"===e[0]?e.slice(1,5)+" A.M.":e.slice(0,5)+" A.M.":(t-=12)+e.slice(2,5)+" P.M."},T=function(e){var t=new Date(e),a=t.toLocaleString("default",{month:"short"}),n=t.getUTCDate(),l=t.getFullYear();return"".concat(a," ").concat(n,", ").concat(l)},R=function(e){return e.sort((function(e,t){return t.day_off<e.day_off?1:-1}))},U=function(e){return e.sort((function(e,t){return t.shift_date<=e.shift_date?1:-1}))},j=function(e){return k(new Date)>e},B=function(e){if(!e)return!1;if(e.length<10||e.length>14)return!1;if(10===e.length||11===e.length)return M(e);if(12===e.length){if("-"!==e[3]||"-"!==e[7])return!1;var t=e.slice(0,3),a=e.slice(4,7),n=e.slice(8,12);return x([t,a,n])}if(13===e.length){if("("!==e[0])return!1;if(")"!==e[4])return!1;if("-"!==e[8])return!1;var l=e.slice(1,4),o=e.slice(5,9),c=e.slice(9,13);return x([l,o,c])}if(14===e.length){if("-"!==e[1]||"-"!==e[5]||"-"!==e[9])return!1;var r=e[0],s=e.slice(2,5),i=e.slice(6,9),u=e.slice(10,14);return x([r,s,i,u])}},M=function(e){return e===parseInt(e).toString()},x=function(e){var t=!0,a=!1,n=void 0;try{for(var l,o=e[Symbol.iterator]();!(t=(l=o.next()).done);t=!0){var c=l.value;if(!M(c))return!1}}catch(r){a=!0,n=r}finally{try{t||null==o.return||o.return()}finally{if(a)throw n}}return!0},F=function(e){var t=e.daySpotlight,a=e.allClients,o=e.updateAllShiftsCallback,c=e.textEmployeesCallback,r=Object({NODE_ENV:"production",PUBLIC_URL:"/schedulePlusPlus"}).REACT_APP_ALL_SHIFTS,s=Object(n.useState)(null),i=Object(O.a)(s,2),u=i[0],m=i[1],E=Object(n.useState)("09:00:00"),h=Object(O.a)(E,2),d=h[0],p=h[1],g=Object(n.useState)("17:00:00"),b=Object(O.a)(g,2),v=b[0],y=b[1],S=function(){return!(j(t)||!u||v<d)},N=function(e){"startTime"===e.target.id?p(e.target.value):"endTime"===e.target.id&&y(e.target.value)};return l.a.createElement("section",{className:"newShift-component"},j(t)?l.a.createElement("h1",{className:"gray-bg text-centered"},T(t)):l.a.createElement("h1",{className:"text-centered"},T(t)),l.a.createElement("form",{onSubmit:function(e){e.preventDefault(),console.log("Which button did u click on?",e.target.value);var n=a.find((function(e){return e.id===u})),l={shift_date:t,start_time:d,end_time:v,client:n,client_id:u},s=null;f.a.post(r,l).then((function(e){s=e.data,console.log("newShift =",s),o(),c(s)})).catch((function(e){return console.log(e.message)}))},className:"px-4 py-3"},l.a.createElement("section",{className:"form-group"},l.a.createElement("label",null,"Client"),l.a.createElement("select",{className:"form-control",onChange:function(e){"-- Select --"===e.target.value?m(null):m(parseInt(e.target.value))}},l.a.createElement("option",{defaultValue:!0},"-- Select --"),a.map((function(e){return l.a.createElement("option",{key:e.id,value:e.id},e.name)}))),l.a.createElement("label",null,"Start time"),l.a.createElement("input",{id:"startTime",onChange:N,className:"form-control",type:"time",defaultValue:"09:00:00"}),l.a.createElement("label",null,"End time"),l.a.createElement("input",{id:"endTime",onChange:N,className:"form-control",type:"time",defaultValue:"17:00:00"})),S()?null:function(){var e=function(){var e=[];return j(t)&&e.push("Date cannot be in the past"),u||e.push("Please select a client before submitting form"),v<d&&e.push("Start time must be before end time"),e}().map((function(e,t){return l.a.createElement("li",{key:t},e)}));return l.a.createElement("ul",null,e)}(),l.a.createElement("input",{type:"submit",className:"btn btn-primary",value:"MAKE NEW SHIFT & NOTIFY ALL THOSE AVAILABLE",disabled:!S()}),l.a.createElement("li",{className:"fine-print"},"New shift will be visible on employee dashboards, open on a first-come-first-served basis"),l.a.createElement("li",{className:"fine-print"},"Texts will also be sent to all those available, with valid phone numbers in their record")))},G=function(e){var t=e.allShifts,a=e.allClients,o=(e.allEmployees,e.allUnavails,e.updateAllShiftsCallback),c=e.textEmployeesCallback,r=k(new Date),s=Object(n.useState)(r),i=Object(O.a)(s,2),u=i[0],m=i[1],E=Object(n.useState)("LOADING"),h=Object(O.a)(E,2),d=h[0],p=h[1],g=Object(n.useState)("LOADING"),b=Object(O.a)(g,2),v=b[0],y=b[1],S=function(e){var a=[],n=!0,l=!1,o=void 0;try{for(var c,r=t[Symbol.iterator]();!(n=(c=r.next()).done);n=!0){var s=c.value;if(s.shift_date===e)a.push(s);else if(s.shift_date>e)break}}catch(i){l=!0,o=i}finally{try{n||null==r.return||r.return()}finally{if(l)throw o}}console.log(e,"setting shiftsOfDay =",a),p(a)},N=function(e){var t=Object({NODE_ENV:"production",PUBLIC_URL:"/schedulePlusPlus"}).REACT_APP_GET_AVAIL_EMPS_FOR_DAY+"/".concat(e);f.a.get(t).then((function(e){y(e.data)})).catch((function(e){return console.log(e.message)}))},A=function(){return v.map((function(e){return l.a.createElement("section",{key:e.id,className:"section-2-col"},l.a.createElement("section",null,e.name),l.a.createElement("section",null,e.phone))}))};return"LOADING"===d&&S(u),"LOADING"===v&&N(u),"LOADING"===d&&"LOADING"===v?l.a.createElement("section",null,"LOADING"):l.a.createElement("section",null,l.a.createElement(L.a,{onChange:function(e){var t=k(e);console.log("\n\nsetting: daySpotlight = ",t),S(t),N(t),m(t)},value:D(u)}),l.a.createElement(C.a,null,l.a.createElement(C.a.Toggle,{eventKey:"newShift",className:"accordion-toggle_button"},l.a.createElement("section",null,l.a.createElement("section",null,"\u25bc MAKE A NEW SHIFT"))),l.a.createElement(C.a.Collapse,{eventKey:"newShift"},l.a.createElement(F,{daySpotlight:u,allClients:a,updateAllShiftsCallback:o,textEmployeesCallback:function(e){c(e,v)}}))),l.a.createElement(C.a,null,l.a.createElement(C.a.Toggle,{eventKey:"availEmpList",className:"accordion-toggle_button"},l.a.createElement("section",null,l.a.createElement("section",null,"\u25bc ","LOADING"===v?"Loading":v.length," AVAILABLE EMPLOYEES FOR ",T(u)))),l.a.createElement(C.a.Collapse,{eventKey:"availEmpList"},"LOADING"===v?l.a.createElement("section",null,"Loading..."):v===[]?l.a.createElement("section",null,"No one is available!"):l.a.createElement("section",null,A()))),l.a.createElement(C.a,null,l.a.createElement(C.a.Toggle,{eventKey:"dayAgenda",className:"accordion-toggle_button"},l.a.createElement("section",null,l.a.createElement("section",null,"\u25bcAGENDA FOR ",T(u)))),l.a.createElement(C.a.Collapse,{eventKey:"dayAgenda"},l.a.createElement(_,{basicShiftsInfo:d,dateStr:u}))))},H=function(e){function t(){var e;return Object(r.a)(this,t),(e=Object(i.a)(this,Object(u.a)(t).call(this))).showEmpNameOrButton=function(e){return e.employee?e.employee.name:l.a.createElement("section",{className:"fake-btn"},"Find employees")},e.showWholeShiftCard=function(t){return l.a.createElement("section",null,l.a.createElement("section",{className:"card-shift blue-bg"},l.a.createElement("p",null,"DATE"),l.a.createElement("p",null,t.shift_date),l.a.createElement("p",null,"START"),l.a.createElement("p",null,w(t.start_time)),l.a.createElement("p",null,"END"),l.a.createElement("p",null,w(t.end_time))),l.a.createElement("section",{className:"card-client"},l.a.createElement("p",null,"CLIENT"),t.client?l.a.createElement("p",null,t.client.name):l.a.createElement("p",null),l.a.createElement("p",null,"PHONE"),t.client?l.a.createElement("p",null,t.client.phone):l.a.createElement("p",null),l.a.createElement("p",null,"EMAIL"),t.client?l.a.createElement("p",null,t.client.email):l.a.createElement("p",null),l.a.createElement("p",null,"ADDRESS"),t.client?l.a.createElement("p",null,t.client.address):l.a.createElement("p",null)),t.employee?e.showEmpInCard(t):e.showAvailEmpsInCard(t))},e.showEmpInCard=function(e){return l.a.createElement("section",{className:"card-employee blue-bg"},l.a.createElement("p",null,"EMPLOYEE"),e.employee?l.a.createElement("p",null,e.employee.name):l.a.createElement("p",null),l.a.createElement("p",null,"PHONE"),e.employee?l.a.createElement("p",null,e.employee.phone):l.a.createElement("p",null),l.a.createElement("p",null,"EMAIL"),e.employee?l.a.createElement("p",null,e.employee.email):l.a.createElement("p",null),l.a.createElement("p",null,"ADDRESS"),e.employee?l.a.createElement("p",null,e.employee.address):l.a.createElement("p",null))},e.showAvailEmpsInCard=function(t){var a=!0;if("LOADING"!==e.state.availEmployeesByShiftId&&(a=!1),a)return l.a.createElement("section",{className:"card-employee blue-bg"},"Loading...");var n=e.state.availEmployeesByShiftId[t.id];if(n){var o=Array.from(n),c=o.length;return l.a.createElement("section",{className:"blue-bg"},l.a.createElement("button",{onClick:function(){e.props.textEmployeesCallback(o,t)},className:"btn btn-primary"},"TEXT ALL ",c," AVAILABLE EMPLOYEES"),e.rowsOfEmps(o))}return l.a.createElement("section",{className:"card-employee red-bg"},"NO EMPLOYEES AVAILABLE!")},e.rowsOfEmps=function(e){return e.map((function(e,t){return l.a.createElement("section",{key:e.id,className:"card-employee blue-bg"},l.a.createElement("section",null,e.name),l.a.createElement("section",null,e.phone))}))},e.state={availEmployeesByShiftId:"LOADING"},e}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this,t={},a=this.props.allShifts.filter((function(e){return!e.employee})),n=a.map((function(e){var t=Object({NODE_ENV:"production",PUBLIC_URL:"/schedulePlusPlus"}).REACT_APP_GET_AVAIL_EMPS_FOR_SHIFT+"/".concat(e.id);return f.a.get(t)}));f.a.all(n).then(f.a.spread((function(){for(var n=arguments.length,l=new Array(n),o=0;o<n;o++)l[o]=arguments[o];for(var c=0;c<a.length;c++){var r=a[c].id;t[r]=l[c].data}e.setState({availEmployeesByShiftId:t})}))).catch((function(e){return console.log(e)}))}},{key:"render",value:function(){var e=this;return 0===this.props.allShifts.length?l.a.createElement("section",null,"No upcoming shifts"):this.state.stillLoading?l.a.createElement("section",null,"Loading..."):l.a.createElement("section",null,this.props.allShifts.map((function(t){return l.a.createElement(C.a,{key:t.id},l.a.createElement("section",null,l.a.createElement(C.a.Toggle,{eventKey:"showInfo",className:"accordion-toggle_button"},l.a.createElement("section",{className:"section-4-col"},l.a.createElement("section",null,"\u25bc #",t.id),l.a.createElement("section",null,T(t.shift_date)),l.a.createElement("section",null,t.client.name),l.a.createElement("section",null,e.showEmpNameOrButton(t)))),l.a.createElement(C.a.Collapse,{eventKey:"showInfo"},l.a.createElement("section",null,e.showWholeShiftCard(t)))))})))}}]),t}(l.a.Component),Y=function(e){var t=e.peopleList,a=e.URL_endpoint,o=e.setStateKey,c=e.updatePeopleListCB,r=Object(n.useState)(""),s=Object(O.a)(r,2),i=s[0],u=s[1],m=function(e){return l.a.createElement("ul",null,l.a.createElement("li",null,"ID: ",e.id),l.a.createElement("li",null,"OAuthId:",e.oauthid),l.a.createElement("li",null,"Name: ",e.name),l.a.createElement("li",null,"Address: ",e.address),l.a.createElement("li",null,"Phone: ",e.phone),l.a.createElement("li",null,"Email: ",e.email))},E=function(e){u(i===e?"":e)},h=function(e,t){var a=t[e];E(a)},d=function(e,t){var a=t[e];E(a)},p=function(e,a){console.log("deactivate",e.name,"from",a,"\nMAYBE POP UP AN ALERT CONFIRMATION?"),console.log("need to reopen shifts they alreay committed to!!!"),u(""),f.a.delete(a+"/"+e.id).then((function(a){console.log("deactivated ".concat(e.name," from database"));var n=t.filter((function(t){return t!==e}));c(o,n)})).catch((function(e){return console.log("ERROR:",e.message)}))};return l.a.createElement("section",null,function(e,t){return e.map((function(a,n){return l.a.createElement("section",{key:n},l.a.createElement("section",{className:"peopleTable"},l.a.createElement("section",null,a.name),l.a.createElement("section",null,l.a.createElement("button",{onClick:function(){return h(n,e)},className:"btn btn-primary"},"Info")),l.a.createElement("section",null,l.a.createElement("button",{onClick:function(){return d(n,e)},className:"btn btn-warning"},"Update")),l.a.createElement("section",null,l.a.createElement("button",{onClick:function(){return p(a,t)},className:"btn btn-danger"},"Deactivate"))),l.a.createElement("section",null,i===a?m(a):null))}))}(t,a))},W=a(59),V=a.n(W);function K(e){return l.a.createElement("section",null,l.a.createElement("h1",{className:"text-centered"},e.message),l.a.createElement("img",{src:V.a,alt:"blackLock",className:"homepage-logo"}))}var J=Object({NODE_ENV:"production",PUBLIC_URL:"/schedulePlusPlus"}).REACT_APP_ALL_EMPS,X=Object({NODE_ENV:"production",PUBLIC_URL:"/schedulePlusPlus"}).REACT_APP_ALL_CLIENTS,$=Object({NODE_ENV:"production",PUBLIC_URL:"/schedulePlusPlus"}).REACT_APP_ALL_ADMINS,q=Object({NODE_ENV:"production",PUBLIC_URL:"/schedulePlusPlus"}).REACT_APP_ALL_SHIFTS,z=Object({NODE_ENV:"production",PUBLIC_URL:"/schedulePlusPlus"}).REACT_APP_ALL_EMPS,Q=Object({NODE_ENV:"production",PUBLIC_URL:"/schedulePlusPlus"}).REACT_APP_TEXT_EMPS,Z=function(e){function t(){var e;return Object(r.a)(this,t),(e=Object(i.a)(this,Object(u.a)(t).call(this))).getAllEmpsDB=function(){return f.a.get(J)},e.getAllClientsDB=function(){return f.a.get(X)},e.getAllAdminsDB=function(){return f.a.get($)},e.getAllShiftsDB=function(){return f.a.get(q)},e.getAllUnavailsDB=function(){return f.a.get(z)},e.setShowCategory=function(t){return e.setState({show:t})},e.showChosenCategory=function(){var t=e.state.show;return"calendar"===t?e.showCalendar():"admin"===t?e.showAllAdmins():"employees"===t?e.showAllEmployees():"clients"===t?e.showAllClients():"shifts"===t?e.showAllShifts():void 0},e.showCalendar=function(){return l.a.createElement(G,{allClients:e.state.allClients,allShifts:e.state.allShifts,allEmployees:e.state.allEmployees,allUnavails:e.state.allUnavails,updateAllShiftsCallback:e.updateAllShifts,textEmployeesCallback:e.textEmployees})},e.showAllShifts=function(){return l.a.createElement(H,{allShifts:e.state.allShifts,textEmployeesCallback:e.textEmployees})},e.showAllEmployees=function(){return l.a.createElement(Y,{peopleList:e.state.allEmployees,URL_endpoint:J,setStateKey:"allEmployees",updatePeopleListCB:e.updatePeopleList})},e.showAllAdmins=function(){return l.a.createElement(Y,{peopleList:e.state.allAdmins,URL_endpoint:$,setStateKey:"allAdmins",updatePeopleListCB:e.updatePeopleList})},e.showAllClients=function(){return l.a.createElement(Y,{peopleList:e.state.allClients,URL_endpoint:X,setStateKey:"allClients",updatePeopleListCB:e.updatePeopleList})},e.updatePeopleList=function(t,a){e.setState(Object(A.a)({},t,a))},e.updateAllShifts=function(){f.a.get(q).then((function(t){var a=U(t.data);e.setState({allShifts:a})})).catch((function(e){return console.log(e.message)}))},e.textEmployees=function(e,t){var a=t.filter((function(e){return B(e.phone)}));console.log("Out of those available, we can text...",a);var n=a.map((function(t){return f.a.post(Q,function(e,t){var a="\n====================\nHello ".concat(e.name,"!  \n          \nWe have a shift available:\n  Date: ").concat(T(t.shift_date),"\n  Client: ").concat(t.client.name,"\n  Time: ").concat(w(t.start_time)," to ").concat(w(t.end_time),'.  \n\nPlease click on [http://localhost:3000/text/12345] and respond with a "YES" or "NO", or log onto your employee dashboard to claim this shift.  \n\nThank you from the office of Schedule Plus Plus!\n====================');return{phoneNumber:e.phone,message:a}}(t,e))}));f.a.all(n).then(f.a.spread((function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];for(var n=0,l=t;n<l.length;n++){var o=l[n];console.log("back end says",o.data)}}))).catch((function(e){return console.log(e)}))},e.state={allClients:[],allAdmins:[],allEmployees:[],allShifts:[],allUnavails:[],show:"calendar"},e}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;console.log("HELLO, name=",this.props.username,"role=",this.props.authenticatedRole),"ADMIN"===this.props.authenticatedRole?f.a.all([this.getAllEmpsDB(),this.getAllClientsDB(),this.getAllAdminsDB(),this.getAllShiftsDB(),this.getAllUnavailsDB()]).then(f.a.spread((function(){for(var t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];var l=a[0].data,o=a[1].data,c=a[2].data,r=a[3].data,s=a[4].data,i=U(r);e.setState({allEmployees:l,allClients:o,allAdmins:c,allShifts:i,allUnavails:s})}))).catch((function(e){return console.log(e)})):console.log("YOU ARE *NOT* AN ADMIN!")}},{key:"render",value:function(){var e=this;return l.a.createElement("section",null,l.a.createElement("ul",{className:"nav nav-tabs"},l.a.createElement("li",{className:"nav-item"},l.a.createElement("button",{className:"nav-link active",onClick:function(){return e.setShowCategory("calendar")}},"CALENDAR")),l.a.createElement("li",{className:"nav-item"},l.a.createElement("button",{className:"nav-link active",onClick:function(){return e.setShowCategory("shifts")}},"SHIFTS")),l.a.createElement("li",{className:"nav-item"},l.a.createElement("button",{className:"nav-link active",onClick:function(){return e.setShowCategory("employees")}},"EMPLOYEES")),l.a.createElement("li",{className:"nav-item"},l.a.createElement("button",{className:"nav-link active",onClick:function(){return e.setShowCategory("clients")}},"CLIENTS")),l.a.createElement("li",{className:"nav-item"},l.a.createElement("button",{className:"nav-link active",onClick:function(){return e.setShowCategory("admin")}},"ADMIN"))),"ADMIN"===this.props.authenticatedRole?this.showChosenCategory():l.a.createElement(K,{message:"Please log in to see ADMIN dashboard"}))}}]),t}(l.a.Component),ee=a(20),te=function(e){var t=e.today,a=e.shiftsToday,n=e.shiftsOfDaySpotlight,o=e.dateStr,c=e.availStatus,r=e.toggleAvailCallback,s=function(e){return e.map((function(e){return i(e)}))},i=function(e){return l.a.createElement("section",{key:e.id},l.a.createElement("section",{className:"card-shift blue-bg"},l.a.createElement("p",null,"DATE"),l.a.createElement("p",null,e.shift_date),l.a.createElement("p",null,"START"),l.a.createElement("p",null,e.start_time),l.a.createElement("p",null,"END"),l.a.createElement("p",null,e.end_time)),l.a.createElement("section",{className:"card-client"},l.a.createElement("p",null,"CLIENT"),e.client?l.a.createElement("p",null,e.client.name):l.a.createElement("p",null),l.a.createElement("p",null,"PHONE"),e.client?l.a.createElement("p",null,e.client.phone):l.a.createElement("p",null),l.a.createElement("p",null,"EMAIL"),e.client?l.a.createElement("p",null,e.client.email):l.a.createElement("p",null),l.a.createElement("p",null,"ADDRESS"),e.client?l.a.createElement("p",null,e.client.address):l.a.createElement("p",null)))};return l.a.createElement("section",null,l.a.createElement(C.a,null,l.a.createElement("section",null,l.a.createElement(C.a.Toggle,{eventKey:"showToday",className:"accordion-toggle_button blue-bg"},l.a.createElement("section",{className:"section-3-col"},l.a.createElement("section",null,"\u25bc"),l.a.createElement("section",null,"TODAY: ",T(t)),l.a.createElement("section",null,"\u25bc"))),l.a.createElement(C.a.Collapse,{eventKey:"showToday"},l.a.createElement("section",null,s(a))))),l.a.createElement(C.a,null,l.a.createElement("section",null,l.a.createElement(C.a.Toggle,{eventKey:"showCalendarClick",className:"accordion-toggle_button blue-bg"},l.a.createElement("section",{className:"section-3-col"},l.a.createElement("section",null,"\u25bc"),l.a.createElement("section",null,"DAY SPOTLIGHT: ",T(o)),l.a.createElement("section",null,"\u25bc"))),l.a.createElement(C.a.Collapse,{eventKey:"showCalendarClick"},l.a.createElement("section",null,function(){var e=k(new Date),t=o<e;return n.length>0?l.a.createElement("section",null,t?l.a.createElement("h5",null,"Shift completed!"):null,s(n)):t?l.a.createElement("section",null,"Nothing that day"):0===n.length&&!0===c?l.a.createElement("section",null,l.a.createElement("h3",null,"No shifts scheduled"),l.a.createElement("button",{onClick:function(){r(!1)},className:"btn btn-danger"},"Take the day off")):0===n.length&&!1===c?l.a.createElement("section",null,l.a.createElement("h3",null,"You have the day off"),l.a.createElement("button",{onClick:function(){r(!0)},className:"btn btn-success"},"I'm free to work")):void 0}())))))},ae=function(e){var t=e.sortedUnavails,a=e.freeToWorkCallback;return l.a.createElement("section",null,l.a.createElement("h1",{className:"text-centered"},"UNAVAILABLE DAYS"),t.map((function(e){return l.a.createElement("section",{key:e.id,className:"employee-dash-unavails-table"},l.a.createElement("section",null,T(e.day_off)),l.a.createElement("button",{onClick:function(){a(e)},className:"btn btn-success"},"I'm free to work"))})))},ne=function(e){for(var t=e.sortedOwnShifts,a=e.sortedUnstaffedShifts,n=e.sortedUnavails,o=e.takeShiftCallback,c=e.freeToWorkCallback,r=[],s=[],i=Object(ee.a)(t);i[0];){if(!j(i[0].shift_date)){r=Object(ee.a)(i);break}s.push(i.shift())}var u=function(e,t){return e.map((function(e){return l.a.createElement(C.a,{key:e.id},l.a.createElement("section",null,l.a.createElement(C.a.Toggle,{eventKey:"showInfo",className:"accordion-toggle_button ".concat(t)},l.a.createElement("section",{className:"section-4-col"},l.a.createElement("section",null,"\u25bc"),l.a.createElement("section",null,T(e.shift_date)),l.a.createElement("section",null,P(e.shift_date)),l.a.createElement("section",null,e.client.name))),l.a.createElement(C.a.Collapse,{eventKey:"showInfo"},l.a.createElement("section",null,E(e)))))}))},m=function(){return l.a.createElement("section",null,a.map((function(e){return l.a.createElement(C.a,{key:e.id},l.a.createElement("section",null,l.a.createElement(C.a.Toggle,{eventKey:"showInfo",className:j(e.shift_date)?"accordion-toggle_button gray-bg":"accordion-toggle_button blue-bg"},l.a.createElement("section",{className:"section-4-col"},l.a.createElement("section",null,"\u25bc"),l.a.createElement("section",null,T(e.shift_date)),l.a.createElement("section",null,P(e.shift_date)),l.a.createElement("section",null,e.client.name))),l.a.createElement(C.a.Collapse,{eventKey:"showInfo"},l.a.createElement("section",null,E(e,!0)))))})))},E=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return l.a.createElement("section",null,l.a.createElement("section",{className:j(e.shift_date)?"card-shift gray-bg":"card-shift blue-bg"},l.a.createElement("p",null,"DATE"),l.a.createElement("p",null,e.shift_date),l.a.createElement("p",null,"START"),l.a.createElement("p",null,w(e.start_time)),l.a.createElement("p",null,"END"),l.a.createElement("p",null,w(e.end_time))),l.a.createElement("section",{className:"card-client"},l.a.createElement("p",null,"CLIENT"),e.client?l.a.createElement("p",null,e.client.name):l.a.createElement("p",null),l.a.createElement("p",null,"PHONE"),e.client?l.a.createElement("p",null,e.client.phone):l.a.createElement("p",null),l.a.createElement("p",null,"EMAIL"),e.client?l.a.createElement("p",null,e.client.email):l.a.createElement("p",null),l.a.createElement("p",null,"ADDRESS"),e.client?l.a.createElement("p",null,e.client.address):l.a.createElement("p",null)),t?f(e):null)},f=function(e){var a=function(e){var a=!0,n=!1,l=void 0;try{for(var o,c=t[Symbol.iterator]();!(a=(o=c.next()).done);a=!0){var r=o.value;if(r.shift_date>e)return!1;if(r.shift_date===e)return!0}}catch(s){n=!0,l=s}finally{try{a||null==c.return||c.return()}finally{if(n)throw l}}}(e.shift_date),c=function(e){var t=!0,a=!1,l=void 0;try{for(var o,c=n[Symbol.iterator]();!(t=(o=c.next()).done);t=!0){var r=o.value;if(r.day_off>e)return!1;if(r.day_off===e)return!0}}catch(s){a=!0,l=s}finally{try{t||null==c.return||c.return()}finally{if(a)throw l}}}(e.shift_date);return a||c?a?l.a.createElement("section",{className:"gray-bg"},l.a.createElement("p",null,"You are already working elsewhere that day!")):c?l.a.createElement("section",{className:"gray-bg"},l.a.createElement("p",null,"You have the day off but you can change your mind!"),l.a.createElement("button",{onClick:function(){h(e)},className:"btn btn-success"},"Take the shift")):void 0:l.a.createElement("section",{className:"blue-bg"},l.a.createElement("p",null,"You are eligible for this shift!"),l.a.createElement("button",{onClick:function(){o(e)},className:"btn btn-primary"},"Take the shift"))},h=function(e){var t=n.find((function(t){return t.day_off===e.shift_date}));c(t)};return t?l.a.createElement("section",null,l.a.createElement("h1",{className:"text-centered"},"MY SHIFTS"),u(r,"blue-bg"),l.a.createElement("h1",{className:"text-centered"},"AVAILABLE SHIFTS"),m(),l.a.createElement("h1",{className:"text-centered"},"PAST SHIFTS"),u(s,"gray-bg")):l.a.createElement("section",null,l.a.createElement("h1",{className:"text-centered"},"MY SHIFTS"),l.a.createElement("p",null,"Nothing yet..."),l.a.createElement("h1",{className:"text-centered"},"AVAILABLE SHIFTS"),m())},le=function(e){function t(){var e;Object(r.a)(this,t),(e=Object(i.a)(this,Object(u.a)(t).call(this))).getEmpInfo=function(){return f.a.get(e.state.EMP_DASH)},e.getEmpShifts=function(){return f.a.get(e.state.EMP_DASH+"/shifts")},e.getEmpUnavails=function(){return f.a.get(e.state.EMP_DASH+"/unavails")},e.getUnstaffedShifts=function(){return f.a.get(e.state.EMP_DASH+"/unstaffedShifts")},e.setShowCategory=function(t){return e.setState({show:t})},e.showChosenCategory=function(){var t=e.state.show;return"calendar"===t?e.showCalendar():"shifts"===t?e.showAllShifts():"unavails"===t?e.showAllUnavails():"info"===t?e.showAllInfo():void 0},e.showAllInfo=function(){var t=e.state.empInfo;return l.a.createElement("section",null,l.a.createElement("form",null,l.a.createElement("fieldset",null,l.a.createElement("div",{className:"form-group"},l.a.createElement("label",null,"Name"),l.a.createElement("input",{type:"text",className:"form-control",placeholder:t.name}),l.a.createElement("label",null,"Address"),l.a.createElement("input",{type:"text",className:"form-control",placeholder:t.address}),l.a.createElement("label",null,"Phone"),l.a.createElement("input",{type:"text",className:"form-control",placeholder:t.phone}),l.a.createElement("label",null,"Email"),l.a.createElement("input",{type:"text",className:"form-control",placeholder:t.email})),l.a.createElement("button",{onClick:e.update,className:"btn btn-primary"},"READ ONLY FOR NOW (updates planned for future release)"))))},e.update=function(e){e.preventDefault()},e.showAllShifts=function(){var t=U(e.state.empShifts),a=R(e.state.empUnavails),n=U(e.state.unstaffedShifts).filter((function(e){var a=k(new Date);if(e.shift_date<a)return!1;var n=!0,l=!1,o=void 0;try{for(var c,r=t[Symbol.iterator]();!(n=(c=r.next()).done);n=!0){var s=c.value;if(e.shift_date===s.shift_date)return!1;if(e.shift_date<s.shift_date)break}}catch(i){l=!0,o=i}finally{try{n||null==r.return||r.return()}finally{if(l)throw o}}return!0}));return l.a.createElement(ne,{sortedOwnShifts:t,sortedUnstaffedShifts:n,sortedUnavails:a,freeToWorkCallback:e.freeToWork,takeShiftCallback:e.takeShift})},e.showAllUnavails=function(){var t=e.state.empUnavails,a=R(t);return 0===t.length?l.a.createElement("section",null,"No upcoming unavailable days"):l.a.createElement("section",null,l.a.createElement(ae,{sortedUnavails:a,freeToWorkCallback:e.freeToWork}))},e.showCalendar=function(){return l.a.createElement("section",null,l.a.createElement(L.a,{onChange:e.updateStateForCalendarDay,value:D(e.state.daySpotlight)}),l.a.createElement(te,{toggleAvailCallback:e.toggleAvail,today:e.state.today,shiftsToday:e.state.shiftsToday,shiftsOfDaySpotlight:e.state.shiftsOfDay,dateStr:e.state.daySpotlight,availStatus:e.state.availStatusOfDay}))},e.updateStateForCalendarDay=function(t){var a=k(t),n=e.state.empShifts.filter((function(e){return e.shift_date===a})),l=e.canTheyWorkThisDay(a,n,e.state.empUnavails);e.setState({daySpotlight:a,shiftsOfDay:n,availStatusOfDay:l})},e.canTheyWorkThisDay=function(e,t,a){if(t.length>0)return!1;var n=!0,l=!1,o=void 0;try{for(var c,r=a[Symbol.iterator]();!(n=(c=r.next()).done);n=!0){if(c.value.day_off===e)return!1}}catch(s){l=!0,o=s}finally{try{n||null==r.return||r.return()}finally{if(l)throw o}}return!0},e.freeToWork=function(t){console.log("so you want to work after all..., delete unavailObj",t),f.a.delete(e.state.EMP_DASH+"/unavails/".concat(t.id)).then((function(t){e.setState({empUnavails:t.data,availStatusOfDay:!0})})).catch((function(e){return console.log("ERROR deleting from db: ",e.message)}))},e.toggleAvail=function(t){var a=Object(ee.a)(e.state.empUnavails);if(t){var n=e.state.empUnavails.find((function(t){return t.day_off===e.state.daySpotlight}));e.freeToWork(n)}else f.a.post(e.state.EMP_DASH+"/unavails",{day_off:e.state.daySpotlight}).then((function(t){a.push(t.data),e.setState({empUnavails:a,availStatusOfDay:!1})})).catch((function(e){return console.log("ERROR adding to db: ",e.message)}))},e.takeShift=function(t){console.log("\nSEND API FOR",t);var a=e.state.EMP_DASH+"/shifts/".concat(t.id);f.a.put(a).then((function(t){e.setState({empShifts:t.data}),e.updateLatestUnstaffedShifts()})).catch((function(e){return console.log(e.message)}))},e.updateLatestUnstaffedShifts=function(){f.a.get(e.state.EMP_DASH+"/unstaffedShifts").then((function(t){return e.setState({unstaffedShifts:t.data})})).catch((function(e){return console.log(e.message)}))};var a=k(new Date);return e.state={EMP_DASH:Object({NODE_ENV:"production",PUBLIC_URL:"/schedulePlusPlus"}).REACT_APP_EMP_DASH+"/"+sessionStorage.getItem("databaseId"),empInfo:[],empUnavails:[],empShifts:[],daySpotlight:a,shiftsToday:[],shiftsOfDay:[],availStatusOfDay:null,show:"calendar",unstaffedShifts:[]},e}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){var e=this;"EMPLOYEE"===this.props.authenticatedRole?f.a.all([this.getEmpInfo(),this.getEmpShifts(),this.getEmpUnavails(),this.getUnstaffedShifts()]).then(f.a.spread((function(){for(var t=arguments.length,a=new Array(t),n=0;n<t;n++)a[n]=arguments[n];var l=a[0].data,o=a[1].data,c=a[2].data,r=a[3].data,s=k(new Date),i=o.filter((function(e){return e.shift_date===s})),u=e.canTheyWorkThisDay(s,i,c);e.setState({empInfo:l,empShifts:o,empUnavails:c,today:s,shiftsToday:i,shiftsOfDay:i,availStatusOfDay:u,unstaffedShifts:r})}))).catch((function(e){return console.log(e)})):console.log("\n\nYou are *NOT* an employee!!!!")}},{key:"render",value:function(){var e=this;return l.a.createElement("section",null,l.a.createElement("ul",{className:"nav nav-tabs"},l.a.createElement("li",{className:"nav-item"},l.a.createElement("button",{className:"nav-link active",onClick:function(){return e.setShowCategory("calendar")}},"CALENDAR")),l.a.createElement("li",{className:"nav-item"},l.a.createElement("button",{className:"nav-link active",onClick:function(){return e.setShowCategory("shifts")}},"SHIFTS")),l.a.createElement("li",{className:"nav-item"},l.a.createElement("button",{className:"nav-link active",onClick:function(){return e.setShowCategory("unavails")}},"UNAVAILABLE DAYS")),l.a.createElement("li",{className:"nav-item"},l.a.createElement("button",{className:"nav-link active",onClick:function(){return e.setShowCategory("info")}},"INFO"))),"EMPLOYEE"===this.props.authenticatedRole?this.showChosenCategory():l.a.createElement(K,{message:"Please log in to see EMPLOYEE dashboard"}))}}]),t}(l.a.Component);function oe(e){var t=e.match;return l.a.createElement("section",{className:"homepage-section"},"NO NEED TO LOG IN, the UUID in the URL is verification enough b/c it's user's phone",l.a.createElement("br",null),"you'll either see... 1. Confirmation screen, or 2. Sorry shift is taken",l.a.createElement("br",null),l.a.createElement("br",null),"We received UUID = ",t.params.uuid,l.a.createElement("br",null),l.a.createElement("h1",null,"LOGIC FLOW"),"1. client clicking on this link, will send api call to backend and check to see if shift obj still exists in Texts db. ",l.a.createElement("br",null),l.a.createElement("br",null),"2A. If yes, then see confirmation screen ",l.a.createElement("br",null),"...2A1. Once emp clicks on confirm button, send API call to backend,",l.a.createElement("br",null),"...2A2. add that emp obj to the shift obj,",l.a.createElement("br",null),"...2A3. delete all rows in Texts that belong to that shift obj",l.a.createElement("br",null),l.a.createElement("br",null),"2B. If no, then see shift taken screen ",l.a.createElement("br",null))}var ce=a(19),re=a(60),se=a.n(re);function ie(){var e=sessionStorage.getItem("authenticatedRole");return console.log("sessionRole = ",e),l.a.createElement("section",{className:"homepage-section text-centered"},l.a.createElement("img",{src:se.a,alt:"2 people",className:"homepage-logo"}))}var ue=function(e){function t(){var e;return Object(r.a)(this,t),(e=Object(i.a)(this,Object(u.a)(t).call(this))).login=function(t){var a=Object({NODE_ENV:"production",PUBLIC_URL:"/schedulePlusPlus"}).REACT_APP_LOGIN+"/"+t;f.a.get(a).then((function(a){0===Object.entries(a.data).length&&(console.log("NOT IN OUR DB!!! "),sessionStorage.setItem("authenticatedRole","NEED UUID"),e.setState({authenticatedRole:"NEED UUID"}));var n=Object.keys(a.data)[0],l=Object.values(a.data)[0].name,o=Object.values(a.data)[0].id;sessionStorage.setItem("authenticatedRole",n),sessionStorage.setItem("username",l),sessionStorage.setItem("googleId",t),sessionStorage.setItem("databaseId",o),e.setState({authenticatedRole:n,googleId:t,username:l,databaseId:o})})).catch((function(e){return console.log("LOGIN ERROR!",e.message)}))},e.logout=function(){console.log("LOG OUT! send toaster pop up!"),e.setState({authenticatedRole:"",googleId:"",username:"",databaseId:""}),sessionStorage.clear()},e.state={authenticatedRole:"",googleId:"",username:"",databaseId:""},sessionStorage.setItem("authenticatedRole",""),sessionStorage.setItem("googleId",""),sessionStorage.setItem("username",""),sessionStorage.setItem("databaseId",""),e}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.state.authenticatedRole,t=this.state.username,a=this.state.googleId,n=this.state.databaseId;return l.a.createElement(b.a,null,l.a.createElement(v,{authenticatedRole:this.state.authenticatedRole,googleAuthCB:this.login,logoutCB:this.logout}),"ADMIN"===e?l.a.createElement(ce.a,{to:"/adminDash",component:function(){return l.a.createElement(le,{authenticatedRole:e,username:t,googleId:a,databaseId:n})}}):null,"EMPLOYEE"===e?l.a.createElement(ce.a,{to:"/employeeDash",component:function(){return l.a.createElement(le,{authenticatedRole:e,username:t,googleId:a,databaseId:n})}}):null,l.a.createElement(ce.d,null,l.a.createElement(ce.b,{path:"/",exact:!0,component:ie}),l.a.createElement(ce.b,{path:"/adminDash",component:function(){return l.a.createElement(Z,{authenticatedRole:e,username:t,googleId:a,databaseId:n})}}),l.a.createElement(ce.b,{path:"/employeeDash",exact:!0,component:function(){return l.a.createElement(le,{authenticatedRole:e,username:t,googleId:a,databaseId:n})}}),l.a.createElement(ce.b,{path:"/text/:uuid",component:oe})),l.a.createElement(N,null))}}]),t}(l.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(l.a.createElement(ue,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},33:function(e,t,a){e.exports=a.p+"static/media/redCrossFlag.e167e2a7.svg"},44:function(e,t,a){},53:function(e,t,a){e.exports=a.p+"static/media/SPPbanner2.596567f0.png"},59:function(e,t,a){e.exports=a.p+"static/media/blackLock.4b4a29b8.svg"},60:function(e,t,a){e.exports=a.p+"static/media/twopeople.65b701d4.svg"},61:function(e,t,a){e.exports=a(104)},66:function(e,t,a){}},[[61,1,2]]]);
//# sourceMappingURL=main.407f71b3.chunk.js.map