export interface DataPoint {
    status: string;
    guilds: number;
    onlineUsers: number;
    currentTime: string; // ISO-8601 형식의 문자열 ("2025-02-25T04:38:03.306005617Z")
    uptime: string; // ISO-8601 형식의 문자열 ("PT42.875S")
    totalMemory: number;
    usedMemory: number;
    freeMemory: number;
    totalThreads: number;
    activeThreads: number;
    idleThreads: number;
    audioSendHandlers: number;
    cpuUsage: number;
    eventsPerSecond: number;
}