export interface ApiResponse<T> {
    status: 'success' | 'error';
    time: string;
    message: string;
    result?: T; // Optional, will be present on success
    error?: T; // Optional, will be present on error
}

export const ResponseEntity = <T>(status: 'success' | 'error', message: string, result?: T, error?: T): ApiResponse<T> => {
    return {
        status,
        time: Date(),
        message,
        result,
        error,
    };
};

