export interface Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ComputedLocation {
    lat: number;
    lng: number;
    radius: number;
    source: number;
    status: number;
}

export interface Duplicate {
    bsId: string;
    rssi: number;
    nbRep: number;
}

export interface SigfoxMessage {
    id: string;
    messageType: string;
    data: string;
    lqi: string;
    linkQuality: string;
    operatorName: string;
    countryCode: string;
    duplicates: Duplicate[];
    computedLocation: ComputedLocation;
    createdAt: string;
}

export interface SigfoxDevice {
    deviceId: string;
    status?: string;
    friendlyName: string;
    aliasDeviceType?: string
    SigfoxId: string;
    deviceType: string;
    deviceTypeId: string;
    lastLatitude: string;
    lastLongitude: string;
    lastLocationUpdate: string;
    client: Client;
    messages: SigfoxMessage[];
    locationHistory: any[];
    location?: string;
}

 // Updated type definition for new API response
export interface DeviceLocation {
    id: string;
    latitude: string;
    longitude: string;
    locationName: string;
    timestamp: string; // ISO string, puedes usar Date si haces parse
}

// export interface DeviceInfo {
//     deviceId: string;
//     friendlyName: string;
//     SigfoxId: string;
//     deviceType: string;
//     deviceTypeId: string;
//     aliasDeviceType: string;
//     lastLatitude: string;
//     lastLongitude: string;
//     lastLocationUpdate: string; // ISO string
//     locationHistory: DeviceLocation[];
// }