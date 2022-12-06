import { useEffect, useRef, useState } from 'react';
import { MdDownloadDone } from 'react-icons/md';
import { AiOutlineInfo, AiOutlineClose } from 'react-icons/ai';
import { BsExclamationLg } from 'react-icons/bs';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export function Toast({ message, type, duration = 5000 }: ToastProps) {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setShowToast(true);

    const timer = setTimeout(() => {
      setShowToast(false);
    }, duration)

    return () => clearTimeout(timer);
  }, []);

  // progressBar
  const progressBarRef = useRef<ReturnType<typeof setInterval>>();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const complete = 100;

    if (duration) {
      progressBarRef.current = setInterval(() => {
        if (progress < complete) {
          setProgress((prev) => prev + 1);
        } else {
          return;
        }
      }, duration / complete);
    }

    return () => {
      clearInterval(progressBarRef.current);
    };
  }, []);

  return (
    <div className={`absolute left-0 top-0 z-[999] m-5 ${showToast ? '' : 'hidden'}`}>
      <div
        className={`relative flex items-center ${type === 'success' && 'bg-green-500'} ${type === 'error' && 'bg-red-500'} ${type === 'warning' && 'bg-yellow-400'} ${type === 'info' && 'bg-blue-400'} border-l-4 ${type === 'success' && 'border-green-700'} ${type === 'error' && 'border-red-700'} ${type === 'warning' && 'border-yellow-700'} ${type === 'info' && 'border-blue-700'} py-2 px-3 shadow-md mb-2`}
      >
        <div
          className={`${type === 'success' && 'text-green-500'} ${type === 'error' && 'text-red-500'} ${type === 'warning' && 'text-yellow-400'} ${type === 'info' && 'text-blue-400'} rounded-full bg-white mr-3`}
        >
          {type === 'success' && <MdDownloadDone />}
          {type === 'error' && <AiOutlineClose />}
          {type === 'warning' && <BsExclamationLg className='p-[0.12rem]' />}
          {type === 'info' && <AiOutlineInfo />}
        </div>

        <p>{message}</p>

        {!!duration && (
          <div className="absolute bottom-0 right-0 left-0 w-full h-1 bg-neutral-100 dark:bg-neutral-500">
            <span
              className="absolute bg-neutral-200 left-0 top-0 bottom-0 h-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  )
}