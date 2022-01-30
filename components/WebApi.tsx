import { useSpeechSynthesisApi } from "../hooks/useSpeechSynthesisApi";

export default function WebApi() {
  const {
    text,
    setText,
    isSpeaking,
    isPaused,
    isResumed,
    isEnded,
    speak,
    pause,
    resume,
    cancel,
  } = useSpeechSynthesisApi();

  const textarea = `bg-gray-500 text-white rounded-3xl p-[14px] text-xl w-[360px] sm:w-[30rem] min-h-[20rem]`;

  const button = `text-white rounded-xl bg-gray-500 px-5 py-3 text-xl`;

  return (
    <div className="flex flex-col mt-10 justify-center  items-center">
      <div className="max-w-[36rem]">
        <textarea
          className={`${textarea} `}
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      </div>
      <div className="w-full flex justify-center items-center">
        <button onClick={speak} className={`${button} mx-3 `}>
          Speak
        </button>
        {isSpeaking ? "Speaking" : ""}
        <button onClick={pause} className={`${button} mx-3 `}>
          pause
        </button>
        {isPaused ? "Paused" : ""}
        <button onClick={resume} className={`${button} mx-3 `}>
          resume
        </button>
        {isResumed ? "Resumed" : ""}
        <button onClick={cancel} className={`${button} mx-3 active:  `}>
          cancel
        </button>
        {isEnded ? "Canceled" : ""}
      </div>
    </div>
  );
}
