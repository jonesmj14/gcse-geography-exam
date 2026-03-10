import { useState, useEffect, useRef } from "react";

const TOPICS = {
  "The Changing Landscapes of the UK": {
    subtopics: ["UK rock types and landscapes", "Coastal landscapes", "River landscapes"],
    color: "#1a6b4a",
    icon: "🏔️"
  },
  "The Living World": {
    subtopics: ["Ecosystems", "Tropical rainforests", "Hot deserts"],
    color: "#b85c00",
    icon: "🌿"
  },
  "Coastal Change and Conflict": {
    subtopics: ["Coastal processes", "Coastal landforms", "Coastal management"],
    color: "#0a4a7a",
    icon: "🌊"
  },
  "River Processes and Pressures": {
    subtopics: ["River processes", "River landforms", "River flooding"],
    color: "#3a5a00",
    icon: "🏞️"
  },
  "Globalisation": {
    subtopics: ["Global connections", "TNCs", "India case study"],
    color: "#4a0a6a",
    icon: "🌐"
  },
  "Regenerating Places": {
    subtopics: ["Place identity", "Urban change", "Regeneration strategies"],
    color: "#6a2a00",
    icon: "🏙️"
  },
  "Superpowers": {
    subtopics: ["Superpower influence", "US & China", "Global governance"],
    color: "#1a1a6a",
    icon: "⚡"
  },
  "Migration, Identity and Sovereignty": {
    subtopics: ["Types of migration", "Migration impacts", "Brexit & sovereignty"],
    color: "#5a0a0a",
    icon: "🗺️"
  },
  "The Tectonic World": {
    subtopics: ["Plate tectonics", "Earthquakes", "Volcanoes"],
    color: "#6a1a00",
    icon: "🌋"
  },
  "Changing Weather & Climate": {
    subtopics: ["UK weather", "Climate change evidence", "Climate futures"],
    color: "#004a5a",
    icon: "☁️"
  },
};

