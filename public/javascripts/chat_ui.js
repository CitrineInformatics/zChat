var numberOfCalls = 1;


function divEscapedContentElement(message) {
	return $('<div></div>').text(message); //Assume this is JQuery's way of creating a div element and inserting escaped text
}

function divSystemContentElement(message) {
	return $('<div></div>').html('<i>' + message + '</i>') //Trusted text - just take it as is
}


function processUserInput() {
	var message = vueContent.sendMessage;
	var systemMessage;

	if (message.charAt(0) == '/') {
		systemMessage = vueContent.chatApp.processCommand(message);
		if (systemMessage) {
			vueContent.messages.push(systemMessage);
		}
	}	else {
		vueContent.chatApp.sendMessage(vueContent.room,message);
		vueContent.messages.push({text:message,source:vueContent.name}); //Vue automatically escapes data

	}
	vueContent.sendMessage = '';
}

//TODO Replace with Vue Constructs but just to get going

var theButton = document.querySelector('button');
theButton.onclick = function() {
	setUserName()
}

function setUserName() {
	var userName = prompt('Please enter your name.');
	localStorage.setItem('name',userName);
	console.log(localStorage.getItem('name'));
	vueContent.chatApp.processCommand('/nick ' + localStorage.getItem('name') );	
}

