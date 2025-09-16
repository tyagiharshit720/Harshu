"use client"

export default function TimelineOfUs() {
  const milestones = [
    {
      date: "First Meeting",
      title: "The Day We Met",
      description: "When our eyes first met, I knew something magical was beginning",
      icon: "👀",
    },
    {
      date: "First Date",
      title: "Our First Date",
      description: "Nervous butterflies, endless conversations, and the start of forever",
      icon: "💕",
    },
    {
      date: "First Kiss",
      title: "Our First Kiss",
      description: "Time stopped, the world disappeared, and it was just us",
      icon: "💋",
    },
    {
      date: "I Love You",
      title: "First 'I Love You'",
      description: "Three words that changed everything and made us complete",
      icon: "❤️",
    },
    {
      date: "Today",
      title: "Every Day Since",
      description: "Each moment with you is a new favorite memory",
      icon: "🌟",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-primary mb-8 glow-text">Timeline of Us 💖</h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-300 to-red-300 rounded-full"></div>

        {milestones.map((milestone, index) => (
          <div key={index} className={`flex items-center mb-8 ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
            <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border-2 border-pink-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="text-sm text-muted-foreground font-semibold mb-1">{milestone.date}</div>
                <h3 className="text-lg font-bold text-primary mb-2">{milestone.title}</h3>
                <p className="text-sm text-muted-foreground">{milestone.description}</p>
              </div>
            </div>

            {/* Timeline dot */}
            <div className="relative z-10 w-12 h-12 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center text-white text-xl shadow-lg">
              {milestone.icon}
            </div>

            <div className="w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
