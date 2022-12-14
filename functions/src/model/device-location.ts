export interface ParsedData {
    Device: string;
    FullLocation: string;
    PIN?: number;
}

export type ErrorMessage =
    | "location not found"
    | "device not found on location"
    | "device not found"
    | "number not valid"
    | "client not available"
    | "unknown";
