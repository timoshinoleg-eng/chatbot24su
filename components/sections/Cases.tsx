"use client"

import { Building2, ShoppingBag, GraduationCap, Stethoscope } from "lucide-react"

const cases = [
  {
    icon: Building2,
    industry: "Недвижимость",
    title: "Агентство элитной недвижимости",
    metrics: [
      { value: "70%", label: "заявок обрабатывает бот" },
      { value: "3x", label: "рост конверсии" },
      { value: "40 часов", label: "экономия в месяц" }
    ],
    description: "Автоматизировали первичную квалификацию клиентов, интегрировали с amoCRM."
  },
  {
    icon: ShoppingBag,
    industry: "Ритейл",
    title: "Сеть магазинов одежды",
    metrics: [
      { value: "500+", label: "диалогов в день" },
      { value: "2 сек", label: "время ответа" },
      { value: "+35%", label: "к продажам" }
    ],
    description: "Чат-бот консультирует по ассортименту, проверяет наличие и принимает заказы."
  },
  {
    icon: GraduationCap,
    industry: "Образование",
    title: "Онлайн-школа программирования",
    metrics: [
      { value: "80%", label: "FAQ закрывает бот" },
      { value: "24/7", label: "поддержка" },
      { value: "-50%", label: "нагрузка на менеджеров" }
    ],
    description: "Автоматическая запись на пробные уроки, ответы на вопросы, напоминания."
  },
  {
    icon: Stethoscope,
    industry: "Медицина",
    title: "Сеть стоматологических клиник",
    metrics: [
      { value: "200+", label: "записей в день" },
      { value: "95%", label: "точность диалогов" },
      { value: "+28%", label: "повторные визиты" }
    ],
    description: "Запись на приём, предоперационные консультации, напоминания о визитах."
  }
]

export default function Cases() {
  return (
    <section id="cases" className="section-landing">
      <div className="container-landing">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
            Кейсы
          </h2>
          <p className="text-lg text-white/65 max-w-2xl mx-auto">
            Реальные результаты наших клиентов
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {cases.map((item) => (
            <div
              key={item.title}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.1] hover:bg-white/[0.06] hover:border-[#14b8a6]/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#14b8a6]/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[#14b8a6]" />
                </div>
                <div>
                  <span className="text-xs text-[#14b8a6] font-medium">{item.industry}</span>
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                {item.metrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <div className="text-xl font-bold text-[#14b8a6]">{metric.value}</div>
                    <div className="text-xs text-white/50">{metric.label}</div>
                  </div>
                ))}
              </div>

              <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
