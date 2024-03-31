import { useState } from "react"
import { toyService } from "../services/toy.service"
import { TextareaAutosize } from '@mui/base/TextareaAutosize'
import TextField from '@mui/material/TextField'


export function ToyMsgs({ toy, onMessageSaved,user }) {
    const [msg, setMsg] = useState(toyService.getEmptyMsg().msgs[0].txt)

    function handleChange(event) {
        setMsg(event.target.value)
    }
    async function onSaveMsg() {
        try {
            await toyService.saveMsg(toy._id, { txt: msg })
            setMsg('')
            onMessageSaved()
        } catch (err) {
            console.error('Failed to save message', err)
        }
    }
    if(!user)return
    return <div className="toy-msgs-container flex column">
        <textarea className="input" type="text" placeholder="Type your message here..." value={msg} onChange={handleChange} />
        <button onClick={onSaveMsg}>Save message</button>
    </div>
}