import { formatDate, getTimestamp } from './date'

export const formatDevicesData = (data: any) => {
    if (!data) return;
    // Sort by lastLocationUpdate (most recent first)
    data.sort((a: any, b: any) => {
        const timestampA = getTimestamp(a.lastLocationUpdate);
        const timestampB = getTimestamp(b.lastLocationUpdate);
        return timestampB - timestampA; 
    })    
    // Format dates and add any additional display properties
    .map((device: any) => {
        // Create a status property based on how recent the update is
        let status = "offline"; // Default status
        let statusColor = "#FF0000"; // Red for offline
        
        if (device.lastLocationUpdate) {
            const lastSeen = getTimestamp(device.lastLocationUpdate);
            const now = Date.now();
            const hoursDifference = (now - lastSeen) / (1000 * 60 * 60);
            
            if (hoursDifference <= 48) {
                status = "Connected";
                statusColor = "#008000"; // Green for online
            } else {
                status = "Disconnected";
                statusColor = "#FF0000"; // Red for offline
            }
        }
        
        // Return enhanced device object
        return {
            ...device,
            status,
            statusColor,
            formattedTimestamp: formatDate(device.lastLocationUpdate)
        };
    });
};