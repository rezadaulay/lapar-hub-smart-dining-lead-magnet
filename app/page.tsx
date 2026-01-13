import { Metadata } from 'next';
import LeadForm from "./components/LeadForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image'
import { faStar, faBolt, faUtensils } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: 'LaparHub | 50% OFF Premium Steak Experience in Jakarta',
  description: 'Join LaparHub and get an instant 50% discount voucher for Jakarta\'s top-rated steakhouses. Personalized menu recommendations powered by Gemini AI.',
  keywords: ['Steak Jakarta', 'Promo Steak', 'LaparHub', 'Dining Discount', 'Premium Steakhouse'],
  authors: [{ name: 'LaparHub Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  
  // Open Graph (Untuk Facebook, Instagram, WhatsApp)
  openGraph: {
    type: 'website',
    url: 'https://laparhub.com',
    title: 'LaparHub | Get Your 50% Steak Voucher',
    description: 'Claim your exclusive 50% discount at Jakarta\'s finest steakhouses. AI-powered menu matching inside!',
    siteName: 'LaparHub',
    // images: [
    //   {
    //     url: 'https://laparhub.com/og-image.jpg', // Ganti dengan URL gambar promo Anda
    //     width: 1200,
    //     height: 630,
    //     alt: 'LaparHub Promo Steak 50%',
    //   },
    // ],
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'LaparHub | Premium Steak Experience',
    description: 'Get 50% OFF your favorite steak in Jakarta. Instant delivery to your inbox.',
    // images: ['https://laparhub.com/twitter-image.jpg'], // Ganti dengan URL gambar promo Anda
  },

  // Icon & Theme Color
  icons: {
    icon: '/LaparHub.ico',
  },
  themeColor: '#D71921', // Warna hungryRed Anda
};

export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "name": "LaparHub Steak Lead Magnet",
    "description": "50% Discount for Premium Steakhouses in Jakarta",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Steakhouse Discount Voucher"
        },
        "priceCurrency": "IDR",
        "price": "0",
        "availability": "https://schema.org/InStock"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function LaparHubLanding() {
  return (<>
    <StructuredData/>
    <main className="min-h-screen bg-hungry-gray">
      {/* Hero Section */}
      <section className="bg-hungry-dark text-white py-24 px-6 relative">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-hungry-red/10 text-hungry-red px-4 py-1.5 rounded-full border border-hungry-red/20 mb-6">
              <FontAwesomeIcon icon={faBolt} />
              <span className="font-bold tracking-widest uppercase text-xs">Limited Offer</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6 leading-tight">
              Jakarta's Finest Steak, <span className="text-hungry-red">Half the Price.</span>
            </h1>
            <p className="text-gray-400 text-xl mb-10 leading-relaxed max-w-lg">
              Unlock a 50% discount and get AI-driven menu recommendations at our exclusive partner steakhouses.
            </p>
            
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-hungry-dark bg-gray-500 overflow-hidden shadow-xl">
                    <Image
                      className="rounded-full"
                      src={`https://i.pravatar.cc/300?u=${i}`}
                      width={300}
                      height={300}
                      alt=""
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-300 font-medium italic">Join 2,000+ happy diners</p>
            </div>
          </div>

          <div id="lead-form-container">
            {/* The component handles everything inside */}
            <LeadForm />
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-hungry-dark mb-4">Why Sign Up Now?</h2>
          <div className="w-20 h-1.5 bg-hungry-red mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            { icon: faBolt, title: "Instant Voucher", desc: "Your 50% promo code lands in your inbox the second you hit submit." },
            { icon: faStar, title: "Curated Selection", desc: "Exclusive access to top-tier steakhouses with 4.5+ verified ratings." },
            { icon: faUtensils, title: "Smart Matching", desc: "Gemini AI suggests the best dishes based on your preferred cut and doneness." }
          ].map((item, idx) => (
            <div key={idx} className="group p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 bg-hungry-gray group-hover:bg-hungry-red group-hover:text-white text-hungry-red rounded-xl flex items-center justify-center text-xl mb-6 transition-colors">
                <FontAwesomeIcon icon={item.icon} />
              </div>
              <h3 className="text-2xl mb-3 text-hungry-dark">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  </>);
}