"use client"

import { Bot, Zap, Shield, Clock, Users, LineChart } from "lucide-react"

const advantages = [
  {
    icon: Bot,
    title: "AI-ядро",
    description: "Современные языковые модели для понимания контекста и естественных диалогов"
  },
  {
    icon: Zap,
    title: "Быстрая интеграция",
    description: "Подключаем к Telegram, WhatsApp, Instagram и CRM за 3-5 дней"
  },
  {
    icon: Shield,
    title: "Безопасность",
    description: "Шифрование данных, соответствие 152-ФЗ, защита коммерческой тайны"
  },
  {
    icon: Clock,
    title: "24/7 работа",
    description: "Бот отвечает мгновенно в любое время, без выходных и перерывов"
  },
  {
    icon: Users,
    title: "Масштабируемость",
    description: "От 10 до 10 000+ обращений в день без потери качества"
  },
  {
    icon: LineChart,
    title: "Аналитика",
    description: "Понятные дашборды с метриками эффективности и ROI"
  }
]

export default function Advantages() {
  return (
    <section className="section-landing bg-[#042f2e]/30">
      <div className="container-landing">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
            Почему выбирают нас
          </h2>
          <p className="text-lg text-white/65 max-w-2xl mx-auto">
            Инженерный подход к автоматизации бизнес-процессов
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {advantages.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.1] hover:bg-white/[0.06] hover:border-[#14b8a6]/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[#14b8a6]/10 border border-[#14b8a6]/20 flex items-center justify-center mb-4 group-hover:bg-[#14b8a6]/20 transition-colors">
                <item.icon className="w-6 h-6 text-[#14b8a6]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
