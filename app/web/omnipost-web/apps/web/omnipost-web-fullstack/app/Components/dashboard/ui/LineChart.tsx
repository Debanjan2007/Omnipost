"use client"

// useId requires client context.
import { useId } from "react"

interface LineChartProps {
    data:  number[]
    color: string
}

/**
 * LineChart — responsive SVG bezier line chart with gradient fill and
 * dashed grid lines. Uses useId() to avoid duplicate gradient IDs when
 * rendered multiple times on the same page.
 */
export function LineChart({ data, color }: LineChartProps) {
    const gradientId = useId()

    const W = 600, H = 140, PX = 4, PY = 10
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1

    const toX = (i: number) => PX + (i / (data.length - 1)) * (W - PX * 2)
    const toY = (v: number) => PY + (1 - (v - min) / range) * (H - PY * 2)

    // Smooth cubic bezier path
    const linePath = data.reduce((acc, v, i) => {
        if (i === 0) return `M ${toX(i)} ${toY(v)}`
        const dx = toX(i) - toX(i - 1)
        return `${acc} C ${toX(i - 1) + dx / 2} ${toY(data[i - 1])} ${toX(i) - dx / 2} ${toY(v)} ${toX(i)} ${toY(v)}`
    }, "")

    const areaPath = `${linePath} L ${toX(data.length - 1)} ${H} L ${toX(0)} ${H} Z`

    const gridYs = [0, 0.25, 0.5, 0.75, 1].map(p => PY + p * (H - PY * 2))

    return (
        <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full"
            style={{ height: 140 }}
            preserveAspectRatio="none"
            aria-hidden
        >
            <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor={color} stopOpacity="0.18" />
                    <stop offset="100%" stopColor={color} stopOpacity="0.01" />
                </linearGradient>
            </defs>

            {/* Grid lines */}
            {gridYs.map((y, i) => (
                <line
                    key={i}
                    x1={PX} y1={y} x2={W - PX} y2={y}
                    stroke="currentColor"
                    strokeOpacity="0.25"
                    strokeWidth="0.6"
                    strokeDasharray="4,6"
                    className="text-border"
                />
            ))}

            {/* Area gradient fill */}
            <path d={areaPath} fill={`url(#${gradientId})`} />

            {/* Line */}
            <path d={linePath} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

            {/* End-point dot */}
            <circle cx={toX(data.length - 1)} cy={toY(data[data.length - 1])} r="4"  fill={color} />
            <circle cx={toX(data.length - 1)} cy={toY(data[data.length - 1])} r="8"  fill={color} fillOpacity="0.15" />
        </svg>
    )
}
