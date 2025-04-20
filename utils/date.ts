export const getTimestamp = (dateString: string | null): number => {
    if (!dateString) return 0;
    return new Date(dateString).getTime();
};

export const formatDate = (dateString: string | null): string => {
    if (!dateString) return 'No disponible';
    return new Date(dateString).toLocaleString('es-ES', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
};