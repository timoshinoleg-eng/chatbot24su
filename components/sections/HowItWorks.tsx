"use client"

import { MessageSquare, Settings, Zap, BarChart3 } from "lucide-react"

const steps = [
  {
    icon: MessageSquare,
    step: "01",
    title: "Аудит и бриф",
    description: "Изучаем ваши процессы, источники заявок, боли и цели. Формируем техническое задание."
  },
  {
    icon: Settings,
    step: "02",
    title: "Настройка системы",
    description: "Создаём чат-бота, интегрируем с CRM и мессенджерами, настраиваем сценарии диалогов."
  },
  {
    icon: Zap,
    step: "03",
    title: "Запуск и тестирование",
    description: "Проводим тестовые диалоги, обучаем персонал, запускаем в боевой режим."
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Оптимизация",
    description: "Анализируем метрики, улучшаем сценарии, добавляем новые функции по мере роста."
  }
]

export default function HowItWorks() {
  return (
    <section id="how" className="section-landing bg-[#042f2e]/30">
      <div className="container-landing">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
            Как работаем
          </h2>
          <p className="text-lg text-white/65 max-w-2xl mx-auto">
            От первой встречи до запуска — 7-14 дней
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/[0.1] hover:bg-white/[0.06] hover:border-[#14b8a6]/30 transition-all duration-300"
            >
              <div className="text-5xl font-black text-white/5 absolute top-4 right-4">
                {item.step}
              </div>
              <div className="w-12 h-12 rounded-xl bg-[#14b8a6]/10 border border-[#14b8a6]/20 flex items-center justify-center mb-4">
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
