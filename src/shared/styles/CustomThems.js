// src/styles/CustomTheme.js
const CustomTheme = {
  colors: {
    primary: '#01A89E',       // Ana renk (turkuaz)
    secondary: '#FE893C',     // İkincil renk (turuncu)
    accent: '#4A6FA5',        // Vurgu rengi (mavi)
    white: '#FFFFFF',
    lightGray: '#F5F7FA',     // Arkaplan ve input arkaplan
    mediumGray: '#E5E7EB',    // Çizgiler ve borderlar
    darkGray: '#6B7280',      // Alt metinler
    black: '#111827',         // Ana metin rengi
    success: '#10B981',       // Başarı durumu
    error: '#EF4444',        // Hata durumu
    warning: '#F59E0B',       // Uyarı durumu
    placeholder: '#9CA3AF',    // Placeholder rengi
    secondaryPressed: '#e4782f', // pressed animasyonu için koyusu
    white: '#ffffff',
    black: '#000000',
    lightGray: '#eee',
    backgroundColor: '#f7f7f7',
    rippleBackground: '#01A89E15',
    ripple: '#01A89E20',        // %18 saydam turuncu efekt
    pressedBackground: '#FE893C10' // Hafif turuncu arkaplan tıklama anı için
  },
  fonts: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },
  spacing: {
    xsmall: 4,
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
    xxlarge: 40,
  },
  radius: {
    small: 8,
    medium: 12,
    large: 16,
    xlarge: 24,
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 8,
    },
  },
};

export default CustomTheme;