import { useEffect, useState } from 'react';
import { createAxiosInstance } from './axios';


export const useGet = (route, params = {}, onSuccess, onError) => {
    const [state, setState] = useState({
        isLoading: true, data: null, error: null
    });
    let retryCount = 0;

    const doGet = async (firstTime) => {
        if (!firstTime && state.isLoading && retryCount === 0) return;        
        try {
            setState(s => ({ ...s, isLoading: true, data: null, error: null }));
            const response = await createAxiosInstance(null).get(route, { params });
            if (onSuccess) onSuccess(response);
            return response;
        } catch (error) {
            if (error.statusCode === 401 && retryCount < 1) {
                try {                    
                    retryCount += 1;
                    return doGet();
                } catch (e) {
                    setState(s => ({ ...s, isLoading: false, error: e }));
                    throw e;
                }
            }

            if (onError) onError(error);
            throw error;
        }
    }

    useEffect(() => {
        let isMounted = true;

        (async () => {
            try {
                const response = await doGet(true);
                if (!isMounted) return;
                setState(s => ({ ...s, isLoading: false, data: response }));
            } catch (error) {
                if (!isMounted) return;
                setState(s => ({ ...s, isLoading: false, error }));
            }
        })();

        return () => isMounted = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        ...state,
        execute: async () => {
            try {
                const response = await doGet();
                setState(s => ({ ...s, isLoading: false, data: response }));
            } catch (error) {
                setState(s => ({ ...s, isLoading: false, error }));
            }
        }
    };
}


export const useLazyGet = (route) => {
    const [state, setState] = useState({
        isLoading: false, data: null, error: null
    });
    let retryCount = 0;

    const get = async (params, altRoute) => {
        if (state.isLoading && retryCount === 0) return;        
        try {
            setState(s => ({ ...s, isLoading: true, data: null, error: null }));
            const response = await createAxiosInstance(null).get(altRoute ? altRoute : route, { params });
            setState(s => ({ ...s, isLoading: false, data: response }));
            return response;
        } catch (error) {
            if (error.statusCode === 401 && retryCount < 1) {
                try {                    
                    retryCount += 1;
                    return get(params);
                } catch (e) {
                    setState(s => ({ ...s, isLoading: false, error: e }));
                    throw e;
                }
            }

            setState(s => ({ ...s, isLoading: false, error }));
            throw error;
        }
    }


    return { ...state, get };
}


export const usePost = (route) => {
    const [state, setState] = useState({
        isLoading: false, data: null, error: null
    });
    let retryCount = 0;

    const post = async (body, config = {}, altRoute) => {
        if (state.isLoading && retryCount === 0) return;
        try {
            setState(s => ({ ...s, isLoading: true, data: null, error: null }));
            const response = await createAxiosInstance(null).post(altRoute ? altRoute: route, body, config);
            setState((s) => ({ ...s, isLoading: false, data: response }));
            return response;
        } catch (error) {
            if (error.statusCode === 401 && retryCount < 1) {
                try {
                    retryCount += 1;
                    return post(body, config);
                } catch (e) {
                    setState(s => ({ ...s, isLoading: false, error: e }));
                    throw e;
                }
            }

            setState(s => ({ ...s, isLoading: false, error }));
            throw error;
        }
    }

    return { ...state, post }
}


export const usePatch = (route) => {
    const [state, setState] = useState({
        isLoading: false, data: null, error: null
    });

    let retryCount = 0;

    const patch = async (body, config = {}) => {
        if (state.isLoading && retryCount === 0) return;
        try {
            setState(s => ({ ...s, isLoading: true, data: null, error: null }));
            const response = await createAxiosInstance(null).patch(route, body, config);
            setState((s) => ({ ...s, isLoading: false, data: response }));
            return response;
        } catch (error) {
            if (error.statusCode === 401 && retryCount < 1) {
                try {
                    retryCount += 1;
                    return patch(body, config);
                } catch (e) {
                    setState(s => ({ ...s, isLoading: false, error: e }));
                    throw e;
                }
            }

            setState(s => ({ ...s, isLoading: false, error }));
            throw error;
        }
    }

    return { ...state, patch }
}


export const usePut = (route) => {
    const [state, setState] = useState({
        isLoading: false, data: null, error: null
    });

    let retryCount = 0;

    const put = async (body, config = {}) => {
        if (state.isLoading && retryCount === 0) return;
        try {
            setState(s => ({ ...s, isLoading: true, data: null, error: null }));
            const response = await createAxiosInstance(null).put(route, body, config);
            setState((s) => ({ ...s, isLoading: false, data: response }));
            return response;
        } catch (error) {
            if (error.statusCode === 401 && retryCount < 1) {
                try {
                    retryCount += 1;
                    return put(body, config);
                } catch (e) {
                    setState(s => ({ ...s, isLoading: false, error: e }));
                    throw e;
                }
            }

            setState(s => ({ ...s, isLoading: false, error }));
            throw error;
        }
    }

    return { ...state, put }
}


export const useDelete = () => {
    const [state, setState] = useState({
        isLoading: false, data: null, error: null
    });

    let retryCount = 0;

    const remove = async (route, config = {}) => {
        if (state.isLoading && retryCount === 0) return;
        try {
            setState(s => ({ ...s, isLoading: true, data: null, error: null }));
            const response = await createAxiosInstance(null).delete(route, config);
            setState((s) => ({ ...s, isLoading: false, data: response }));
            return response;
        } catch (error) {
            if (error.statusCode === 401 && retryCount < 1) {
                try {
                    retryCount += 1;
                    return remove(config);
                } catch (e) {
                    setState(s => ({ ...s, isLoading: false, error: e }));
                    throw e;
                }
            }

            setState(s => ({ ...s, isLoading: false, error }));
            throw error;
        }
    }

    return { ...state, remove }
}
