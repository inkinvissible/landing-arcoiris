"use client"
import { useState, useEffect } from 'react';

export default function CountdownTimer({ validUntil }) {
    // Estado inicial para controlar la hidratación
    const [isClient, setIsClient] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null);

    useEffect(() => {
        // Marcar que estamos en el cliente
        setIsClient(true);

        // Calcular tiempo inicial
        const calculateInitialTime = () => {
            const difference = new Date(validUntil) - new Date();

            if (difference <= 0) {
                return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
                expired: false
            };
        };

        // Establecer el tiempo inicial
        setTimeLeft(calculateInitialTime());

        // Configurar el intervalo para actualizar
        const timer = setInterval(() => {
            setTimeLeft(calculateInitialTime());
        }, 1000);

        return () => clearInterval(timer);
    }, [validUntil]);

    // Mostrar un placeholder durante SSR o hidratación
    if (!isClient || !timeLeft) {
        return (
            <div className="flex items-center mt-2 space-x-2">
                <div className="text-xs font-medium text-gray-600 dark:text-gray-300">
                    Finaliza en:
                </div>
                <div className="flex space-x-1">
                    <div className="bg-purple-100 dark:bg-purple-900/30 rounded px-1 py-0.5">
                        <span className="text-xs font-bold text-purple-800 dark:text-purple-300">--d</span>
                    </div>
                    <div className="bg-purple-100 dark:bg-purple-900/30 rounded px-1 py-0.5">
                        <span className="text-xs font-bold text-purple-800 dark:text-purple-300">--h</span>
                    </div>
                    <div className="bg-purple-100 dark:bg-purple-900/30 rounded px-1 py-0.5">
                        <span className="text-xs font-bold text-purple-800 dark:text-purple-300">--m</span>
                    </div>
                    <div className="bg-purple-100 dark:bg-purple-900/30 rounded px-1 py-0.5">
                        <span className="text-xs font-bold text-purple-800 dark:text-purple-300">--s</span>
                    </div>
                </div>
            </div>
        );
    }

    if (timeLeft.expired) {
        return <div className="text-red-500 text-xs font-semibold">Oferta expirada</div>;
    }

    return (
        <div className="flex items-center mt-2 space-x-2">
            <div className="text-xs font-medium text-gray-600 dark:text-gray-300">
                Finaliza en:
            </div>
            <div className="flex space-x-1">
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded px-1 py-0.5">
                    <span className="text-xs font-bold text-purple-800 dark:text-purple-300">{timeLeft.days}d</span>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded px-1 py-0.5">
                    <span className="text-xs font-bold text-purple-800 dark:text-purple-300">{timeLeft.hours}h</span>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded px-1 py-0.5">
                    <span className="text-xs font-bold text-purple-800 dark:text-purple-300">{timeLeft.minutes}m</span>
                </div>
                <div className="bg-purple-100 dark:bg-purple-900/30 rounded px-1 py-0.5">
                    <span className="text-xs font-bold text-purple-800 dark:text-purple-300">{timeLeft.seconds}s</span>
                </div>
            </div>
        </div>
    );
}