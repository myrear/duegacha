/**
 * アプリケーション開始時のガチャの種類を表します。
 */
export enum StartupGachaKind {
    LastUsed,
    Dogiragon,
    Dokindam
}

export const isStartupGachaKind = (item: any): item is StartupGachaKind => {
    return (
        item === StartupGachaKind.LastUsed || 
        item === StartupGachaKind.Dogiragon || 
        item === StartupGachaKind.Dokindam
    )
}