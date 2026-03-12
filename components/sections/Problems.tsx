"use client"

import { AlertCircle, Clock, MessageSquare, TrendingDown } from "lucide-react"

const problems = [
  {
    icon: Clock,
    title: "Заявки теряются",
    description: "Клиенты пишут в разные каналы, сообщения затерялись, ответили слишком поздно"
  },
  {
    icon: MessageSquare,
    title: "Рутина отнимает время",
    description: "Менеджеры тратят 70% времени на одни и те же вопросы вместо продаж"
  },
  {
    icon: TrendingDown,
    title: "Нет контроля качества",
    description: "Не понятно, сколько заявок обработано, какая конверсия, где узкие места"
  },
  {
    icon: AlertCircle,
    title: "Сложно масштабироваться",
    description: "При росте потока приходится срочно нанимать людей и тратить на это ресурсы"
  }
]

export default function Problems() {
  return (
    <section id="problems" className="section-landing">
      <div className="container-landing">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
            Проблемы, которые решаем
          </h2>
          <p className="text-lg text-white/65 max-w-2xl mx-auto">
            Если вы столкнулись хотя бы с двумя — пора автоматизировать
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.1] hover:bg-white/[0.06] hover:border-[#14b8a6]/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <problem.icon className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">{problem.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{problem.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
