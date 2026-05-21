"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import {
  CHART_COLORS,
  type ChartDatum,
  type ChartSpec,
  formatValue,
} from "@/lib/chart-types";

interface Props {
  spec: ChartSpec;
}

const AXIS_STYLE = {
  fill: CHART_COLORS.ink,
  fontSize: 12,
  fontFamily: "Georgia, 'Times New Roman', serif",
};

const GRID_STYLE = {
  stroke: "#d8d0c0",
  strokeDasharray: "2 4",
};

export function CompareChart({ spec }: Props) {
  return (
    <figure className="compare-chart">
      <figcaption className="compare-chart-caption">
        <strong className="compare-chart-title">{spec.title}</strong>
        {spec.subtitle ? (
          <span className="compare-chart-subtitle">{spec.subtitle}</span>
        ) : null}
      </figcaption>
      <div className="compare-chart-canvas">
        <ChartBody spec={spec} />
      </div>
      {spec.source ? (
        <div className="compare-chart-source">
          Data:{" "}
          {spec.sourceUrl ? (
            <a href={spec.sourceUrl} target="_blank" rel="noopener noreferrer">
              {spec.source}
            </a>
          ) : (
            <span>{spec.source}</span>
          )}
          {spec.lastVerified ? (
            <span className="compare-chart-verified">
              {" "}· verified {spec.lastVerified}
            </span>
          ) : null}
        </div>
      ) : null}
    </figure>
  );
}

function ChartBody({ spec }: Props) {
  switch (spec.type) {
    case "hbar":
      return <HBar spec={spec} />;
    case "bar":
      return <VBar spec={spec} />;
    case "grouped-bar":
      return <GroupedBar spec={spec} />;
    case "line":
      return <LineSeries spec={spec} />;
    case "scatter":
      return <ScatterSeries spec={spec} />;
    case "radar":
      return <RadarSeries spec={spec} />;
    case "dot":
      return <DotPlot spec={spec} />;
    default:
      return <div>Unsupported chart type: {spec.type}</div>;
  }
}

function flatten(spec: ChartSpec): (ChartDatum & { series: string })[] {
  return spec.series.flatMap((s) =>
    s.data.map((d) => ({ ...d, series: s.name })),
  );
}

