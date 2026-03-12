import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for leads (in production, use a database)
interface Lead {
  id: string
  name: string
  phone: string
  company: string
  message: string
  createdAt: string
  source: string
}

// Store leads in memory (will reset on redeploy, but works for demo)
const leads: Lead[] = []

function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-\(\)]/g, '')
  const phoneRegex = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
  return phoneRegex.test(cleaned)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, company, message, source = 'chat_widget' } = body

    // Validation
    const errors: Record<string, string> = {}

    if (!name || name.trim().length < 2) {
      errors.name = 'Имя должно содержать минимум 2 символа'
    }

    if (!phone || !validatePhone(phone)) {
      errors.phone = 'Введите корректный номер телефона'
    }

    if (!company || company.trim().length < 2) {
      errors.company = 'Укажите компанию или сферу бизнеса'
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', errors },
        { status: 400 }
      )
    }

    // Create lead
    const lead: Lead = {
      id: crypto.randomUUID(),
      name: name.trim(),
      phone: phone.trim(),
      company: company.trim(),
      message: message?.trim() || '',
      createdAt: new Date().toISOString(),
      source,
    }

    // Store lead
    leads.push(lead)

    // Log lead (for debugging)
    console.log('[Lead Created]', {
      id: lead.id,
      name: lead.name,
      phone: lead.phone,
      company: lead.company,
      createdAt: lead.createdAt,
    })

    // Here you could also send to external services:
    // - Telegram bot
    // - Email
    // - CRM via webhook
    // - etc.

    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message: 'Заявка успешно создана',
    })

  } catch (error) {
    console.error('[Lead API Error]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Simple auth check - in production use proper authentication
  const authHeader = request.headers.get('authorization')
  
  // For demo purposes, allow access without auth or with simple token
  // In production, implement proper auth
  
  return NextResponse.json({
    leads: leads.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ),
    total: leads.length,
  })
}

// CORS headers for widget integration
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
