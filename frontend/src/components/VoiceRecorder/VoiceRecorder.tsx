import React, { useState, useRef } from "react";
import { IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import SendIcon from "@mui/icons-material/Send";

const VoiceRecorder = ({ onSendVoiceMessage }: { onSendVoiceMessage: (audioBlob: Blob) => void }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
    const audioBlobRef = useRef<Blob | null>(null);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        recorder.start();
        setIsRecording(true);

        recorder.ondataavailable = (e) => {
            setAudioChunks((prev) => [...prev, e.data]);
        };

        recorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
            audioBlobRef.current = audioBlob;
            onSendVoiceMessage(audioBlob);
            setIsRecording(false);
            setAudioChunks([]);
        };
    };

    const stopRecording = () => {
        mediaRecorder?.stop();
    };

    return (
        <div>
            {isRecording ? (
                <IconButton onClick={stopRecording}>
                    <StopIcon />
                </IconButton>
            ) : (
                <IconButton onClick={startRecording}>
                    <MicIcon />
                </IconButton>
            )}
            {audioBlobRef.current && (
                <IconButton onClick={() => onSendVoiceMessage(audioBlobRef.current!)}>
                    <SendIcon />
                </IconButton>
            )}
        </div>
    );
};

export default VoiceRecorder;
