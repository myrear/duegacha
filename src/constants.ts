/**
 * ガチャの回転アニメーションにかかる時間[ms]
 */
export const REELING_DURATION: number = 700

/**
 * ガチャの出目一つあたりの高さ[px]
 */
export const A_REEL_HEIGHT: number = 60

/**
 * localStorageに保存された、最後に使用されたガチャの種類のキー
 */
export const LAST_USED_GACHA_KIND_KEY = 'LAST_USED_GACHA_KIND'

/**
 * localStorageに保存された、アプリケーション開始時のガチャの種類のキー
 */
export const STARTUP_GACHA_KIND_KEY = 'STARTUP_GACHA_KIND'

/**
 * localStorageに保存された、ガチャ切替時の挙動のキー
 */
export const CHANGING_GACHA_BEHAVIOR_KEY = 'CHANGING_GACHA_BEHAVIOR'

/**
 * ガチャ切り替えタブの中身を改行するブレークポイント
 */
export const GACHA_TAB_CONTENT_BREAKPOINT: number = 410