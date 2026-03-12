"use client"

import { useState } from "react"
import { Calculator as CalcIcon, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Calculator() {
  const [requestsPerDay, setRequestsPerDay] = useState(50)
  const [conversionRate, setConversionRate] = useState(10)
  const [avgCheck, setAvgCheck] = useState(10000)
  
  const lostRequests = Math.round(requestsPerDay * 0.3)
  const monthlyLost = lostRequests * 30
  const potentialRevenue = Math.round(monthlyLost * (conversionRate / 100) * avgCheck)
  
  return (
    <section className="section-landing">
      <div className="container-landing">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
              Калькулятор потерь
            </h2>
            <p className="text-lg text-white/65 max-w-2xl mx-auto">
              Узнайте, сколько денег теряете из-за неотвеченных заявок
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.1]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#14b8a6]/10 flex items-center justify-center">
                  <CalcIcon className="w-5 h-5 text-[#14b8a6]" />
                </div>
                <h3 className="text-lg font-semibold text-white">Ваши данные</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Заявок в день: <span className="text-[#14b8a6]">{requestsPerDay}</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="500"
                    value={requestsPerDay}
                    onChange={(e) => setRequestsPerDay(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#14b8a6]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Конверсия в продажу: <span className="text-[#14b8a6]">{conversionRate}%</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={conversionRate}
                    onChange={(e) => setConversionRate(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#14b8a6]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Средний чек: <span className="text-[#14b8a6]">{avgCheck.toLocaleString()} ₽</span>
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="100000"
                    step="1000"
                    value={avgCheck}
                    onChange={(e) => setAvgCheck(Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#14b8a6]"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="p-6 rounded-2xl bg-[#14b8a6]/10 border-2 border-[#14b8a6] flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-white mb-6">Ежемесячные потери</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Необработано заявок</span>
                  <span className="text-white font-semibold">{monthlyLost} / мес</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60">Упущенная выручка</span>
                  <span className="text-2xl font-bold text-[#14b8a6]">{potentialRevenue.toLocaleString()} ₽</span>
                </div>
              </div>

              <a
                href="https://t.me/ChatBot24su_bot?start=landing"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-[#14b8a6] hover:bg-[#2dd4bf] gap-2">
                  Обсудить решение
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
