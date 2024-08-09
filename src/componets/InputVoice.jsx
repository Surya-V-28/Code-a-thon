import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { db } from "../Firebase"; // Import your Firebase configuration

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const VoiceInput = () => {
  const [transcript, setTranscript] = useState("");

  const startListening = () => {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US"; // Set language to English. Change as needed.

    recognition.onresult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setTranscript(currentTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Error occurred in recognition: " + event.error);
    };

    recognition.start();
  };

  const stopListening = () => {
    recognition.stop();
    saveTranscript(transcript);
  };

  const saveTranscript = async (transcript) => {
    try {
      await addDoc(collection(db, "inspections"), {
        transcript,
        createdAt: new Date(),
      });
      console.log("Transcript saved successfully!");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <h2>Voice Input for Inspection</h2>
      <button onClick={startListening}>Start Recording</button>
      <button onClick={stopListening}>Stop Recording</button>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default InputVoice;