const QUESTION_BANKS = {
  "Coastal Change and Conflict": [
    { q: "Describe the process of hydraulic action.", marks: 2, type: "describe", hint: "Think about the force of water..." },
    { q: "Explain how a headland and bay is formed.", marks: 4, type: "explain", hint: "Consider differential erosion rates..." },
    { q: "Assess the effectiveness of hard engineering strategies in managing coastal erosion.", marks: 8, type: "essay", hint: "Consider sea walls, groynes, rock armour..." },
    { q: "What is longshore drift?", marks: 2, type: "define", hint: "Movement of sediment..." },
    { q: "Explain the formation of a spit.", marks: 4, type: "explain", hint: "Where does deposition occur?" },
    { q: "To what extent is managed retreat a sustainable coastal management strategy?", marks: 8, type: "essay", hint: "Consider economic, social and environmental factors..." },
    { q: "Describe one characteristic of a wave-cut platform.", marks: 1, type: "describe" },
    { q: "Explain how caves, arches, stacks and stumps are formed.", marks: 6, type: "explain", hint: "Sequential formation process..." },
    { q: "'Soft engineering is always preferable to hard engineering in coastal management.' Do you agree?", marks: 8, type: "essay" },
  ],
  "River Processes and Pressures": [
    { q: "Define the term 'discharge'.", marks: 1, type: "define" },
    { q: "Describe how a waterfall is formed.", marks: 4, type: "describe", hint: "Think about resistant/less resistant rock..." },
    { q: "Explain why river flooding occurs.", marks: 4, type: "explain", hint: "Physical and human factors..." },
    { q: "Assess the success of flood management strategies.", marks: 8, type: "essay" },
    { q: "What is a floodplain?", marks: 2, type: "define" },
    { q: "Explain the formation of a meander.", marks: 4, type: "explain", hint: "Erosion on outer bend, deposition on inner bend..." },
    { q: "Describe the changes in a river from source to mouth.", marks: 4, type: "describe" },
  ],
  "The Living World": [
    { q: "What is a biome?", marks: 1, type: "define" },
    { q: "Describe the climate of a tropical rainforest.", marks: 2, type: "describe", hint: "Temperature and precipitation patterns..." },
    { q: "Explain how deforestation affects the water cycle in tropical rainforests.", marks: 4, type: "explain" },
    { q: "Assess the strategies used to manage tropical rainforests sustainably.", marks: 8, type: "essay" },
    { q: "Describe two adaptations of plants in hot deserts.", marks: 4, type: "describe", hint: "Cacti, succulents, deep roots..." },
    { q: "Explain why hot deserts are fragile ecosystems.", marks: 4, type: "explain" },
    { q: "'Economic development always damages tropical rainforests.' Do you agree?", marks: 8, type: "essay" },
  ],
  "Globalisation": [
    { q: "Define the term 'globalisation'.", marks: 1, type: "define" },
    { q: "Describe the role of TNCs in globalisation.", marks: 4, type: "describe", hint: "Production, employment, supply chains..." },
    { q: "Explain how globalisation has affected India.", marks: 6, type: "explain", hint: "IT sector, economic growth, inequality..." },
    { q: "Assess the advantages and disadvantages of globalisation for LICs.", marks: 8, type: "essay" },
    { q: "What is a global hub?", marks: 2, type: "define" },
    { q: "Explain two ways countries are interconnected.", marks: 4, type: "explain" },
  ],
  "Superpowers": [
    { q: "Define the term 'superpower'.", marks: 1, type: "define" },
    { q: "Explain two ways the USA maintains its global influence.", marks: 4, type: "explain", hint: "Military, economic, cultural..." },
    { q: "Describe how China's global influence has grown.", marks: 4, type: "describe" },
    { q: "Assess whether China will replace the USA as the world's leading superpower.", marks: 8, type: "essay" },
    { q: "What is meant by 'soft power'?", marks: 2, type: "define" },
    { q: "Explain the role of the UN in global governance.", marks: 4, type: "explain" },
  ],
  "The Tectonic World": [
    { q: "What is a tectonic plate?", marks: 1, type: "define" },
    { q: "Describe the distribution of earthquakes and volcanoes.", marks: 4, type: "describe", hint: "Plate boundaries, ring of fire..." },
    { q: "Explain why earthquakes in LICs cause more deaths than in HICs.", marks: 4, type: "explain" },
    { q: "Assess the responses to a named earthquake.", marks: 8, type: "essay" },
    { q: "Explain the formation of fold mountains.", marks: 4, type: "explain", hint: "Convergent plate boundary..." },
    { q: "Describe how a volcano erupts.", marks: 4, type: "describe" },
  ],
  "Changing Weather & Climate": [
    { q: "Define the term 'climate change'.", marks: 1, type: "define" },
    { q: "Describe the evidence for climate change.", marks: 4, type: "describe", hint: "Temperature records, ice cores, sea level..." },
    { q: "Explain the enhanced greenhouse effect.", marks: 4, type: "explain" },
    { q: "Assess the strategies used to manage climate change.", marks: 8, type: "essay" },
    { q: "What is the difference between weather and climate?", marks: 2, type: "define" },
    { q: "Explain two causes of climate change.", marks: 4, type: "explain" },
  ],
  "Regenerating Places": [
    { q: "What is meant by 'place identity'?", marks: 1, type: "define" },
    { q: "Describe how urban areas change over time.", marks: 4, type: "describe" },
    { q: "Explain why some places need regeneration.", marks: 4, type: "explain", hint: "Deindustrialisation, deprivation..." },
    { q: "Assess the success of a named urban regeneration project.", marks: 8, type: "essay" },
    { q: "What is urban sprawl?", marks: 2, type: "define" },
    { q: "Explain how rural areas can be regenerated.", marks: 4, type: "explain" },
  ],
  "Migration, Identity and Sovereignty": [
    { q: "Define the term 'refugee'.", marks: 1, type: "define" },
    { q: "Distinguish between economic migration and forced migration.", marks: 2, type: "describe" },
    { q: "Explain the causes of international migration.", marks: 4, type: "explain", hint: "Push and pull factors..." },
    { q: "Assess the impacts of migration on the host country.", marks: 8, type: "essay" },
    { q: "What is national sovereignty?", marks: 2, type: "define" },
    { q: "Explain how Brexit has affected the UK's relationship with the EU.", marks: 4, type: "explain" },
  ],
  "The Changing Landscapes of the UK": [
    { q: "Name two upland areas in the UK.", marks: 2, type: "recall" },
    { q: "Explain how geology influences UK landscapes.", marks: 4, type: "explain", hint: "Hard/soft rock, carboniferous limestone..." },
    { q: "Describe the characteristics of a lowland landscape.", marks: 4, type: "describe" },
    { q: "Assess the economic value of UK landscapes.", marks: 8, type: "essay" },
  ],
};

