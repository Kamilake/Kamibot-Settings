export interface DataPoint {
    status: string;
    guilds: number;
    users: number; // 추정 전체 사용자 수
    onlineUsers: number;
    currentTime: string; // ISO-8601 형식의 문자열 ("2025-02-25T04:38:03.306005617Z")
    uptime: string; // ISO-8601 형식의 문자열 ("PT42.875S")
    totalMemory: number;
    usedMemory: number;
    freeMemory: number;
    activeVirtualThreads: number;
    completedTasks: number;
    carrierThreadsTotal: number;
    carrierThreadsActive: number;
    carrierThreadsIdle: number;
    audioSendHandlers: number;
    cpuUsage: number;
    eventsPerSecond: number;
}

/** 백엔드 /api/kamibot/status snake_case 응답을 camelCase DataPoint로 변환 */
export function mapApiResponseToDataPoint(raw: Record<string, any>): DataPoint {
    return {
        status: raw.status,
        guilds: Number(raw.guilds),
        users: Number(raw.users),
        onlineUsers: Number(raw.online_users),
        currentTime: raw.current_time,
        uptime: raw.uptime,
        totalMemory: Number(raw.total_memory),
        usedMemory: Number(raw.used_memory),
        freeMemory: Number(raw.free_memory),
        activeVirtualThreads: Number(raw.active_virtual_threads),
        completedTasks: Number(raw.completed_tasks),
        carrierThreadsTotal: Number(raw.carrier_threads_total),
        carrierThreadsActive: Number(raw.carrier_threads_active),
        carrierThreadsIdle: Number(raw.carrier_threads_idle),
        audioSendHandlers: Number(raw.audio_send_handlers),
        cpuUsage: Number(raw.cpu_usage),
        eventsPerSecond: Number(raw.events_per_second),
    };
}