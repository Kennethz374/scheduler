import React, {useState} from "react"

  export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);
    
    function transition(newMode, replace = false) {
      const newHistory = history;
      if (replace) {
        newHistory.shift()
        setMode(newMode)
        setHistory([newMode, ...newHistory])
        return
      }
      setMode(newMode)
      setHistory(prev => ([newMode, ...prev]))  
    }

    function back () {
      if(mode === initial) {
        return setMode(initial)
      }
      history.shift()
      setMode(history[0])
    }

    return { mode, transition, back };
  }



