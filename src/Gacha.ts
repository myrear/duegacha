/**
 * ガチャの種類を表します。
 */
export enum GachaKind {
    Dogiragon,
    Dokindam
}

/**
 * ガチャの出目を表します。
 */
export type Appearance = {
    readonly number: 1 | 2 | 3 | 4 | 5 | 6,
    readonly display: string,
    readonly ability: string
}

/**
 * ドギラゴンガチャの出目の一覧です。
 */
export const DogiragonGachaAppearances: readonly Appearance[] = [
    {
        number: 1,
        display: "加速",
        ability: "自分の山札の上から1枚目をマナゾーンに置く。"
    },
    {
        number: 2,
        display: "補充",
        ability: "カードを1枚引く。"
    },
    {
        number: 3,
        display: "打撃",
        ability: "このターン、自分のクリーチャー1体はシールドをさらに1枚ブレイクする。"
    },
    {
        number: 4,
        display: "破壊",
        ability: "相手のコスト7以下のクリーチャーを1体、破壊する。"
    },
    {
        number: 5,
        display: "格闘",
        ability: "自分と相手のクリーチャーを1体ずつ選び、バトルさせる。"
    },
    {
        number: 6,
        display: "出撃",
        ability: "進化ではないクリーチャーを1体、自分のマナゾーンからバトルゾーンに出す。"
    }
] as const

/**
 * ドキンダムガチャの出目の一覧です。
 */
export const DokindamGachaAppearances: readonly Appearance[] = [
    {
        number: 1,
        display: "墓地",
        ability: "自分の山札の上から３枚を墓地に置く。"
    },
    {
        number: 2,
        display: "補充",
        ability: "カードを1枚引く。"
    },
    {
        number: 3,
        display: "回収",
        ability: "クリーチャーを1体、自分の墓地から手札に戻す。"
    },
    {
        number: 4,
        display: "忘却",
        ability: "相手は自身の手札を１枚選び、捨てる。"
    },
    {
        number: 5,
        display: "衰弱",
        ability: "相手のクリーチャーを１体選ぶ。このターン、そのクリーチャーのパワーを-9000する。"
    },
    {
        number: 6,
        display: "復活",
        ability: "進化ではないクリーチャーを1体、自分の墓地からバトルゾーンに出す。"
    }
] as const

/**
 * ガチャのログを表します。
 */
export type Log = Appearance & { timestamp: number }
