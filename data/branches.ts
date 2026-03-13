export interface Branch {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  address: {
    en: string;
    ar: string;
  };
  city: {
    en: string;
    ar: string;
  };
  phone: string;
  mapLink: string;
  workingHours?: {
    en: string;
    ar: string;
  };
}

export const branches: Branch[] = [
  {
    id: 'miami',
    name: {
      en: 'Miami Branch',
      ar: 'فرع ميامي',
    },
    address: {
      en: '37 Eskander Ibrahim St. after El-Eissawy intersection, Miami, Alexandria',
      ar: '37 شارع اسكندر إبراهيم بعد تقاطع العيسوي - ميامي - الإسكندرية',
    },
    city: {
      en: 'Alexandria',
      ar: 'الإسكندرية',
    },
    phone: '035536200',
    mapLink: 'https://g.page/Event-Miami',
  },
  {
    id: 'eissawy',
    name: {
      en: 'El-Eissawy Branch',
      ar: 'فرع العيسوي',
    },
    address: {
      en: 'Bekbashi El-Eissawy St. next to Alban El-Asdekaa, Alexandria',
      ar: 'شارع بكباشي العيسوي بجوار البان الاصدقاء - الإسكندرية',
    },
    city: {
      en: 'Alexandria',
      ar: 'الإسكندرية',
    },
    phone: '035536673',
    mapLink: 'https://goo.gl/maps/s8tP5XahaLFaQNNaA',
  },
  {
    id: 'bitash',
    name: {
      en: 'Bitash Branch',
      ar: 'فرع البيطاش',
    },
    address: {
      en: 'Main Bitash St. next to National Bank of Egypt before El-Qaeda St., Alexandria',
      ar: 'شارع البيطاش الرئيسى بجانب البنك الأهلي المصري قبل شارع القاعدة - الإسكندرية',
    },
    city: {
      en: 'Alexandria',
      ar: 'الإسكندرية',
    },
    phone: '033081643',
    mapLink: 'https://g.page/event-clothing-al-agami',
  },
  {
    id: 'louran',
    name: {
      en: 'Louran Branch',
      ar: 'فرع لوران',
    },
    address: {
      en: '236 Abdel Salam Aref - Tram before Shaarawy St. (Next to Junior Store), Alexandria',
      ar: '236 عبد السلام عارف - الترام قبل ش شعراوى ( بجوار محل جونيور ) - الإسكندرية',
    },
    city: {
      en: 'Alexandria',
      ar: 'الإسكندرية',
    },
    phone: '01212684373',
    mapLink: 'https://g.page/Event_Louran',
  },
  {
    id: 'khaled',
    name: {
      en: 'Khaled bin Walid Branch',
      ar: 'فرع خالد بن الوليد',
    },
    address: {
      en: '236 Khaled Ibn El-Waleed St. next to El-Zaeem Restaurant, Alexandria',
      ar: '236 شارع خالد ابن الوليد بجوار مطعم الزعيم - الإسكندرية',
    },
    city: {
      en: 'Alexandria',
      ar: 'الإسكندرية',
    },
    phone: '035521521',
    mapLink: 'https://g.page/ev_outlet',
  },
  {
    id: 'mansoura',
    name: {
      en: 'Mansoura Branch',
      ar: 'فرع المنصورة',
    },
    address: {
      en: 'Ahmed Maher St. in front of El-Baron Palace next to Rayahin, Mansoura',
      ar: 'شارع أحمد ماهر امام قصر البارون بجوار رياحين - المنصورة',
    },
    city: {
      en: 'Mansoura',
      ar: 'المنصورة',
    },
    phone: '01068520059',
    mapLink: 'https://maps.app.goo.gl/DAVjp998rpBhc7Xy9',
  },
];
