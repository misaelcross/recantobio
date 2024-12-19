import Link from 'next/link'

export default function HomePage() {
  const featuredProperties = [
    {
      id: '1',
      title: 'Linda Casa à Beira-mar',
      location: 'Gonzaguinha, São Vicente, SP',
      price: 150,
      rating: 4.92,
      image: '/placeholder-main.jpg',
    },
    {
      id: '2',
      title: 'Apartamento Moderno no Centro',
      location: 'Santos, SP',
      price: 120,
      rating: 4.8,
      image: '/placeholder-2.jpg',
    },
    {
      id: '3',
      title: 'Casa Aconchegante na Praia',
      location: 'Guarujá, SP',
      price: 200,
      rating: 4.95,
      image: '/placeholder-3.jpg',
    },
  ]

  return (
    <main>
      {/* Hero Section */}
      <div className="bg-emerald-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">
              Seu refúgio perfeito está aqui
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Encontre lugares únicos para se hospedar no litoral
            </p>
            <div className="flex gap-4">
              <button className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition">
                Ver imóveis
              </button>
              <button className="bg-white text-emerald-500 px-6 py-3 rounded-lg border border-emerald-500 hover:bg-emerald-50 transition">
                Saiba mais
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Properties */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Imóveis em Destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <Link 
              href={`/properties/${property.id}`} 
              key={property.id}
              className="group"
            >
              <div className="border rounded-xl overflow-hidden hover:shadow-lg transition">
                <div className="aspect-[4/3] relative">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{property.title}</h3>
                    <div className="flex items-center">
                      <span className="text-sm">★</span>
                      <span className="text-sm ml-1">{property.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                  <p className="font-semibold">R$ {property.price} <span className="text-gray-600 font-normal">noite</span></p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-12 text-center">Por que escolher o Recanto?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="font-semibold mb-2">Lugares Únicos</h3>
              <p className="text-gray-600">
                Apartamentos e casas incríveis à beira-mar para sua estadia
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="font-semibold mb-2">Anfitriões Verificados</h3>
              <p className="text-gray-600">
                Reserve com segurança, todos os anfitriões são avaliados
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="font-semibold mb-2">Suporte 24h</h3>
              <p className="text-gray-600">
                Nossa equipe está sempre pronta para ajudar você
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
