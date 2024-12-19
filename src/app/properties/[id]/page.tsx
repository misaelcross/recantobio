"use client"

import { useState } from 'react'
import Image from 'next/image'

interface PropertyPageProps {
  params: {
    id: string
  }
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const [selectedDates, setSelectedDates] = useState<{start?: string; end?: string}>({})
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(12) // December
  const [currentYear, setCurrentYear] = useState(2024)

  const photos = [
    '/placeholder-main.jpg',
    '/placeholder-2.jpg',
    '/placeholder-3.jpg',
    '/placeholder-4.jpg',
    '/placeholder-5.jpg'
  ]

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length)
  }

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
  }
  const pricePerNight = 150

  const handleDateClick = (day: number) => {
    const date = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    
    if (!selectedDates.start) {
      setSelectedDates({ start: date })
    } else if (!selectedDates.end && date > selectedDates.start) {
      setSelectedDates({ ...selectedDates, end: date })
    } else {
      setSelectedDates({ start: date })
    }
  }

  const isDateInRange = (day: number) => {
    if (!selectedDates.start || !selectedDates.end) return false
    const date = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    return date >= selectedDates.start && date <= selectedDates.end
  }

  const isStartDate = (day: number) => 
    selectedDates.start === `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`

  const isEndDate = (day: number) => 
    selectedDates.end === `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`

  const calculateTotalNights = () => {
    if (!selectedDates.start || !selectedDates.end) return 0
    const start = new Date(selectedDates.start)
    const end = new Date(selectedDates.end)
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    return date.toLocaleDateString('pt-BR', { 
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Property Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Beautiful Beachfront Property</h1>
        <p className="text-gray-600">Gonzaguinha, São Vicente, Brazil</p>
      </div>

      {/* Photo Gallery Slider */}
      <div className="relative mb-8 h-[400px]">
        <div className="relative w-full h-full">
          <img
            src={photos[currentPhotoIndex]}
            alt={`Property view ${currentPhotoIndex + 1}`}
            className="object-cover w-full h-full rounded-xl cursor-pointer"
            onClick={() => setIsModalOpen(true)}
          />
          
          {/* Navigation Arrows */}
          <button 
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
            aria-label="Previous photo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
            aria-label="Next photo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

          {/* Photo Counter */}
          <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
            {currentPhotoIndex + 1} / {photos.length}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div className="relative w-[90vw] h-[90vh]">
            <img
              src={photos[currentPhotoIndex]}
              alt={`Property view ${currentPhotoIndex + 1}`}
              className="w-full h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Modal Navigation Arrows */}
            <button 
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
              aria-label="Previous photo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
              aria-label="Next photo"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Photo Counter */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
              {currentPhotoIndex + 1} / {photos.length}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Property Details */}
        <div className="md:col-span-2">
          <div className="border-b pb-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Entire apartment hosted by Anderson</h2>
            <div className="flex gap-4 text-gray-600">
              <span>4 guests</span>
              <span>•</span>
              <span>2 bedrooms</span>
              <span>•</span>
              <span>2 bathrooms</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">About this space</h3>
            <p className="text-gray-600">
              Beachfront apartment with stunning ocean views. Perfect for families and couples
              looking for a relaxing getaway. Fully furnished with modern amenities and
              direct access to the beach.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">O que esse lugar oferece</h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="flex items-center gap-4">
                <img src="/window.svg" alt="Ocean view" className="w-6 h-6" />
                <span>Vista para o oceano</span>
              </div>
              <div className="flex items-center gap-4">
                <img src="/window.svg" alt="Sea view" className="w-6 h-6" />
                <span>Vista para o mar</span>
              </div>
              <div className="flex items-center gap-4">
                <img src="/file.svg" alt="Beach access" className="w-6 h-6" />
                <span>Acesso à praia compartilhado — à beira-mar</span>
              </div>
              <div className="flex items-center gap-4">
                <img src="/globe.svg" alt="Kitchen" className="w-6 h-6" />
                <span>Cozinha</span>
              </div>
              <div className="flex items-center gap-4">
                <img src="/globe.svg" alt="WiFi" className="w-6 h-6" />
                <span>Wi-Fi</span>
              </div>
              <div className="flex items-center gap-4">
                <img src="/file.svg" alt="Free parking" className="w-6 h-6" />
                <span>Estacionamento gratuito na rua</span>
              </div>
              <div className="flex items-center gap-4">
                <img src="/file.svg" alt="TV" className="w-6 h-6" />
                <span>TV de alta definição de 43 polegadas com Netflix</span>
              </div>
              <div className="flex items-center gap-4">
                <img src="/file.svg" alt="Pets allowed" className="w-6 h-6" />
                <span>Permitido animais</span>
              </div>
              <div className="flex items-center gap-4">
                <img src="/file.svg" alt="Carbon monoxide detector" className="w-6 h-6" />
                <span>Alarme de monóxido de carbono</span>
              </div>
              <div className="flex items-center gap-4">
                <img src="/file.svg" alt="Smoke detector" className="w-6 h-6" />
                <span>Detector de fumaça</span>
              </div>
            </div>
            <button className="border border-gray-900 rounded-lg px-4 py-2 hover:bg-gray-100">
              Mostrar todas as 30 comodidades
            </button>
          </div>

          {/* Reviews Section */}
          <div className="mb-8">
            <div className="border-b pb-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  <span className="text-3xl font-bold">4,92</span>
                  <div className="flex ml-2">
                    <img src="/star.svg" alt="star" className="w-5 h-5" />
                  </div>
                </div>
                <span className="text-gray-600">•</span>
                <span className="text-gray-600">204 avaliações</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-between items-center">
                  <span>Limpeza</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-[98%] h-full bg-gray-900 rounded-full"></div>
                    </div>
                    <span className="text-sm">4,9</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Comunicação</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gray-900 rounded-full"></div>
                    </div>
                    <span className="text-sm">5,0</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Check-in</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-gray-900 rounded-full"></div>
                    </div>
                    <span className="text-sm">5,0</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Custo-benefício</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-[98%] h-full bg-gray-900 rounded-full"></div>
                    </div>
                    <span className="text-sm">4,9</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Localização</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="w-[98%] h-full bg-gray-900 rounded-full"></div>
                    </div>
                    <span className="text-sm">4,9</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <img src="/placeholder-2.jpg" alt="Leonardo" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold">Leonardo</p>
                      <p className="text-sm text-gray-600">1 mês no Airbnb</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Ficou algumas noites. Achei o apartamento muito bem localizado, limpo e confortável, nos sentimos em casa. Anderson foi muito atencioso e disponível. A vista é muito abençoada e disponível...
                  </p>
                  <button className="text-sm underline mt-2">Mostrar mais</button>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <img src="/placeholder-3.jpg" alt="Jorge" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold">Jorge</p>
                      <p className="text-sm text-gray-600">2 semanas no Airbnb</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Excelente tudo, obrigado, voltarei!
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <img src="/placeholder-4.jpg" alt="Rosalene" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold">Rosalene</p>
                      <p className="text-sm text-gray-600">3 anos no Airbnb</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Tudo estava ótimo, o apartamento é muito organizado, limpo e feito com muito carinho
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <img src="/placeholder-5.jpg" alt="Beatriz" className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold">Beatriz</p>
                      <p className="text-sm text-gray-600">dezembro de 2024</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Achei bonito, ótima localização está muito limpo e cheiroso, adorei!
                  </p>
                </div>
              </div>
            </div>

            <button className="mt-8 border border-gray-900 rounded-lg px-4 py-2 hover:bg-gray-100">
              Mostrar todos os 204 comentários
            </button>
          </div>

          {/* Location Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Onde você estará</h3>
            <p className="text-gray-600 mb-4">Gonzaguinha, São Paulo, Brasil</p>
            <div className="h-[400px] w-full bg-gray-100 rounded-xl"></div>
          </div>

          {/* Host Section */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Quem vai receber você</h3>
            <div className="flex items-start gap-4">
              <img src="/placeholder-2.jpg" alt="Anderson" className="w-14 h-14 rounded-full object-cover" />
              <div>
                <h4 className="font-semibold mb-1">Anderson</h4>
                <p className="text-gray-600 text-sm mb-2">Superhost</p>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <img src="/star.svg" alt="Rating" className="w-4 h-4" />
                    <span>315 avaliações</span>
                  </div>
                  <span>•</span>
                  <span>4,94★</span>
                  <span>•</span>
                  <span>3 anos hospedando</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Superhost são anfitriões experientes, com ótimas avaliações e que se empenham em oferecer
                  estadias incríveis para os hóspedes.
                </p>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <img src="/placeholder-3.jpg" alt="Rosemary" className="w-6 h-6 rounded-full object-cover" />
                    <span>Coanfitrião: Rosemary</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm mb-4">
                  <p>Taxa de resposta: 100%</p>
                  <p>Responde em até 1 hora</p>
                </div>
                <button className="border border-gray-900 rounded-lg px-6 py-3 hover:bg-gray-100">
                  Envie uma mensagem para o anfitrião
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Widget */}
        <div className="md:col-span-1 relative">
          <div className="border rounded-xl p-6 shadow-lg sticky top-24">
            <div className="mb-4">
              <span className="text-2xl font-bold">R${pricePerNight}</span>
              <span className="text-gray-600"> / noite</span>
            </div>

            <div className="mb-6">
              <h3 className="text-xl mb-4">
                {calculateTotalNights() > 0 ? `${calculateTotalNights()} noites` : 'Selecione as datas'} em Gonzaguinha
              </h3>
              {selectedDates.start && (
                <p className="text-sm text-gray-600">
                  {formatDate(selectedDates.start)}
                  {selectedDates.end ? ` - ${formatDate(selectedDates.end)}` : ''}
                </p>
              )}
            </div>

            <div className="mb-4">
              {/* Month Selection */}
              <div className="flex justify-between items-center mb-4">
                <button 
                  onClick={() => {
                    if (currentMonth === 1) {
                      setCurrentMonth(12)
                      setCurrentYear(prev => prev - 1)
                    } else {
                      setCurrentMonth(prev => prev - 1)
                    }
                  }} 
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <span className="text-sm font-medium">
                  {new Date(currentYear, currentMonth - 1).toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
                </span>
                <button 
                  onClick={() => {
                    if (currentMonth === 12) {
                      setCurrentMonth(1)
                      setCurrentYear(prev => prev + 1)
                    } else {
                      setCurrentMonth(prev => prev + 1)
                    }
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1 mb-4">
                <div className="text-center text-sm font-medium">Dom</div>
                <div className="text-center text-sm font-medium">Seg</div>
                <div className="text-center text-sm font-medium">Ter</div>
                <div className="text-center text-sm font-medium">Qua</div>
                <div className="text-center text-sm font-medium">Qui</div>
                <div className="text-center text-sm font-medium">Sex</div>
                <div className="text-center text-sm font-medium">Sáb</div>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {/* December 2024 */}
                {Array.from({ length: new Date(currentYear, currentMonth - 1, 1).getDay() }).map((_, index) => (
                  <div key={`empty-${index}`} className="text-center p-2 text-sm text-gray-400"></div>
                ))}
                {Array.from({ length: new Date(currentYear, currentMonth, 0).getDate() }).map((_, index) => {
                  const day = index + 1
                  const isSelected = isDateInRange(day)
                  const isStart = isStartDate(day)
                  const isEnd = isEndDate(day)
                  
                  return (
                    <button
                      key={day}
                      onClick={() => handleDateClick(day)}
                      className={`text-center p-2 text-sm cursor-pointer hover:bg-gray-100 ${
                        isSelected ? 'bg-gray-200' : ''
                      } ${
                        isStart ? 'bg-gray-900 text-white rounded-l-full' : ''
                      } ${
                        isEnd ? 'bg-gray-900 text-white rounded-r-full' : ''
                      }`}
                    >
                      {day}
                    </button>
                  )
                })}
              </div>


              <button 
                className="text-sm text-gray-600 underline mt-4"
                onClick={() => setSelectedDates({})}
              >
                Limpar datas
              </button>
            </div>

            {calculateTotalNights() > 0 && (
              <div className="mb-4 border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>R${pricePerNight} x {calculateTotalNights()} noites</span>
                  <span>R${pricePerNight * calculateTotalNights()}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>R${pricePerNight * calculateTotalNights()}</span>
                </div>
              </div>
            )}

            <button 
              className={`w-full py-3 rounded-lg font-semibold transition ${
                calculateTotalNights() > 0 
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={calculateTotalNights() === 0}
            >
              Reserve
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
