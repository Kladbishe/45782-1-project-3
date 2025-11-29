import { useEffect, useState } from "react";
import vacationsService from "../../services/vacations";
import type Vacation from "../../models/vacation";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import "./Statistics.css";

interface DestinationStat {
  destination: string;
  followers: number;
}

const COLORS = [
  "#0ea5e9",
  "#22c55e",
  "#a855f7",
  "#f97316",
  "#ec4899",
  "#eab308",
  "#14b8a6",
  "#6366f1",
  "#facc15",
  "#fb7185",
];

export default function Statistics() {
  const [stats, setStats] = useState<DestinationStat[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const vacations: Vacation[] = await vacationsService.getAll();

        const prepared: DestinationStat[] = vacations.map(v => ({
          destination: v.destination,
          followers: Number(v.likesCount || 0),
        }));

        setStats(prepared);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  function handleExportCsv() {
    if (!stats.length) return;

    let csv = "Destination,Followers\n";

    for (const row of stats) {
      const dest = `"${row.destination.replace(/"/g, '""')}"`;
      csv += `${dest},${row.followers}\n`;
    }

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "vacations-statistics.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="Statistics">
      <div className="Statistics-header">
        <h2 className="Statistics-title">Followers by destination</h2>

        <button
          className="Statistics-exportButton"
          onClick={handleExportCsv}
        >
          Export CSV
        </button>
      </div>

      <div className="Statistics-chartWrapper">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={stats}
            margin={{ top: 10, right: 16, left: 0, bottom: 32 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="destination"
              angle={-25}
              textAnchor="end"
              interval={0}
              height={60}
            />
            <YAxis allowDecimals={false} domain={[0, "dataMax + 1"]} />
            <Tooltip />
            <Bar dataKey="followers">
              {stats.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
