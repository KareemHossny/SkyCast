import { useEffect, useState, useCallback, useRef } from 'react';

const FAST_OPTIONS = {
  enableHighAccuracy: false,
  timeout: 8000,
  maximumAge: 600000
};

const HIGH_ACCURACY_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 0
};

const IP_FALLBACK_URL = 'https://ipapi.co/json/';

export function useGeolocation() {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [coords, setCoords] = useState(null);
  const [permission, setPermission] = useState('unknown');
  const [source, setSource] = useState('');
  const triedHighAccuracyRef = useRef(false);
  const triedIpFallbackRef = useRef(false);

  const handleSuccess = (pos) => {
    setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
    setStatus('success');
    setError('');
    setSource('gps');
    triedHighAccuracyRef.current = false;
    triedIpFallbackRef.current = false;
  };

  const requestIpFallback = async () => {
    if (triedIpFallbackRef.current) return;
    triedIpFallbackRef.current = true;

    try {
      const res = await fetch(IP_FALLBACK_URL, { headers: { Accept: 'application/json' } });
      const data = await res.json();
      if (!res.ok || !data || data.error) {
        throw new Error(data?.reason || 'IP lookup failed');
      }

      if (typeof data.latitude !== 'number' || typeof data.longitude !== 'number') {
        throw new Error('IP lookup missing coordinates');
      }

      setCoords({ lat: data.latitude, lon: data.longitude });
      setStatus('success');
      setError('');
      setSource('ip');
    } catch {
      setStatus('error');
      setError('Unable to determine location.');
    }
  };

  const handleError = (err) => {
    if (err.code === err.TIMEOUT && !triedHighAccuracyRef.current) {
      triedHighAccuracyRef.current = true;
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError, HIGH_ACCURACY_OPTIONS);
      return;
    }

    if (err.code === err.PERMISSION_DENIED) {
      setError('Location permission denied. Using IP-based location.');
      setPermission('denied');
      setStatus('loading');
      requestIpFallback();
      return;
    }

    if (err.code === err.TIMEOUT) {
      setError('Location request timed out. Using IP-based location.');
      setStatus('loading');
      requestIpFallback();
      return;
    }

    setError('Unable to retrieve location. Using IP-based location.');
    setStatus('loading');
    requestIpFallback();
  };

  const requestLocation = useCallback(() => {
    if (!window.isSecureContext) {
      setStatus('error');
      setError('Location requires a secure context (HTTPS) or localhost.');
      return;
    }

    if (!navigator.geolocation) {
      setStatus('error');
      setError('Geolocation is not supported by this browser.');
      requestIpFallback();
      return;
    }

    setStatus('loading');
    setError('');
    setSource('');
    triedHighAccuracyRef.current = false;
    triedIpFallbackRef.current = false;

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, FAST_OPTIONS);
  }, []);

  useEffect(() => {
    const checkPermission = async () => {
      if (!navigator.permissions?.query) return;
      try {
        const result = await navigator.permissions.query({ name: 'geolocation' });
        setPermission(result.state);
        if (result.state === 'granted') {
          requestLocation();
        }
        result.onchange = () => setPermission(result.state);
      } catch {
        // ignore permission API errors
      }
    };

    checkPermission();
  }, [requestLocation]);

  return {
    status,
    error,
    coords,
    permission,
    source,
    requestLocation,
    setCoords
  };
}
