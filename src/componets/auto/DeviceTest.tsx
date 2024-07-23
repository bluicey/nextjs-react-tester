"use client";

import { useState, useRef, useEffect } from 'react';

const DeviceTest = () => {
  const [testStatus, setTestStatus] = useState({
    speaker: 'Not Started',
    camera: 'Not Started',
    microphone: 'Not Started',
  });
  const [isTesting, setIsTesting] = useState(false);
  const [autoTest, setAutoTest] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentCamera, setCurrentCamera] = useState(0);
  const [cameraDevices, setCameraDevices] = useState<MediaDeviceInfo[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioPlaybackRef = useRef<HTMLAudioElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const getCameraDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setCameraDevices(videoDevices);
      } catch (error) {
        console.error('Error enumerating devices:', error);
      }
    };
    getCameraDevices();
  }, []);

  const testSpeaker = async () => {
    setIsTesting(true);
    setTestStatus(prev => ({ ...prev, speaker: 'Testing...' }));

    const audio = new Audio('/audio_test.mp3'); 
    const audio = new Audio('/audio_test.mp3');
    audioRef.current = audio;

    audio.onerror = () => {
      console.error('Error loading audio file');
      setTestStatus(prev => ({ ...prev, speaker: 'Failed to load audio' }));
      setIsTesting(false);
      if (autoTest) testCamera(); // Proceed to next test in auto mode
    };

    audio.play();
    audio.onended = () => {
      setTestStatus(prev => ({ ...prev, speaker: 'Completed' }));
      setIsTesting(false);
      if (autoTest) testCamera(); // Proceed to next test in auto mode
    };
  };

  const skipSpeaker = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setTestStatus(prev => ({ ...prev, speaker: 'Skipped' }));
    setIsTesting(false);
    if (autoTest) testCamera(); // Proceed to next test in auto mode
  };

  const testCamera = async () => {
    setIsTesting(true);
    setTestStatus(prev => ({ ...prev, camera: 'Testing...' }));
    try {
      if (cameraDevices.length === 0) {
        throw new Error('No camera devices found');
      }
      const cameraStream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: cameraDevices[currentCamera].deviceId },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = cameraStream;
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play();
          }
        };
        setTestStatus(prev => ({ ...prev, camera: 'Completed' }));
      }
    } catch (error) {
      console.error('Camera access error:', error);
      setTestStatus(prev => ({ ...prev, camera: 'Failed' }));
    }
    setIsTesting(false);
    if (autoTest) testMicrophone(); // Proceed to next test in auto mode
  };

  const switchCamera = async () => {
    setCurrentCamera(prev => (prev + 1) % cameraDevices.length);
    if (testStatus.camera === 'Completed' || testStatus.camera === 'Failed') {
      await testCamera();
    }
  };

  const testMicrophone = async () => {
    setIsTesting(true);
    setTestStatus(prev => ({ ...prev, microphone: 'Testing...' }));
    let mediaRecorder: MediaRecorder;
    let audioChunks: Blob[] = [];

    try {
      const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder = new MediaRecorder(micStream);

      mediaRecorder.onstart = () => {
        audioChunks = [];
      };

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        if (audioPlaybackRef.current) {
          audioPlaybackRef.current.src = audioUrl;
          audioPlaybackRef.current.play();
        }
        setTestStatus(prev => ({ ...prev, microphone: 'Recording Stopped, Playing Back...' }));
        if (audioPlaybackRef.current) {
          audioPlaybackRef.current.onended = () => {
            setTestStatus(prev => ({ ...prev, microphone: 'Completed' }));
            setIsTesting(false);
            if (autoTest) setAutoTest(false); // End auto mode
          };
        }
      };

      mediaRecorder.start();
      setTimeout(() => {
        mediaRecorder.stop();
      }, 5000); // Stops recording after 5 seconds

    } catch (error) {
      console.error('Microphone access error:', error);
      setTestStatus(prev => ({ ...prev, microphone: 'Failed' }));
      setIsTesting(false);
      if (autoTest) setAutoTest(false); // End auto mode
    }
  };

  const handleSkipMicrophone = () => {
    setTestStatus(prev => ({ ...prev, microphone: 'Skipped' }));
    setIsTesting(false);
    if (autoTest) setAutoTest(false); // End auto mode
  };

  const startAutoTest = () => {
    setAutoTest(true);
    testSpeaker();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Device Test</h1>
      <div className="mb-4">
        <button
          className="btn btn-primary mr-2"
          onClick={startAutoTest}
          disabled={isTesting}
        >
          Start Auto Test
        </button>
      </div>
      <div className="mb-4">
        <button
          className="btn btn-primary mr-2"
          onClick={testSpeaker}
          disabled={isTesting}
        >
          Test Speaker
        </button>
        <button
          className="btn btn-secondary"
          onClick={skipSpeaker}
          disabled={!isTesting || testStatus.speaker !== 'Testing...'}
        >
          Skip Speaker
        </button>
      </div>
      <div className="mb-4">
        <button
          className="btn btn-primary mr-2"
          onClick={testCamera}
          disabled={isTesting}
        >
          Test Camera
        </button>
        <button
          className="btn btn-secondary"
          onClick={switchCamera}
          disabled={isTesting || cameraDevices.length <= 1}
        >
          Switch Camera
        </button>
      </div>
      <div className="mb-4">
        <button
          className="btn btn-primary mr-2"
          onClick={testMicrophone}
          disabled={isTesting}
        >
          Test Microphone
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleSkipMicrophone}
          disabled={!isTesting || testStatus.microphone !== 'Testing...'}
        >
          Skip Microphone
        </button>
      </div>
      <div>
        <p>Speaker Test: {testStatus.speaker}</p>
        <p>Camera Test: {testStatus.camera}</p>
        <p>Microphone Test: {testStatus.microphone}</p>
      </div>
      <video ref={videoRef} autoPlay className="mt-4 border" width="320" height="240"></video>
      <audio ref={audioPlaybackRef} className="mt-4" controls></audio>
    </div>
  );
};

export default DeviceTest;
