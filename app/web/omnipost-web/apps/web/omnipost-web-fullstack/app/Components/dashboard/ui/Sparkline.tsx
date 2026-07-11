// No "use client" needed — pure SVG, no hooks.

interface SparklineProps {
    data:  number[]
    color: string
}

/**
 * Sparkline — tiny polyline chart rendered as inline SVG.
 * Normalises values to fit within the viewBox automatically.
 */
export function Sparkline({ data, color }: SparklineProps) {
    const W = 72, H = 28
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1

    const points = data
        .map((v, i) => `${(i / (data.length - 1)) * W},${H - 2 - ((v - min) / range) * (H - 4)}`)
        .join(" ")

    return (
        <svg width={W} height={H} className="overflow-visible" aria-hidden>
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
