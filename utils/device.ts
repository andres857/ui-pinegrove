import { formatDate, getTimestamp } from './date'

export const formatDevicesData = (data: any) => {
    if (!data) return;
    // Sort by lastLocationUpdate (most recent first)
    const formattedData = data.sort((a: any, b: any) => {
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
    return formattedData
};

export const formatMessagesHistory = (messages: any) => {
    if (!messages) return;
    
    // Tomar los últimos 10 registros y ordenarlos de más reciente a más antiguo
    const last10Locations = [...messages.locationHistory]
        .slice(-10)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    
    // Formatear las ubicaciones
    // const lastLocations = last10Locations.map((loc: any, index: number) => {
    //     return {
    //         ...loc,
    //         label:  loc.locationName,
    //         time: formatDate(loc.timestamp),
    //     };
    // });
    // return lastLocations;
    return last10Locations.map((loc: any) => ({
        ...loc,
        label: loc.locationName,
        time: formatDate(loc.timestamp),
    }));
}

    // const formatMessagesHistory = () => {
    //     if (!deviceInfo.value) return;
        
    //     // Tomar los últimos 10 registros y ordenarlos de más reciente a más antiguo
    //     const last10Locations = [...deviceInfo.value.locationHistory]
    //         .slice(-10)
    //         .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        
    //     // Formatear las ubicaciones
    //     messagesHistory.value = last10Locations.map((loc: any, index: number) => {
    //         return {
    //             ...loc,
    //             label:  loc.locationName,
    //             time: formatDate(loc.timestamp),
    //         };
    //     });
    // }