function HBar({ spec }: Props) {
  const data = spec.series[0]?.data ?? [];
  return (
    <ResponsiveContainer width="100%" height={Math.max(180, data.length * 34)}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 8, right: 24, bottom: 8, left: 8 }}
      >
        <CartesianGrid {...GRID_STYLE} horizontal={false} />
        <XAxis
          type="number"
          tickFormatter={(v) => formatValue(v, spec.xFormat)}
          tick={AXIS_STYLE}
          stroke={CHART_COLORS.ink}
        />
        <YAxis
          type="category"
          dataKey="x"
          tick={AXIS_STYLE}
          stroke={CHART_COLORS.ink}
          width={160}
        />
        <Tooltip
          formatter={(v) => formatValue(Number(v), spec.xFormat)}
          cursor={{ fill: "rgba(245,196,0,0.12)" }}
        />
        <Bar dataKey="y" fill={CHART_COLORS.ink}>
          {data.map((d, i) => (
            <Cell
              key={i}
              fill={
                spec.highlight !== undefined && d.x === spec.highlight
                  ? CHART_COLORS.accent
                  : CHART_COLORS.ink
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function VBar({ spec }: Props) {
  const data = spec.series[0]?.data ?? [];
  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} margin={{ top: 8, right: 16, bottom: 32, left: 8 }}>
        <CartesianGrid {...GRID_STYLE} vertical={false} />
        <XAxis
          dataKey="x"
          tick={AXIS_STYLE}
          stroke={CHART_COLORS.ink}
          angle={-25}
          textAnchor="end"
          interval={0}
          height={60}
        />
        <YAxis
          tickFormatter={(v) => formatValue(v, spec.yFormat)}
          tick={AXIS_STYLE}
          stroke={CHART_COLORS.ink}
        />
        <Tooltip
          formatter={(v) => formatValue(Number(v), spec.yFormat)}
          cursor={{ fill: "rgba(245,196,0,0.12)" }}
        />
        <Bar dataKey="y" fill={CHART_COLORS.ink}>
          {data.map((d, i) => (
            <Cell
              key={i}
              fill={
                spec.highlight !== undefined && d.x === spec.highlight
                  ? CHART_COLORS.accent
                  : CHART_COLORS.ink
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

function GroupedBar({ spec }: Props) {
  // Pivot series-of-data into per-x rows: [{ x: "GPT-5.5", input: 2, output: 11.3 }, ...]
  const xs = Array.from(
    new Set(spec.series.flatMap((s) => s.data.map((d) => String(d.x)))),
  );
  const rows = xs.map((x) => {
    const row: Record<string, string | number> = { x };
    for (const s of spec.series) {
      const match = s.data.find((d) => String(d.x) === x);
      if (match) row[s.name] = match.y;
    }
    return row;
  });

  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart data={rows} margin={{ top: 8, right: 16, bottom: 40, left: 8 }}>
        <CartesianGrid {...GRID_STYLE} vertical={false} />
        <XAxis
          dataKey="x"
          tick={AXIS_STYLE}
          stroke={CHART_COLORS.ink}
          angle={-20}
          textAnchor="end"
          interval={0}
          height={60}
        />
        <YAxis
          tickFormatter={(v) => formatValue(v, spec.yFormat)}
          tick={AXIS_STYLE}
          stroke={CHART_COLORS.ink}
        />
        <Tooltip
          formatter={(v) => formatValue(Number(v), spec.yFormat)}
          cursor={{ fill: "rgba(245,196,0,0.08)" }}
        />
        <Legend wrapperStyle={{ fontFamily: "Georgia, serif", fontSize: 12 }} />
        {spec.series.map((s, i) => (
          <Bar
            key={s.name}
            dataKey={s.name}
            fill={s.color ?? CHART_COLORS.series[i % CHART_COLORS.series.length]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

function LineSeries({ spec }: Props) {
  const xs = Array.from(
    new Set(spec.series.flatMap((s) => s.data.map((d) => String(d.x)))),
  );
  const rows = xs.map((x) => {
    const row: Record<string, string | number> = { x };
    for (const s of spec.series) {
      const match = s.data.find((d) => String(d.x) === x);
      if (match) row[s.name] = match.y;
    }
    return row;
  });

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={rows} margin={{ top: 8, right: 16, bottom: 8, left: 8 }}>
        <CartesianGrid {...GRID_STYLE} />
        <XAxis dataKey="x" tick={AXIS_STYLE} stroke={CHART_COLORS.ink} />
        <YAxis
          tickFormatter={(v) => formatValue(v, spec.yFormat)}
          tick={AXIS_STYLE}
          stroke={CHART_COLORS.ink}
        />
        <Tooltip formatter={(v) => formatValue(Number(v), spec.yFormat)} />
        <Legend wrapperStyle={{ fontFamily: "Georgia, serif", fontSize: 12 }} />
        {spec.series.map((s, i) => (
          <Line
            key={s.name}
            type="monotone"
            dataKey={s.name}
            stroke={s.color ?? CHART_COLORS.series[i % CHART_COLORS.series.length]}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

function ScatterSeries({ spec }: Props) {
  const flat = flatten(spec);
  return (
    <ResponsiveContainer width="100%" height={360}>
      <ScatterChart margin={{ top: 16, right: 16, bottom: 40, left: 8 }}>
        <CartesianGrid {...GRID_STYLE} />
        <XAxis
          type="number"
          dataKey="x"
          name={spec.xLabel ?? "x"}
          tick={AXIS_STYLE}
          stroke={CHART_COLORS.ink}
          tickFormatter={(v) => formatValue(v, spec.xFormat)}
          label={
            spec.xLabel
              ? {
                  value: spec.xLabel,
                  position: "bottom",
                  fill: CHART_COLORS.muted,
                  fontSize: 11,
                }
              : undefined
          }
        />
        <YAxis
          type="number"
          dataKey="y"
          name={spec.yLabel ?? "y"}
          tick={AXIS_STYLE}
          stroke={CHART_COLORS.ink}
          tickFormatter={(v) => formatValue(v, spec.yFormat)}
          label={
            spec.yLabel
              ? {
                  value: spec.yLabel,
                  angle: -90,
                  position: "insideLeft",
                  fill: CHART_COLORS.muted,
                  fontSize: 11,
                }
              : undefined
          }
        />
        <ZAxis range={[80, 80]} />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          formatter={(v, n) => formatValue(Number(v), n === (spec.xLabel ?? "x") ? spec.xFormat : spec.yFormat)}
          labelFormatter={() => ""}
          contentStyle={{
            fontFamily: "Georgia, serif",
            fontSize: 12,
            background: CHART_COLORS.paper,
            border: `1px solid ${CHART_COLORS.ink}`,
          }}
        />
        <Scatter data={flat} fill={CHART_COLORS.ink}>
          {flat.map((d, i) => (
            <Cell
              key={i}
              fill={
                spec.highlight !== undefined && d.label === spec.highlight
                  ? CHART_COLORS.accent
                  : CHART_COLORS.ink
              }
            />
          ))}
          <LabelList
            dataKey="label"
            position="top"
            offset={8}
            style={{
              fill: CHART_COLORS.ink,
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontSize: 11,
            }}
          />
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}

function RadarSeries({ spec }: Props) {
  const axes = Array.from(
    new Set(spec.series.flatMap((s) => s.data.map((d) => String(d.x)))),
  );
  const rows = axes.map((axis) => {
    const row: Record<string, string | number> = { axis };
    for (const s of spec.series) {
      const match = s.data.find((d) => String(d.x) === axis);
      if (match) row[s.name] = match.y;
    }
    return row;
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RadarChart data={rows} outerRadius="75%">
        <PolarGrid stroke="#d8d0c0" />
        <PolarAngleAxis dataKey="axis" tick={AXIS_STYLE} />
        <PolarRadiusAxis tick={{ ...AXIS_STYLE, fontSize: 10 }} />
        <Tooltip formatter={(v) => formatValue(Number(v), spec.yFormat)} />
        <Legend wrapperStyle={{ fontFamily: "Georgia, serif", fontSize: 12 }} />
        {spec.series.map((s, i) => (
          <Radar
            key={s.name}
            name={s.name}
            dataKey={s.name}
            stroke={s.color ?? CHART_COLORS.series[i % CHART_COLORS.series.length]}
            fill={s.color ?? CHART_COLORS.series[i % CHART_COLORS.series.length]}
            fillOpacity={0.25}
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  );
}

function DotPlot({ spec }: Props) {
  const data = spec.series[0]?.data ?? [];
  return (
    <ResponsiveContainer width="100%" height={Math.max(140, data.length * 28)}>
      <ScatterChart
        margin={{ top: 8, right: 24, bottom: 8, left: 8 }}
        layout="vertical"
      >
        <CartesianGrid {...GRID_STYLE} horizontal={false} />
        <XAxis
          type="number"
          dataKey="y"
          tick={AXIS_STYLE}
          stroke={CHART_COLORS.ink}
          tickFormatter={(v) => formatValue(v, spec.yFormat)}
        />
        <YAxis
          type="category"
          dataKey="x"
          tick={AXIS_STYLE}
          stroke={CHART_COLORS.ink}
          width={160}
        />
        <Tooltip formatter={(v) => formatValue(Number(v), spec.yFormat)} />
        <Scatter data={data} fill={CHART_COLORS.ink}>
          {data.map((d, i) => (
            <Cell
              key={i}
              fill={
                spec.highlight !== undefined && d.x === spec.highlight
                  ? CHART_COLORS.accent
                  : CHART_COLORS.ink
              }
            />
          ))}
        </Scatter>
      </ScatterChart>
    </ResponsiveContainer>
  );
}
