import { useState, useEffect, useRef } from 'react';

const TypingTest = () => {
    const [animatedText, setAnimatedText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const timerRef = useRef(null);

    const testText = "This is a test typing animation to verify it works correctly!";

    useEffect(() => {
        console.log('TypingTest component mounted');

        const startTyping = () => {
            console.log('Starting typing animation...');
            setIsTyping(true);
            setAnimatedText('');

            let index = 0;

            if (timerRef.current) {
                clearInterval(timerRef.current);
            }

            timerRef.current = setInterval(() => {
                if (index <= testText.length) {
                    const currentText = testText.slice(0, index);
                    console.log(`Typing: "${currentText}"`);
                    setAnimatedText(currentText);
                    index++;
                } else {
                    console.log('Typing animation completed');
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                    setIsTyping(false);
                }
            }, 100);
        };

        // Start typing after a short delay
        const timeout = setTimeout(startTyping, 1000);

        return () => {
            clearTimeout(timeout);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const restartAnimation = () => {
        console.log('Restarting typing animation...');
        setAnimatedText('');
        setIsTyping(true);

        let index = 0;

        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        timerRef.current = setInterval(() => {
            if (index <= testText.length) {
                const currentText = testText.slice(0, index);
                setAnimatedText(currentText);
                index++;
            } else {
                clearInterval(timerRef.current);
                timerRef.current = null;
                setIsTyping(false);
            }
        }, 100);
    };

    return (
        <div className="p-8 bg-gray-800 rounded-lg m-4">
            <h3 className="text-xl font-bold mb-4 text-white">Typing Animation Test</h3>
            <div className="text-gray-300 mb-4 min-h-[60px]">
                <p className="relative">
                    {animatedText}
                    {isTyping && (
                        <span className="inline-block w-0.5 h-6 bg-blue-400 ml-1 animate-pulse"></span>
                    )}
                </p>
            </div>
            <button
                onClick={restartAnimation}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
                Restart Animation
            </button>
        </div>
    );
};

export default TypingTest;
