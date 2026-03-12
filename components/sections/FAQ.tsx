"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "Сколько времени занимает запуск?",
    answer: "Средний срок запуска — 7-14 дней. MVP-бот готов за 5-7 дней, комплексные решения с интеграциями — 2-3 недели."
  },
  {
    question: "Какие мессенджеры поддерживаются?",
    answer: "Telegram, WhatsApp, Instagram Direct, ВКонтакте, Facebook Messenger. Также интегрируем с виджетами на сайте."
  },
  {
    question: "Нужно ли обучать бота?",
    answer: "Мы настраиваем базовые сценарии перед запуском. После запуска бот обучается на реальных диалогах и становится умнее."
  },
  {
    question: "Как подключается CRM?",
    answer: "Интегрируем с amoCRM, Битрикс24, retailCRM и другими системами. Заявки автоматически попадают в воронку продаж."
  },
  {
    question: "Что входит в стоимость?",
    answer: "Разработка, настройка интеграций, запуск, обучение команды и 30 дней поддержки. Абонентская плата за хостинг — от 1 990 ₽/мес."
  },
  {
    question: "Можно ли доработать бота позже?",
    answer: "Да, мы предлагаем пакеты доработок и абонентское обслуживание с приоритетной поддержкой."
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="section-landing bg-[#042f2e]/30">
      <div className="container-landing">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
            Частые вопросы
          </h2>
          <p className="text-lg text-white/65 max-w-2xl mx-auto">
            Ответы на популярные вопросы о внедрении чат-ботов
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white/[0.03] border border-white/[0.1] overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="font-semibold text-white pr-4">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-[#14b8a6] flex-shrink-0 transition-transform duration-200",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <p className="px-6 pb-6 text-white/60 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
