import { createContext } from 'react'

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

/**
 * ガチャを切り替えるときの挙動を表します。
 */
export enum ChangingGachaBehavior {
    DoNotChange,
    StopReelingAndForceChanging
}

export const ChangingGachaBehaviorContext = createContext<[ChangingGachaBehavior, (v: ChangingGachaBehavior) => void]>([ChangingGachaBehavior.DoNotChange, _ => { }])