const MARK_SCHEME_TIPS = {
  1: "One clear, accurate point.",
  2: "Two developed points or one point with explanation.",
  4: "Two clear points, each explained and supported with an example. Use connectives like 'therefore', 'this means', 'as a result'.",
  6: "Three well-explained points with examples. Show understanding of processes and links.",
  8: "A balanced argument with points FOR and AGAINST. Use geographical terminology. Reach a clear conclusion. Consider economic, social and environmental dimensions.",
};

// --- Daily seed helpers ---
function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function seededRand(seed) {
  // Simple mulberry32 PRNG
  let s = seed;
  return function () {
    s |= 0; s = s + 0x6D2B79F5 | 0;
    let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function seededShuffle(arr, rand) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getDailySeed(selectedTopics) {
  const topicKey = selectedTopics.slice().sort().join("|");
  return hashString(getTodayString() + topicKey);
}

function getSecondsUntilMidnight() {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.floor((midnight - now) / 1000);
}

function formatCountdown(secs) {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = secs % 60;
  return `${h}h ${m.toString().padStart(2, "0")}m ${s.toString().padStart(2, "0")}s`;
}

function generateExam(selectedTopics) {
  const questions = [];
  const topicsToUse = selectedTopics.length > 0 ? selectedTopics : Object.keys(QUESTION_BANKS);
  const seed = getDailySeed(selectedTopics);
  const rand = seededRand(seed);

  const allQ = [];
  topicsToUse.forEach(topic => {
    const bank = QUESTION_BANKS[topic];
    if (bank) bank.forEach(q => allQ.push({ ...q, topic }));
  });

  const shuffled = seededShuffle(allQ, rand);
  let totalMarks = 0;

  for (const q of shuffled) {
    if (questions.length >= 7) break;
    if (questions.filter(x => x.marks === q.marks).length >= 2 && q.marks === 8) continue;
    questions.push(q);
    totalMarks += q.marks;
  }

  return { questions, totalMarks, date: getTodayString(), seed };
}

const typeColors = {
  define: "#0a4a7a",
  describe: "#1a6b4a",
  explain: "#b85c00",
  essay: "#4a0a6a",
  recall: "#3a5a00",
};

const typeLabels = {
  define: "Define",
  describe: "Describe",
  explain: "Explain",
  essay: "Extended Writing",
  recall: "Recall",
};

export default function GCSEGeographyApp() {
  const [screen, setScreen] = useState("home"); // home | setup | exam | results
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showHints, setShowHints] = useState({});
  const [showMarkScheme, setShowMarkScheme] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [examMode, setExamMode] = useState("practice"); // practice | timed
  const timerRef = useRef(null);
  const [countdown, setCountdown] = useState(getSecondsUntilMidnight());

  useEffect(() => {
    const id = setInterval(() => setCountdown(getSecondsUntilMidnight()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      setScreen("results");
    }
    return () => clearTimeout(timerRef.current);
  }, [timerActive, timeLeft]);

  function startExam() {
    const generated = generateExam(selectedTopics);
    setExam(generated);
    setAnswers({});
    setShowHints({});
    setShowMarkScheme(false);
    if (examMode === "timed") {
      setTimeLeft(generated.totalMarks * 60); // 1 min per mark
      setTimerActive(true);
    }
    setScreen("exam");
  }

  function toggleTopic(topic) {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  }

  function formatTime(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  const answeredCount = exam ? exam.questions.filter((_, i) => (answers[i] || "").trim().length > 0).length : 0;

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f5f0e8",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      position: "relative",
      overflowX: "hidden",
    }}>
      {/* Textured paper background */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(0,0,0,0.03) 27px, rgba(0,0,0,0.03) 28px)`,
      }} />

      {/* Header */}
      <header style={{
        background: "#1a3a2a",
        color: "#f5f0e8",
        padding: "0",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      }}>
        <div style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{
              width: 44, height: 44,
              background: "#c8a84b",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: "bold",
              color: "#1a3a2a",
              letterSpacing: -1,
              flexShrink: 0,
            }}>G</div>
            <div>
              <div style={{ fontSize: 18, fontWeight: "bold", letterSpacing: 0.5 }}>GCSE Geography</div>
              <div style={{ fontSize: 11, color: "#c8a84b", letterSpacing: 2, textTransform: "uppercase" }}>Edexcel A · Exam Generator</div>
            </div>
          </div>
          {screen !== "home" && (
            <button onClick={() => { setScreen("home"); setTimerActive(false); }} style={{
              background: "rgba(200,168,75,0.2)",
              border: "1px solid #c8a84b",
              color: "#c8a84b",
              padding: "8px 16px",
              borderRadius: 6,
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 13,
              letterSpacing: 1,
            }}>← Home</button>
          )}
          {screen === "exam" && timerActive && (
            <div style={{
              background: timeLeft < 120 ? "#7a1a1a" : "#2a4a3a",
              color: timeLeft < 120 ? "#ffaaaa" : "#aaffcc",
              padding: "8px 20px",
              borderRadius: 6,
              fontFamily: "monospace",
              fontSize: 20,
              fontWeight: "bold",
              letterSpacing: 2,
              border: `2px solid ${timeLeft < 120 ? "#ff6666" : "#44aa77"}`,
              animation: timeLeft < 60 ? "pulse 1s infinite" : "none",
            }}>{formatTime(timeLeft)}</div>
          )}
        </div>
      </header>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.6;} }
        .topic-card:hover { transform: translateY(-2px) !important; }
        .q-card { animation: fadeUp 0.4s ease both; }
        button:active { transform: scale(0.97); }
        textarea:focus { outline: none; border-color: #1a6b4a !important; box-shadow: 0 0 0 3px rgba(26,107,74,0.15) !important; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #e8e0d0; }
        ::-webkit-scrollbar-thumb { background: #1a3a2a; border-radius: 4px; }
      `}</style>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px", position: "relative", zIndex: 1 }}>

        {/* HOME */}
        {screen === "home" && (
          <div style={{ animation: "fadeUp 0.5s ease" }}>
            <div style={{
              textAlign: "center",
              marginBottom: 48,
              padding: "48px 32px",
              background: "white",
              borderRadius: 16,
              border: "2px solid #1a3a2a",
              boxShadow: "8px 8px 0 #1a3a2a",
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📐</div>
              <h1 style={{
                fontSize: 36, margin: "0 0 12px",
                color: "#1a3a2a", letterSpacing: -1, lineHeight: 1.1,
              }}>Geography Exam Generator</h1>
              <p style={{ color: "#555", fontSize: 16, maxWidth: 480, margin: "0 auto 20px", lineHeight: 1.7 }}>
                Practice with exam papers tailored to the <strong>Edexcel A GCSE Geography</strong> specification. A brand-new paper is generated every day automatically.
              </p>

              {/* Daily paper badge */}
              <div style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#f5f0e8",
                border: "2px solid #c8a84b",
                borderRadius: 12,
                padding: "14px 32px",
                marginBottom: 28,
                gap: 4,
              }}>
                <div style={{ fontSize: 11, color: "#999", letterSpacing: 2, textTransform: "uppercase" }}>Today's Paper</div>
                <div style={{ fontSize: 18, fontWeight: "bold", color: "#1a3a2a" }}>
                  {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                </div>
                <div style={{ fontSize: 12, color: "#b85c00", marginTop: 2 }}>
                  🔄 New paper in <strong style={{ fontFamily: "monospace" }}>{formatCountdown(countdown)}</strong>
                </div>
              </div>

              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => {
                  const g = generateExam([]);
                  setExam(g); setAnswers({}); setShowHints({}); setShowMarkScheme(false); setTimerActive(false);
                  setScreen("exam");
                }} style={{
                  background: "#1a3a2a",
                  color: "#f5f0e8",
                  border: "none",
                  padding: "16px 36px",
                  borderRadius: 8,
                  fontSize: 16,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  letterSpacing: 0.5,
                  fontWeight: "bold",
                  boxShadow: "4px 4px 0 #c8a84b",
                  transition: "all 0.15s",
                }}>📅 Start Today's Paper</button>
                <button onClick={() => setScreen("setup")} style={{
                  background: "white",
                  color: "#1a3a2a",
                  border: "2px solid #1a3a2a",
                  padding: "16px 28px",
                  borderRadius: 8,
                  fontSize: 16,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "all 0.15s",
                }}>⚙️ Custom Paper</button>
              </div>
            </div>

            {/* Features */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
              {[
                { icon: "📅", title: "Daily Paper", desc: "A new unique paper is generated every day using a date-based seed — same paper all day, different tomorrow." },
                { icon: "📋", title: "Real Exam Questions", desc: "Questions modelled on the Edexcel A specification mark schemes and command words." },
                { icon: "⏱️", title: "Timed & Practice Modes", desc: "Practice with unlimited time or simulate real exam conditions with a countdown." },
                { icon: "💡", title: "Hints & Mark Schemes", desc: "Get structured guidance on what examiners look for in each answer." },
              ].map((f, i) => (
                <div key={i} style={{
                  background: "white",
                  border: "1.5px solid #1a3a2a",
                  borderRadius: 12,
                  padding: "24px 20px",
                  animationDelay: `${i * 0.1}s`,
                  animation: "fadeUp 0.5s ease both",
                }}>
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{f.icon}</div>
                  <div style={{ fontWeight: "bold", color: "#1a3a2a", marginBottom: 6, fontSize: 15 }}>{f.title}</div>
                  <div style={{ color: "#666", fontSize: 13, lineHeight: 1.6 }}>{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SETUP */}
        {screen === "setup" && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <h2 style={{ color: "#1a3a2a", fontSize: 26, marginBottom: 8, letterSpacing: -0.5 }}>Configure Your Exam</h2>
            <p style={{ color: "#666", marginBottom: 32 }}>Select topics to include, or leave all unselected for a full mixed paper.</p>

            {/* Mode selector */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontWeight: "bold", color: "#1a3a2a", marginBottom: 12, fontSize: 15 }}>Exam Mode</div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {["practice", "timed"].map(mode => (
                  <button key={mode} onClick={() => setExamMode(mode)} style={{
                    padding: "10px 24px",
                    borderRadius: 8,
                    border: "2px solid #1a3a2a",
                    background: examMode === mode ? "#1a3a2a" : "white",
                    color: examMode === mode ? "white" : "#1a3a2a",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: 14,
                    fontWeight: "bold",
                    transition: "all 0.15s",
                  }}>
                    {mode === "practice" ? "📖 Practice Mode" : "⏱️ Timed Mode"}
                  </button>
                ))}
              </div>
              {examMode === "timed" && (
                <p style={{ color: "#b85c00", fontSize: 13, marginTop: 8 }}>
                  ⚡ Timed mode allocates 1 minute per mark — matching real exam conditions.
                </p>
              )}
            </div>

            {/* Topic grid */}
            <div style={{ fontWeight: "bold", color: "#1a3a2a", marginBottom: 12, fontSize: 15 }}>
              Topics {selectedTopics.length > 0 ? `(${selectedTopics.length} selected)` : "(all — click to filter)"}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14, marginBottom: 32 }}>
              {Object.entries(TOPICS).map(([topic, info]) => {
                const selected = selectedTopics.includes(topic);
                return (
                  <button key={topic} onClick={() => toggleTopic(topic)} className="topic-card" style={{
                    background: selected ? info.color : "white",
                    color: selected ? "white" : "#1a3a2a",
                    border: `2px solid ${info.color}`,
                    borderRadius: 10,
                    padding: "14px 16px",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    textAlign: "left",
                    transition: "all 0.2s",
                    boxShadow: selected ? `4px 4px 0 ${info.color}88` : "2px 2px 0 #d0c8b0",
                  }}>
                    <div style={{ fontSize: 20, marginBottom: 6 }}>{info.icon}</div>
                    <div style={{ fontWeight: "bold", fontSize: 13, lineHeight: 1.3 }}>{topic}</div>
                    <div style={{ fontSize: 11, opacity: 0.75, marginTop: 4 }}>{info.subtopics.join(" · ")}</div>
                  </button>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button onClick={startExam} style={{
                background: "#1a3a2a",
                color: "#f5f0e8",
                border: "none",
                padding: "16px 40px",
                borderRadius: 8,
                fontSize: 16,
                fontFamily: "inherit",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "4px 4px 0 #c8a84b",
                transition: "all 0.15s",
              }}>Generate Paper →</button>
              {selectedTopics.length > 0 && (
                <button onClick={() => setSelectedTopics([])} style={{
                  background: "transparent",
                  border: "2px solid #999",
                  color: "#666",
                  padding: "16px 24px",
                  borderRadius: 8,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  fontSize: 14,
                }}>Clear Selection</button>
              )}
            </div>
          </div>
        )}

        {/* EXAM */}
        {screen === "exam" && exam && (
          <div>
            {/* Exam header */}
            <div style={{
              background: "#1a3a2a",
              color: "white",
              borderRadius: 12,
              padding: "24px 28px",
              marginBottom: 32,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 16,
            }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 3, color: "#c8a84b", textTransform: "uppercase", marginBottom: 6 }}>Edexcel GCSE Geography A</div>
                <div style={{ fontSize: 20, fontWeight: "bold" }}>
                  {exam.date === getTodayString() ? "📅 Daily Paper" : "Custom Paper"}
                </div>
                <div style={{ fontSize: 13, color: "#aaa", marginTop: 4 }}>
                  {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · Answer all questions.
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 28, fontWeight: "bold", color: "#c8a84b" }}>{exam.totalMarks}</div>
                <div style={{ fontSize: 12, color: "#aaa" }}>Total Marks</div>
                <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>{answeredCount}/{exam.questions.length} answered</div>
              </div>
            </div>

            {exam.questions.map((q, i) => (
              <div key={i} className="q-card" style={{
                background: "white",
                borderRadius: 12,
                border: "1.5px solid #d0c8b0",
                marginBottom: 24,
                overflow: "hidden",
                animationDelay: `${i * 0.06}s`,
                boxShadow: "3px 3px 0 #d0c8b0",
              }}>
                {/* Question header */}
                <div style={{
                  background: "#f5f0e8",
                  borderBottom: "1.5px solid #d0c8b0",
                  padding: "14px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 10,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 32, height: 32,
                      background: "#1a3a2a",
                      color: "white",
                      borderRadius: 50,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 14, fontWeight: "bold", flexShrink: 0,
                    }}>{i + 1}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <span style={{
                        background: typeColors[q.type] || "#555",
                        color: "white",
                        fontSize: 11,
                        padding: "3px 10px",
                        borderRadius: 12,
                        letterSpacing: 0.5,
                      }}>{typeLabels[q.type]}</span>
                      <span style={{
                        background: "#e8e0d0",
                        color: "#555",
                        fontSize: 11,
                        padding: "3px 10px",
                        borderRadius: 12,
                      }}>{q.topic}</span>
                    </div>
                  </div>
                  <div style={{
                    background: "#1a3a2a",
                    color: "#c8a84b",
                    padding: "6px 14px",
                    borderRadius: 20,
                    fontWeight: "bold",
                    fontSize: 14,
                    fontFamily: "monospace",
                  }}>[{q.marks} {q.marks === 1 ? "mark" : "marks"}]</div>
                </div>

                {/* Question body */}
                <div style={{ padding: "20px 24px" }}>
                  <p style={{
                    fontSize: 16, lineHeight: 1.7, margin: "0 0 16px",
                    color: "#1a1a1a", fontWeight: "500",
                  }}>{q.q}</p>

                  {/* Hint */}
                  {q.hint && (
                    <div style={{ marginBottom: 16 }}>
                      {showHints[i] ? (
                        <div style={{
                          background: "#fff8e8",
                          border: "1.5px solid #c8a84b",
                          borderRadius: 8,
                          padding: "12px 16px",
                          fontSize: 13,
                          color: "#7a5a00",
                        }}>
                          <strong>💡 Hint:</strong> {q.hint}
                        </div>
                      ) : (
                        <button onClick={() => setShowHints(h => ({ ...h, [i]: true }))} style={{
                          background: "transparent",
                          border: "1.5px dashed #c8a84b",
                          color: "#c8a84b",
                          padding: "6px 16px",
                          borderRadius: 6,
                          fontSize: 12,
                          cursor: "pointer",
                          fontFamily: "inherit",
                        }}>💡 Show Hint</button>
                      )}
                    </div>
                  )}

                  {/* Answer area */}
                  <textarea
                    value={answers[i] || ""}
                    onChange={e => setAnswers(a => ({ ...a, [i]: e.target.value }))}
                    placeholder="Write your answer here..."
                    rows={q.marks <= 2 ? 3 : q.marks <= 4 ? 6 : 12}
                    style={{
                      width: "100%",
                      border: "1.5px solid #d0c8b0",
                      borderRadius: 8,
                      padding: "12px 16px",
                      fontSize: 14,
                      fontFamily: "'Georgia', serif",
                      lineHeight: 1.8,
                      resize: "vertical",
                      color: "#1a1a1a",
                      background: "#fdfcfa",
                      boxSizing: "border-box",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                  />

                  {/* Mark scheme tip */}
                  <div style={{
                    marginTop: 10,
                    fontSize: 12,
                    color: "#888",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 6,
                  }}>
                    <span style={{ color: "#1a6b4a" }}>✓</span>
                    <span>{MARK_SCHEME_TIPS[q.marks] || "Aim for clear, developed points with examples."}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Submit bar */}
            <div style={{
              background: "white",
              border: "2px solid #1a3a2a",
              borderRadius: 12,
              padding: "24px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
              boxShadow: "4px 4px 0 #1a3a2a",
            }}>
              <div>
                <div style={{ fontWeight: "bold", color: "#1a3a2a" }}>
                  {answeredCount === exam.questions.length ? "✅ All questions answered!" : `${answeredCount}/${exam.questions.length} questions answered`}
                </div>
                <div style={{ color: "#888", fontSize: 13, marginTop: 4 }}>Review your answers and check the mark guide below</div>
              </div>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button onClick={() => setShowMarkScheme(s => !s)} style={{
                  background: showMarkScheme ? "#f5f0e8" : "white",
                  border: "2px solid #1a3a2a",
                  color: "#1a3a2a",
                  padding: "12px 24px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: 14,
                  fontWeight: "bold",
                }}>📋 {showMarkScheme ? "Hide" : "Show"} Mark Guide</button>
                <button onClick={() => { setTimerActive(false); setScreen("results"); }} style={{
                  background: "#1a3a2a",
                  color: "#f5f0e8",
                  border: "none",
                  padding: "12px 28px",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontSize: 14,
                  fontWeight: "bold",
                  boxShadow: "3px 3px 0 #c8a84b",
                }}>Finish Paper →</button>
              </div>
            </div>

            {/* Mark scheme panel */}
            {showMarkScheme && (
              <div style={{
                marginTop: 24,
                background: "#f0f8f0",
                border: "1.5px solid #1a6b4a",
                borderRadius: 12,
                padding: "24px 28px",
                animation: "fadeUp 0.3s ease",
              }}>
                <h3 style={{ color: "#1a3a2a", marginTop: 0 }}>📋 Examiner's Mark Guide</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                  {exam.questions.map((q, i) => (
                    <div key={i} style={{
                      background: "white",
                      border: "1px solid #c0d8c0",
                      borderRadius: 8,
                      padding: "14px 16px",
                    }}>
                      <div style={{ fontWeight: "bold", color: "#1a3a2a", fontSize: 13, marginBottom: 6 }}>
                        Q{i + 1} [{q.marks} {q.marks === 1 ? "mark" : "marks"}]
                      </div>
                      <div style={{ fontSize: 12, color: "#444", lineHeight: 1.6 }}>
                        {MARK_SCHEME_TIPS[q.marks] || "Clear, accurate points with examples."}
                      </div>
                      {q.hint && (
                        <div style={{ fontSize: 12, color: "#1a6b4a", marginTop: 6 }}>
                          Key ideas: {q.hint}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* RESULTS */}
        {screen === "results" && exam && (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <div style={{
              background: "#1a3a2a",
              color: "white",
              borderRadius: 16,
              padding: "40px 32px",
              textAlign: "center",
              marginBottom: 32,
              boxShadow: "6px 6px 0 #c8a84b",
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
              <h2 style={{ fontSize: 28, margin: "0 0 8px", letterSpacing: -0.5 }}>Paper Complete!</h2>
              <p style={{ color: "#aaa", margin: "0 0 16px" }}>
                You answered {answeredCount} of {exam.questions.length} questions ({exam.totalMarks} marks available)
              </p>
              <div style={{ fontSize: 13, color: "#c8a84b", marginBottom: 24 }}>
                🔄 New daily paper in <strong style={{ fontFamily: "monospace" }}>{formatCountdown(countdown)}</strong>
              </div>
              <div style={{
                display: "inline-block",
                background: "#c8a84b",
                color: "#1a3a2a",
                padding: "16px 40px",
                borderRadius: 8,
                fontSize: 20,
                fontWeight: "bold",
              }}>
                {Math.round((answeredCount / exam.questions.length) * 100)}% Completion Rate
              </div>
            </div>

            {/* Q&A review */}
            <h3 style={{ color: "#1a3a2a", marginBottom: 20 }}>Your Answers</h3>
            {exam.questions.map((q, i) => (
              <div key={i} style={{
                background: "white",
                border: "1.5px solid #d0c8b0",
                borderRadius: 12,
                marginBottom: 20,
                overflow: "hidden",
                animationDelay: `${i * 0.05}s`,
                animation: "fadeUp 0.4s ease both",
              }}>
                <div style={{
                  background: "#f5f0e8",
                  borderBottom: "1px solid #d0c8b0",
                  padding: "12px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <span style={{ fontWeight: "bold", color: "#1a3a2a", fontSize: 14 }}>
                    Q{i + 1}: {q.topic} — [{q.marks} {q.marks === 1 ? "mark" : "marks"}]
                  </span>
                  <span style={{
                    fontSize: 12,
                    color: (answers[i] || "").trim() ? "#1a6b4a" : "#b85c00",
                    fontWeight: "bold",
                  }}>{(answers[i] || "").trim() ? "✓ Answered" : "○ Not answered"}</span>
                </div>
                <div style={{ padding: "16px 20px" }}>
                  <p style={{ margin: "0 0 12px", fontWeight: "500", color: "#1a1a1a", fontSize: 15 }}>{q.q}</p>
                  <div style={{
                    background: (answers[i] || "").trim() ? "#f0f8f0" : "#fdf0f0",
                    border: `1px solid ${(answers[i] || "").trim() ? "#c0d8c0" : "#e0c0c0"}`,
                    borderRadius: 8,
                    padding: "12px 16px",
                    fontSize: 14,
                    color: "#333",
                    lineHeight: 1.7,
                    minHeight: 60,
                    fontStyle: (answers[i] || "").trim() ? "normal" : "italic",
                  }}>
                    {(answers[i] || "").trim() || "No answer provided."}
                  </div>
                  <div style={{ marginTop: 10, fontSize: 12, color: "#666", background: "#f9f6f0", padding: "8px 12px", borderRadius: 6 }}>
                    <strong style={{ color: "#1a3a2a" }}>Mark guide:</strong> {MARK_SCHEME_TIPS[q.marks]}
                    {q.hint && <span style={{ color: "#b85c00" }}> Key ideas: {q.hint}</span>}
                  </div>
                </div>
              </div>
            ))}

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 12 }}>
              <button onClick={() => { startExam(); }} style={{
                background: "#1a3a2a",
                color: "#f5f0e8",
                border: "none",
                padding: "14px 32px",
                borderRadius: 8,
                fontSize: 15,
                fontFamily: "inherit",
                cursor: "pointer",
                fontWeight: "bold",
                boxShadow: "4px 4px 0 #c8a84b",
              }}>🔄 Retry Today's Paper</button>
              <button onClick={() => setScreen("setup")} style={{
                background: "white",
                border: "2px solid #1a3a2a",
                color: "#1a3a2a",
                padding: "14px 28px",
                borderRadius: 8,
                fontSize: 15,
                fontFamily: "inherit",
                cursor: "pointer",
                fontWeight: "bold",
              }}>⚙️ Change Topics</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
