import { useEffect, useState } from "react";

type Event =
  | { t: number; type: "system" | "ai" | "customer"; text: string }
  | { t: number; type: "backend"; action: string; result: string };

export default function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [timeline, setTimeline] = useState<Event[]>([]);

  // Load scenario from GitHub
  useEffect(() => {
    fetch(import.meta.env.BASE_URL + "src/scenarios/outage_zone7.json")
      .then((res) => res.json())
      .then(setEvents);
  }, []);

  // Play events over time
  useEffect(() => {
    if (!events.length) return;

    events.forEach((event) => {
      setTimeout(() => {
        setTimeline((prev) => [...prev, event]);
      }, event.t * 1000);
    });
  }, [events]);

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h2>Agentic AI — Network Issue Simulation</h2>

      <div style={{ marginTop: 16 }}>
        {timeline.map((e, i) => (
          <div key={i} style={{ marginBottom: 8 }}>
            <strong>[{e.type}]</strong>{" "}
            {"text" in e ? e.text : `${e.action}: ${e.result}`}
          </div>
        ))}
      </div>
    </div>
  );
}
