import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Language {
  code: string;
  flag: string;
  name: string;
}

interface TranslationContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
  languages: Language[];
}

const languages: Language[] = [
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'es', flag: '🇪🇸', name: 'Español' },
  { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'fr', flag: '🇫🇷', name: 'Français' }
];

// Translation dictionaries
const translations: Record<string, Record<string, string>> = {
  en: {
    // Navigation
    'nav.boats': 'Boats',
    'nav.contact': 'Contact',
    'nav.food_drink': 'Food & Drink',
    'nav.charter_guide': 'Charter Guide',
    'nav.special_offers': 'Special Offers',
    'nav.calendar': 'Calendar',
    
    // Hero Section
    'hero.title': 'Authentic Mallorcan Sailing Experience',
    'hero.subtitle': 'Sail on a traditional llaut with local tapas & wine in turquoise waters',
    'hero.classic_llaut': 'Classic Llaut',
    'hero.local_tapas': 'Local Tapas',
    'hero.swimming_stop': 'Swimming Stop',
    'hero.local_skipper': 'Local Skipper',
    
    // Booking Widget
    'booking.title': 'Book Your Experience',
    'booking.from_price': 'From €99 per person',
    'booking.guests': 'Guests',
    'booking.add_children': 'Add children',
    'booking.select_time': 'Select a time',
    'booking.your_name': 'Your Name',
    'booking.email': 'Email',
    'booking.phone': 'Phone (with country code)',
    'booking.special_requests': 'Special Requests (optional)',
    'booking.special_requests_placeholder': 'Any special occasions, dietary requirements, or requests...',
    'booking.premium_upgrade': 'Premium Catering Upgrade',
    'booking.premium_upgrade_desc': 'Enhanced tapas selection with premium local specialties (+€20 per person)',
    'booking.continue_payment': 'Continue to Payment',
    'booking.fill_details': 'Fill Details to Continue',
    'booking.fully_insured': 'Fully Insured',
    'booking.free_cancellation': 'Free Cancellation',
    'booking.secure_payment': 'Secure Payment',
    
    // Time Slots
    'timeslot.morning': 'Morning Sailing',
    'timeslot.afternoon': 'Afternoon Adventure',
    'timeslot.sunset': 'Sunset Romance',
    'timeslot.morning_desc': 'Perfect for early birds • Calm waters • Light breakfast',
    'timeslot.afternoon_desc': 'Peak experience • Full lunch • Swimming time',
    'timeslot.sunset_desc': 'Magic hour • Tapas & wine • Unforgettable views',
    'timeslot.unavailable': 'Unavailable',
    'timeslot.per_group': 'per group',
    'timeslot.up_to_guests': 'Up to 12 guests',
    'timeslot.select_date_first': 'Select a date to see available times',
    'timeslot.choose_date_first': 'Choose your preferred sailing date first',
    'timeslot.checking_availability': 'Checking availability...',
    
    // What's Included
    'included.title': 'What\'s Included in Your Experience',
    'included.subtitle': 'Everything you need for an authentic Mallorcan sailing adventure',
    'included.professional_skipper': 'Professional Local Skipper',
    'included.professional_skipper_desc': 'Experienced captain who knows the best spots and can teach you sailing basics',
    'included.authentic_tapas': 'Authentic Local Tapas',
    'included.authentic_tapas_desc': 'Traditional Mallorcan tapas prepared with local ingredients and regional wine',
    'included.drinks_fruit': 'Drinks & Fresh Fruit',
    'included.drinks_fruit_desc': 'Selection of beverages, local wine, and seasonal fresh fruit from Mallorca',
    'included.swimming': 'Swimming in Turquoise Waters',
    'included.swimming_desc': 'Stop at a beautiful secluded cala with crystal clear Mediterranean waters',
    'included.sailing_instruction': 'Sailing Instruction',
    'included.sailing_instruction_desc': 'Learn to sail a traditional llaut or simply relax while we handle everything',
    'included.memories': 'Unforgettable Memories',
    'included.memories_desc': 'Create lasting memories sailing across the beautiful Bay of Palma',
    
    // Social Proof
    'reviews.title': 'What Our Guests Say',
    'reviews.subtitle': 'Join hundreds of happy guests who\'ve experienced authentic Mallorca',
    'reviews.sarah': 'Amazing experience! The traditional boat, local food, and swimming spot were perfect. Our skipper was fantastic and taught us so much about Mallorca.',
    'reviews.marcus': 'Exactly what we wanted - authentic, relaxed, and beautiful. The tapas were incredible and the cala was like paradise. Highly recommend!',
    'reviews.emma': 'Best way to see Mallorca from the water. The sunset trip was magical and our kids loved learning to sail the traditional boat.',
    
    // Common
    'common.name_placeholder': 'Full name',
    'common.email_placeholder': 'your@email.com',
    'common.phone_placeholder': '+34 123 456 789',
  },
  es: {
    // Navigation
    'nav.boats': 'Barcos',
    'nav.contact': 'Contacto',
    'nav.food_drink': 'Comida y Bebida',
    'nav.charter_guide': 'Guía de Charter',
    'nav.special_offers': 'Ofertas Especiales',
    'nav.calendar': 'Calendario',
    
    // Hero Section
    'hero.title': 'Experiencia Auténtica de Navegación Mallorquina',
    'hero.subtitle': 'Navega en un llaut tradicional con tapas locales y vino en aguas turquesas',
    'hero.classic_llaut': 'Llaut Clásico',
    'hero.local_tapas': 'Tapas Locales',
    'hero.swimming_stop': 'Parada para Nadar',
    'hero.local_skipper': 'Patrón Local',
    
    // Booking Widget
    'booking.title': 'Reserva Tu Experiencia',
    'booking.from_price': 'Desde €99 por persona',
    'booking.guests': 'Huéspedes',
    'booking.add_children': 'Agregar niños',
    'booking.select_time': 'Selecciona la hora',
    'booking.your_name': 'Tu Nombre',
    'booking.email': 'Correo Electrónico',
    'booking.phone': 'Teléfono (con código de país)',
    'booking.special_requests': 'Solicitudes Especiales (opcional)',
    'booking.special_requests_placeholder': 'Cualquier ocasión especial, requisitos dietéticos o solicitudes...',
    'booking.premium_upgrade': 'Mejora de Catering Premium',
    'booking.premium_upgrade_desc': 'Selección de tapas mejorada con especialidades locales premium (+€20 por persona)',
    'booking.continue_payment': 'Continuar al Pago',
    'booking.fill_details': 'Completa los Detalles para Continuar',
    'booking.fully_insured': 'Completamente Asegurado',
    'booking.free_cancellation': 'Cancelación Gratuita',
    'booking.secure_payment': 'Pago Seguro',
    
    // Time Slots
    'timeslot.morning': 'Navegación Matutina',
    'timeslot.afternoon': 'Aventura de Tarde',
    'timeslot.sunset': 'Romance del Atardecer',
    'timeslot.morning_desc': 'Perfecto para madrugadores • Aguas tranquilas • Desayuno ligero',
    'timeslot.afternoon_desc': 'Experiencia máxima • Almuerzo completo • Tiempo para nadar',
    'timeslot.sunset_desc': 'Hora mágica • Tapas y vino • Vistas inolvidables',
    'timeslot.unavailable': 'No disponible',
    'timeslot.per_group': 'por grupo',
    'timeslot.up_to_guests': 'Hasta 12 huéspedes',
    'timeslot.select_date_first': 'Selecciona una fecha para ver horarios disponibles',
    'timeslot.choose_date_first': 'Elige primero tu fecha de navegación preferida',
    'timeslot.checking_availability': 'Verificando disponibilidad...',
    
    // What's Included
    'included.title': 'Qué Está Incluido en Tu Experiencia',
    'included.subtitle': 'Todo lo que necesitas para una auténtica aventura de navegación mallorquina',
    'included.professional_skipper': 'Patrón Local Profesional',
    'included.professional_skipper_desc': 'Capitán experimentado que conoce los mejores lugares y puede enseñarte lo básico de navegación',
    'included.authentic_tapas': 'Tapas Locales Auténticas',
    'included.authentic_tapas_desc': 'Tapas tradicionales mallorquinas preparadas con ingredientes locales y vino regional',
    'included.drinks_fruit': 'Bebidas y Fruta Fresca',
    'included.drinks_fruit_desc': 'Selección de bebidas, vino local y fruta fresca de temporada de Mallorca',
    'included.swimming': 'Nadar en Aguas Turquesas',
    'included.swimming_desc': 'Parada en una hermosa cala apartada con aguas cristalinas del Mediterráneo',
    'included.sailing_instruction': 'Instrucción de Navegación',
    'included.sailing_instruction_desc': 'Aprende a navegar un llaut tradicional o simplemente relájate mientras nosotros nos encargamos de todo',
    'included.memories': 'Recuerdos Inolvidables',
    'included.memories_desc': 'Crea recuerdos duraderos navegando por la hermosa Bahía de Palma',
    
    // Social Proof
    'reviews.title': 'Lo Que Dicen Nuestros Huéspedes',
    'reviews.subtitle': 'Únete a cientos de huéspedes felices que han experimentado la auténtica Mallorca',
    'reviews.sarah': '¡Experiencia increíble! El barco tradicional, la comida local y el lugar para nadar fueron perfectos. Nuestro patrón fue fantástico y nos enseñó mucho sobre Mallorca.',
    'reviews.marcus': 'Exactamente lo que queríamos: auténtico, relajado y hermoso. Las tapas estaban increíbles y la cala era como el paraíso. ¡Muy recomendable!',
    'reviews.emma': 'La mejor manera de ver Mallorca desde el agua. El viaje al atardecer fue mágico y a nuestros hijos les encantó aprender a navegar el barco tradicional.',
    
    // Common
    'common.name_placeholder': 'Nombre completo',
    'common.email_placeholder': 'tu@email.com',
    'common.phone_placeholder': '+34 123 456 789',
  },
  de: {
    // Navigation
    'nav.boats': 'Boote',
    'nav.contact': 'Kontakt',
    'nav.food_drink': 'Essen & Trinken',
    'nav.charter_guide': 'Charter-Guide',
    'nav.special_offers': 'Sonderangebote',
    'nav.calendar': 'Kalender',
    
    // Hero Section
    'hero.title': 'Authentisches Mallorquinisches Segelerlebnis',
    'hero.subtitle': 'Segeln Sie auf einem traditionellen Llaut mit lokalen Tapas & Wein in türkisfarbenem Wasser',
    'hero.classic_llaut': 'Klassischer Llaut',
    'hero.local_tapas': 'Lokale Tapas',
    'hero.swimming_stop': 'Schwimmstopp',
    'hero.local_skipper': 'Lokaler Skipper',
    
    // Booking Widget
    'booking.title': 'Buchen Sie Ihr Erlebnis',
    'booking.from_price': 'Ab €99 pro Person',
    'booking.guests': 'Gäste',
    'booking.add_children': 'Kinder hinzufügen',
    'booking.select_time': 'Zeit auswählen',
    'booking.your_name': 'Ihr Name',
    'booking.email': 'E-Mail',
    'booking.phone': 'Telefon (mit Ländercode)',
    'booking.special_requests': 'Sonderwünsche (optional)',
    'booking.special_requests_placeholder': 'Besondere Anlässe, Ernährungsanforderungen oder Wünsche...',
    'booking.premium_upgrade': 'Premium Catering Upgrade',
    'booking.premium_upgrade_desc': 'Erweiterte Tapas-Auswahl mit lokalen Premium-Spezialitäten (+€20 pro Person)',
    'booking.continue_payment': 'Zur Zahlung fortfahren',
    'booking.fill_details': 'Details ausfüllen um fortzufahren',
    'booking.fully_insured': 'Vollversichert',
    'booking.free_cancellation': 'Kostenlose Stornierung',
    'booking.secure_payment': 'Sichere Zahlung',
    
    // Time Slots
    'timeslot.morning': 'Morgendliches Segeln',
    'timeslot.afternoon': 'Nachmittags-Abenteuer',
    'timeslot.sunset': 'Sonnenuntergangs-Romantik',
    'timeslot.morning_desc': 'Perfekt für Frühaufsteher • Ruhige Gewässer • Leichtes Frühstück',
    'timeslot.afternoon_desc': 'Spitzenerlebnis • Vollständiges Mittagessen • Schwimmzeit',
    'timeslot.sunset_desc': 'Magische Stunde • Tapas & Wein • Unvergessliche Aussichten',
    'timeslot.unavailable': 'Nicht verfügbar',
    'timeslot.per_group': 'pro Gruppe',
    'timeslot.up_to_guests': 'Bis zu 12 Gäste',
    'timeslot.select_date_first': 'Wählen Sie ein Datum, um verfügbare Zeiten zu sehen',
    'timeslot.choose_date_first': 'Wählen Sie zuerst Ihr bevorzugtes Segeldatum',
    'timeslot.checking_availability': 'Verfügbarkeit prüfen...',
    
    // What's Included
    'included.title': 'Was in Ihrem Erlebnis enthalten ist',
    'included.subtitle': 'Alles was Sie für ein authentisches mallorquinisches Segelabenteuer brauchen',
    'included.professional_skipper': 'Professioneller Lokaler Skipper',
    'included.professional_skipper_desc': 'Erfahrener Kapitän, der die besten Plätze kennt und Ihnen Segelgrundlagen beibringen kann',
    'included.authentic_tapas': 'Authentische Lokale Tapas',
    'included.authentic_tapas_desc': 'Traditionelle mallorquinische Tapas mit lokalen Zutaten und Regionalwein zubereitet',
    'included.drinks_fruit': 'Getränke & Frisches Obst',
    'included.drinks_fruit_desc': 'Auswahl an Getränken, lokalem Wein und saisonalem frischem Obst aus Mallorca',
    'included.swimming': 'Schwimmen in Türkisfarbenem Wasser',
    'included.swimming_desc': 'Stopp in einer wunderschönen abgelegenen Cala mit kristallklarem Mittelmeerwasser',
    'included.sailing_instruction': 'Segelunterricht',
    'included.sailing_instruction_desc': 'Lernen Sie einen traditionellen Llaut zu segeln oder entspannen Sie einfach, während wir uns um alles kümmern',
    'included.memories': 'Unvergessliche Erinnerungen',
    'included.memories_desc': 'Schaffen Sie bleibende Erinnerungen beim Segeln über die wunderschöne Bucht von Palma',
    
    // Social Proof
    'reviews.title': 'Was Unsere Gäste Sagen',
    'reviews.subtitle': 'Schließen Sie sich Hunderten von glücklichen Gästen an, die das authentische Mallorca erlebt haben',
    'reviews.sarah': 'Erstaunliche Erfahrung! Das traditionelle Boot, das lokale Essen und der Schwimmplatz waren perfekt. Unser Skipper war fantastisch und lehrte uns so viel über Mallorca.',
    'reviews.marcus': 'Genau das, was wir wollten - authentisch, entspannt und wunderschön. Die Tapas waren unglaublich und die Cala war wie das Paradies. Sehr empfehlenswert!',
    'reviews.emma': 'Beste Art, Mallorca vom Wasser aus zu sehen. Die Sonnenuntergangsfahrt war magisch und unsere Kinder liebten es, das traditionelle Boot segeln zu lernen.',
    
    // Common
    'common.name_placeholder': 'Vollständiger Name',
    'common.email_placeholder': 'ihre@email.com',
    'common.phone_placeholder': '+49 123 456 789',
  },
  fr: {
    // Navigation
    'nav.boats': 'Bateaux',
    'nav.contact': 'Contact',
    'nav.food_drink': 'Nourriture & Boisson',
    'nav.charter_guide': 'Guide Charter',
    'nav.special_offers': 'Offres Spéciales',
    'nav.calendar': 'Calendrier',
    
    // Hero Section
    'hero.title': 'Expérience Authentique de Navigation Majorquine',
    'hero.subtitle': 'Naviguez sur un llaut traditionnel avec des tapas locales et du vin dans des eaux turquoise',
    'hero.classic_llaut': 'Llaut Classique',
    'hero.local_tapas': 'Tapas Locales',
    'hero.swimming_stop': 'Arrêt Baignade',
    'hero.local_skipper': 'Skipper Local',
    
    // Booking Widget
    'booking.title': 'Réservez Votre Expérience',
    'booking.from_price': 'À partir de €99 par personne',
    'booking.guests': 'Invités',
    'booking.add_children': 'Ajouter des enfants',
    'booking.select_time': 'Sélectionner une heure',
    'booking.your_name': 'Votre Nom',
    'booking.email': 'E-mail',
    'booking.phone': 'Téléphone (avec indicatif pays)',
    'booking.special_requests': 'Demandes Spéciales (optionnel)',
    'booking.special_requests_placeholder': 'Occasions spéciales, exigences alimentaires ou demandes...',
    'booking.premium_upgrade': 'Amélioration Catering Premium',
    'booking.premium_upgrade_desc': 'Sélection de tapas améliorée avec des spécialités locales premium (+€20 par personne)',
    'booking.continue_payment': 'Continuer vers le Paiement',
    'booking.fill_details': 'Remplir les Détails pour Continuer',
    'booking.fully_insured': 'Entièrement Assuré',
    'booking.free_cancellation': 'Annulation Gratuite',
    'booking.secure_payment': 'Paiement Sécurisé',
    
    // Time Slots
    'timeslot.morning': 'Navigation Matinale',
    'timeslot.afternoon': 'Aventure de l\'Après-midi',
    'timeslot.sunset': 'Romance du Coucher de Soleil',
    'timeslot.morning_desc': 'Parfait pour les lève-tôt • Eaux calmes • Petit déjeuner léger',
    'timeslot.afternoon_desc': 'Expérience maximale • Déjeuner complet • Temps de baignade',
    'timeslot.sunset_desc': 'Heure magique • Tapas & vin • Vues inoubliables',
    'timeslot.unavailable': 'Indisponible',
    'timeslot.per_group': 'par groupe',
    'timeslot.up_to_guests': 'Jusqu\'à 12 invités',
    'timeslot.select_date_first': 'Sélectionnez une date pour voir les heures disponibles',
    'timeslot.choose_date_first': 'Choisissez d\'abord votre date de navigation préférée',
    'timeslot.checking_availability': 'Vérification de la disponibilité...',
    
    // What's Included
    'included.title': 'Ce Qui Est Inclus Dans Votre Expérience',
    'included.subtitle': 'Tout ce dont vous avez besoin pour une aventure de navigation majorquine authentique',
    'included.professional_skipper': 'Skipper Local Professionnel',
    'included.professional_skipper_desc': 'Capitaine expérimenté qui connaît les meilleurs endroits et peut vous enseigner les bases de la navigation',
    'included.authentic_tapas': 'Tapas Locales Authentiques',
    'included.authentic_tapas_desc': 'Tapas traditionnelles majorquines préparées avec des ingrédients locaux et du vin régional',
    'included.drinks_fruit': 'Boissons & Fruits Frais',
    'included.drinks_fruit_desc': 'Sélection de boissons, vin local et fruits frais de saison de Majorque',
    'included.swimming': 'Baignade dans les Eaux Turquoise',
    'included.swimming_desc': 'Arrêt dans une belle cala isolée avec des eaux méditerranéennes cristallines',
    'included.sailing_instruction': 'Instruction de Navigation',
    'included.sailing_instruction_desc': 'Apprenez à naviguer un llaut traditionnel ou détendez-vous simplement pendant que nous nous occupons de tout',
    'included.memories': 'Souvenirs Inoubliables',
    'included.memories_desc': 'Créez des souvenirs durables en naviguant à travers la magnifique Baie de Palma',
    
    // Social Proof
    'reviews.title': 'Ce Que Disent Nos Invités',
    'reviews.subtitle': 'Rejoignez des centaines d\'invités heureux qui ont vécu l\'authentique Majorque',
    'reviews.sarah': 'Expérience incroyable ! Le bateau traditionnel, la nourriture locale et le lieu de baignade étaient parfaits. Notre skipper était fantastique et nous a appris tant de choses sur Majorque.',
    'reviews.marcus': 'Exactement ce que nous voulions - authentique, détendu et magnifique. Les tapas étaient incroyables et la cala était comme le paradis. Hautement recommandé !',
    'reviews.emma': 'Meilleure façon de voir Majorque depuis l\'eau. Le voyage au coucher du soleil était magique et nos enfants ont adoré apprendre à naviguer le bateau traditionnel.',
    
    // Common
    'common.name_placeholder': 'Nom complet',
    'common.email_placeholder': 'votre@email.com',
    'common.phone_placeholder': '+33 1 23 45 67 89',
  }
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

interface TranslationProviderProps {
  children: ReactNode;
}

export const TranslationProvider: React.FC<TranslationProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferred-language', language);
  };

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  // Initialize language from localStorage
  React.useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const value: TranslationContextType = {
    currentLanguage,
    setLanguage,
    t,
    languages
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};