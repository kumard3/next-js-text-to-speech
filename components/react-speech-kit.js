// import React,{useState,useCallback} from 'react';

// export const useTextToSpeech = () => {
//     const [value, setValue] = useState(
//         "Hey there! Cyphen, a community  with great passion and zest in building a healthy environment To learn •Open Source•Web Development•Data structures and Algorithms•Projects•Competitive Coding•ProgrammingMotivational talks, Opportunities, and much much more!Suggestions are always welcomed."
//       );
    
//       const [isSpeaking, setIsSpeaking] = useState(false);
//       const [isPaused, setIsPaused] = useState(false);
//       const [isResumed, setIsResumed] = useState(false);
//       const [isEnded, setIsEnded] = useState(false);
//       var msg = new SpeechSynthesisUtterance(undefined);
    
//       msg.text = value;
    
//       const speak = useCallback(() => {
//         function speak() {
//           window.speechSynthesis.speak(msg);
//         }
//         speak();
//         setIsSpeaking(true);
//         setIsEnded(false);
//       }, [msg]);
    
//       const Pause = useCallback(() => {
//         function pause() {
//           window.speechSynthesis.pause();
//         }
//         pause();
//         setIsPaused(true);
//         setIsSpeaking(false);
//         setIsEnded(false);
//         setIsResumed(false);
//       }, []);
    
//       const Resume = useCallback(() => {
//         function resume() {
//           window.speechSynthesis.resume();
//         }
//         resume();
//         setIsPaused(false);
//         setIsSpeaking(false);
//         setIsEnded(false);
//         setIsResumed(true);
//       }, []);
    
//       const Cancel = useCallback(() => {
//         function cancel() {
//           window.speechSynthesis.cancel();
//         }
//         cancel();
//         setIsPaused(false);
//         setIsResumed(false);
    
//         setIsSpeaking(false);
//         setIsEnded(true);
//       }, []);

//       return{
//         value,
//         setValue,
//         isSpeaking,
//         isPaused,
//         isResumed,
//         isEnded,
//         speak,
//         Pause,
//         Resume,
//         Cancel

//       }
// }





// export const useTextToSpeech = (text:string) => {
//     const [isSpeaking, setIsSpeaking] = useState(false);
//     const [isSupported, setIsSupported] = useState(false);

//     const speak = () => {
//         if (isSpeaking) {
//             window.speechSynthesis.cancel();
//             setIsSpeaking(false);
//         } else {
//             const utterance = new SpeechSynthesisUtterance(text);
//             window.speechSynthesis.speak(utterance);
//             setIsSpeaking(true);
//         }
//     };

//     const check = () => {
//         if (window.speechSynthesis) {
//             setIsSupported(true);
//         } else {
//             setIsSupported(false);
//         }
//     };

//     React.useEffect(() => {
//         check();
//     }, []);

//     return {
//         isSpeaking,
//         speak,
//         isSupported
//     };
// }

import { useEffect, useState } from 'react';

export const useSpeechSynthesis = (props = {}) => {
  const { onEnd = () => {} } = props;
  const [voices, setVoices] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  const processVoices = (voiceOptions) => {
    setVoices(voiceOptions);
  };

  const getVoices = () => {
    // Firefox seems to have voices upfront and never calls the
    // voiceschanged event
    let voiceOptions = window.speechSynthesis.getVoices();
    if (voiceOptions.length > 0) {
      processVoices(voiceOptions);
      return;
    }

    window.speechSynthesis.onvoiceschanged = (event) => {
      voiceOptions = event.target.getVoices();
      processVoices(voiceOptions);
    };
  };

  const handleEnd = () => {
    setSpeaking(false);
    onEnd();
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSupported(true);
      getVoices();
    }
  }, []);

  const speak = (args = {}) => {
    const { voice = null, text = '', rate = 1, pitch = 1, volume = 1 } = args;
    if (!supported) return;
    setSpeaking(true);
    // Firefox won't repeat an utterance that has been
    // spoken, so we need to create a new instance each time
    const utterance = new window.SpeechSynthesisUtterance();
    utterance.text = text;
    utterance.voice = voice;
    utterance.onend = handleEnd;
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = volume;
    window.speechSynthesis.speak(utterance);
  };

  const cancel = () => {
    if (!supported) return;
    setSpeaking(false);
    window.speechSynthesis.cancel();
  };
  const pause = () => {
    if(!supported) return;
    
    window.speechSynthesis.pause();
  }
  const resume = () => {
    if(!supported) return;
    window.speechSynthesis.resume();
  }
  return {
    supported: supported,
    speak: speak,
    speaking: speaking,
    cancel: cancel,
    pause: pause,
    resume: resume,
    voices: voices

  };
};

// export default useSpeechSynthesis;