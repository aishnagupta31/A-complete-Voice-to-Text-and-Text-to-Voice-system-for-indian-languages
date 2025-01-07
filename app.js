function getSelectedLanguage() {
    const languageSelect = document.getElementById('languageSelect');
    return languageSelect ? languageSelect.value : 'en-US';
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Speech Recognition is not supported by your browser. Please use Chrome or Edge.");
}

const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

function startRecognition() {
    const selectedLanguage = getSelectedLanguage();
    recognition.lang = selectedLanguage;
    recognition.start();
    console.log(`Voice recognition started in ${selectedLanguage}`);
}

recognition.onstart = function() {
    console.log("Voice recognition started...");
};

recognition.onspeechend = function() {
    recognition.stop();
    console.log("Voice recognition stopped.");
};

recognition.onerror = function(event) {
    console.error("Error occurred in speech recognition: " + event.error);
};

recognition.onresult = function(event) {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
    }
    document.getElementById('textOutput').value = transcript;
};

function speakText() {
    const text = document.getElementById('textInput').value;
    if (text !== "") {
        const selectedLanguage = getSelectedLanguage();
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = selectedLanguage;
        speech.rate = 1;
        speech.pitch = 1;
        window.speechSynthesis.speak(speech);
        console.log(`Speaking text in ${selectedLanguage}`);
    } else {
        console.log("No text entered for speech.");
    }
} 
