"use client"

import { Send, Mail, Phone } from "lucide-react"

const footerLinks = [
  {
    title: "Навигация",
    links: [
      { label: "Проблемы", href: "#problems" },
      { label: "Как работает", href: "#how" },
      { label: "Тарифы", href: "#pricing" },
      { label: "Кейсы", href: "#cases" },
      { label: "FAQ", href: "#faq" },
    ]
  },
  {
    title: "Услуги",
    links: [
      { label: "Чат-боты", href: "#" },
      { label: "CRM-интеграции", href: "#" },
      { label: "Автоматизация", href: "#" },
      { label: "AI-ассистенты", href: "#" },
    ]
  },
  {
    title: "Контакты",
    links: [
      { label: "Telegram", href: "https://t.me/ChatBot24su_bot" },
      { label: "Email", href: "mailto:info@chatbot24.su" },
      { label: "Телефон", href: "tel:+74951234567" },
    ]
  }
]

export default function Footer() {
  return (
    <footer className="bg-[#021c1b] border-t border-white/[0.1]">
      <div className="container-landing py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <a href="#" className="flex items-center gap-2.5 text-white font-bold text-lg mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#14b8a6] flex items-center justify-center">
                <span className="text-white font-black text-sm">B24</span>
              </div>
              <span>ChatBot24</span>
            </a>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Инженерное бюро автоматизации. Запускаем чат-ботов и системы обработки заявок для бизнеса.
            </p>
            <a
              href="https://t.me/ChatBot24su_bot?start=landing"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#14b8a6] hover:text-[#2dd4bf] transition-colors"
            >
              <Send className="w-4 h-4" />
              Написать в Telegram
            </a>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-semibold text-white mb-4">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-[#14b8a6] transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/[0.1] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2025 ChatBot24. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/40 hover:text-white/60 text-sm transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-white/40 hover:text-white/60 text-sm transition-colors">
              Договор оферты
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
