"use client"

import React, { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, User, Bot } from "lucide-react"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface LeadData {
  name: string
  phone: string
  company: string
  message: string
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState<"chat" | "name" | "phone" | "company" | "message" | "complete">("chat")
  const [leadData, setLeadData] = useState<Partial<LeadData>>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: "Здравствуйте! 👋\n\nЯ помогу вам с расчётом стоимости чат-бота для вашего бизнеса.\n\nЧем могу помочь?",
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, messages.length])

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Handle form flow
    if (step === "name") {
      setLeadData((prev) => ({ ...prev, name: content }))
      setStep("phone")
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot_${Date.now()}`,
            role: "assistant",
            content: "Спасибо! Теперь укажите ваш телефон для связи:",
            timestamp: new Date(),
          },
        ])
        setIsLoading(false)
      }, 500)
      return
    }

    if (step === "phone") {
      setLeadData((prev) => ({ ...prev, phone: content }))
      setStep("company")
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot_${Date.now()}`,
            role: "assistant",
            content: "Отлично! Как называется ваша компания или сфера бизнеса?",
            timestamp: new Date(),
          },
        ])
        setIsLoading(false)
      }, 500)
      return
    }

    if (step === "company") {
      setLeadData((prev) => ({ ...prev, company: content }))
      setStep("message")
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot_${Date.now()}`,
            role: "assistant",
            content: "Расскажите кратко о задаче: сколько заявок в день, какие каналы связи используете, что нужно автоматизировать?",
            timestamp: new Date(),
          },
        ])
        setIsLoading(false)
      }, 500)
      return
    }

    if (step === "message") {
      const finalLeadData = { ...leadData, message: content }
      setLeadData(finalLeadData)
      setStep("complete")
      
      // Send lead to API
      try {
        const response = await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(finalLeadData),
        })
        
        if (response.ok) {
          setMessages((prev) => [
            ...prev,
            {
              id: `bot_${Date.now()}`,
              role: "assistant",
              content: "✅ Заявка принята!\n\nСпасибо за обращение. Наш менеджер свяжется с вами в течение рабочего дня для уточнения деталей и подготовки индивидуального предложения.",
              timestamp: new Date(),
            },
          ])
        } else {
          throw new Error("Failed to send")
        }
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            id: `bot_${Date.now()}`,
            role: "assistant",
            content: "❌ Произошла ошибка при отправке. Пожалуйста, напишите нам напрямую в Telegram: @ChatBot24su_bot",
            timestamp: new Date(),
          },
        ])
      }
      
      setIsLoading(false)
      return
    }

    // Default response for chat mode
    setTimeout(() => {
      let response = ""
      const lowerContent = content.toLowerCase()

      if (lowerContent.includes("цена") || lowerContent.includes("стоимость") || lowerContent.includes("сколько")) {
        response = "Стоимость зависит от сложности:\n\n• MVP-бот: от 49 000 ₽\n• Sales-Система: от 129 000 ₽\n• AI-Автоматизация: от 240 000 ₽\n\nХотите получить точный расчёт под вашу задачу?"
      } else if (lowerContent.includes("срок") || lowerContent.includes("время")) {
        response = "Средние сроки:\n\n• MVP-бот: 5-7 дней\n• Стандартное решение: 10-14 дней\n• Комплексная автоматизация: 2-3 недели\n\nТочные сроки определим после обсуждения задачи."
      } else if (lowerContent.includes("пример") || lowerContent.includes("кейс") || lowerContent.includes("портфолио")) {
        response = "У нас есть кейсы в разных сферах:\n\n🏢 Недвижимость — квалификация клиентов\n🛍️ Ритейл — приём заказов 24/7\n🎓 Образование — запись на курсы\n🏥 Медицина — автозапись к врачу\n\nХотите увидеть примеры под вашу сферу?"
      } else {
        response = "Понял вас! Чтобы дать точную информацию, мне нужно узнать немного о вашей задаче.\n\nГотовы обсудить проект? Я задам всего 4 вопроса — это займёт 2 минуты."
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot_${Date.now()}`,
          role: "assistant",
          content: response,
          timestamp: new Date(),
        },
      ])
      setIsLoading(false)
    }, 800)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const startLeadForm = () => {
    setStep("name")
    setMessages((prev) => [
      ...prev,
      {
        id: `bot_${Date.now()}`,
        role: "assistant",
        content: "Отлично! Давайте соберём информацию для расчёта.\n\nКак вас зовут?",
        timestamp: new Date(),
      },
    ])
  }

  const quickButtons = step === "chat" ? [
    { label: "💰 Цены", action: "price" },
    { label: "⏱️ Сроки", action: "timeline" },
    { label: "📋 Примеры", action: "examples" },
    { label: "📝 Оставить заявку", action: "lead" },
  ] : []

  const handleQuickButton = (action: string) => {
    switch (action) {
      case "price":
        sendMessage("Сколько стоит чат-бот?")
        break
      case "timeline":
        sendMessage("Какие сроки разработки?")
        break
      case "examples":
        sendMessage("Покажите примеры проектов")
        break
      case "lead":
        startLeadForm()
        break
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110",
          isOpen
            ? "bg-red-500 hover:bg-red-600"
            : "bg-gradient-to-r from-[#14b8a6] to-[#0d9488] hover:from-[#2dd4bf] hover:to-[#14b8a6]"
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#042f2e] shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-[#14b8a6] to-[#0d9488] px-4 py-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">ChatBot24 Assistant</h3>
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                <span className="text-xs text-white/80">Онлайн</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    message.role === "user"
                      ? "bg-[#14b8a6]/20"
                      : "bg-[#14b8a6]"
                  )}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4 text-[#14b8a6]" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2 text-sm whitespace-pre-line",
                    message.role === "user"
                      ? "bg-[#14b8a6] text-white"
                      : "bg-white/10 text-white/90"
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#14b8a6]">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-white/10 rounded-2xl px-4 py-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:0.1s]"></span>
                    <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Buttons */}
          {quickButtons.length > 0 && (
            <div className="border-t border-white/10 bg-white/5 px-4 py-3">
              <p className="mb-2 text-xs text-white/50">Быстрые действия:</p>
              <div className="flex flex-wrap gap-2">
                {quickButtons.map((button) => (
                  <button
                    key={button.action}
                    onClick={() => handleQuickButton(button.action)}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium bg-white/10 text-white/80 border border-white/10 hover:bg-[#14b8a6]/20 hover:border-[#14b8a6]/30 transition-all"
                  >
                    {button.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-white/10 bg-[#021c1b] p-4"
          >
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={step === "chat" ? "Введите сообщение..." : "Введите ответ..."}
                className="flex-1 h-10 px-4 rounded-xl border border-white/10 bg-white/5 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[#14b8a6]/50"
                disabled={isLoading || step === "complete"}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim() || step === "complete"}
                className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#14b8a6] text-white hover:bg-[#2dd4bf] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}

export default ChatWidget
