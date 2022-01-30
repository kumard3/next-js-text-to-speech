import React, { useState } from "react";
//@ts-ignore
import { useSpeechSynthesis } from "./react-speech-kit";
// import { textarea, button, layout } from "../styles/style";
//@ts-ignore
import { textarea, button, layout } from "../styles/style";


export default function WithPackage() {
  const [value, setValue] = useState("");
  const [speekvalue, setSpeekValue] = useState("");
  const { speak, cancel,pause } = useSpeechSynthesis();

console.log(useSpeechSynthesis())
  return (
    <div className={`${layout}`}>
      <div className="flex flex-col ">
        <h1 className="text-xl">
          package used{" "}
          <a href="https://www.npmjs.com/package/react-speech-kit">
            @react-speech-kit
          </a>
        </h1>
        <div>
          <textarea
            className={`${textarea} `}
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
        </div>
        <div className="flex justify-evenly w-full">
          <button
            onClick={() => speak({ text: value })}
            className={`${button} `}
          >
            {" "}
            Speak
          </button>
          <button className={`${button} `} onClick={() => cancel()}>
            {" "}
            Cancel
          </button>       
           <button className={`${button} `} onClick={() => pause()}>
            {" "}
            pause
          </button>
          {/* <button  onMouseDown={listen} onMouseUp={stop}>
          🎤
          </button>
        {listening && <div>Go ahead I'm listening</div>} */}
        </div>
      </div>
     
    </div>
  );
}
