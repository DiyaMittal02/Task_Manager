import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Diagnostic: show startup info so we can trace HMR/socket issues
console.log('APP START - location:', window.location.href);
console.log('Navigator:', {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    onLine: navigator.onLine,
});

// Unregister any previously-registered service workers that could be
// connecting to stale ports (common cause of ws://localhost:3000 attempts)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations()
        .then((registrations) => {
            if (registrations.length) {
                console.log('Found service worker registrations, unregistering...', registrations);
            }
            return Promise.all(
                registrations.map((reg) => reg.unregister().then(() => reg))
            );
        })
        .then((unregistered) => {
            if (unregistered && unregistered.length) {
                console.log('Unregistered service workers:', unregistered);
                // Reload to ensure page loads without the old worker controlling it
                try {
                    console.log('Reloading page to clear old service worker control');
                    window.location.reload();
                } catch (e) {
                    console.warn('Reload failed:', e);
                }
            }
        })
        .catch((err) => console.warn('Service worker check/unregister failed:', err));

}

// Global error handlers to capture extension/service-worker related errors
window.addEventListener('error', (ev) => {
    console.log('Global error event:', ev.message, ev.filename, ev.lineno, ev.colno);
});
window.addEventListener('unhandledrejection', (ev) => {
    console.log('Unhandled promise rejection:', ev.reason);
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);