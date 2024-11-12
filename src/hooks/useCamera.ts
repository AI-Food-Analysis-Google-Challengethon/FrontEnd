'use client'

import { useState, useRef, useEffect } from 'react';

export const useCamera = (photoQuality: number = 1.0) => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [videoVisible, setVideoVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        setVideoVisible(true);
      };
    }
  }, [stream]);

  const startCamera = async () => {
    try {
      setError('');
      setPhotoData(null);
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 },
        }
      });
      
      setStream(mediaStream);
    } catch (err) {
      console.error('카메라 접근 에러:', err);
      setError(err instanceof Error ? err.message : '카메라 접근 실패');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setVideoVisible(false);
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const photo = canvas.toDataURL('image/jpeg', photoQuality);
        setPhotoData(photo);
        stopCamera();
      }
    }
  };

  const savePhoto = async () => {
    if (!photoData) return;

    try {
      const response = await fetch(photoData);
      const blob = await response.blob();

      const date = new Date();
      const fileName = `photo_${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}_${date.getHours().toString().padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date.getSeconds().toString().padStart(2, '0')}.jpg`;

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();

      window.URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error('사진 저장 중 에러:', err);
      setError('사진 저장에 실패했습니다.');
    }
  };

  return {
    stream,
    error,
    photoData,
    videoVisible,
    videoRef,
    canvasRef,
    startCamera,
    stopCamera,
    takePhoto,
    savePhoto,
    setPhotoData
  };
};
