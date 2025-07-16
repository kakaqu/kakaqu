import CustomTheme from '../../../shared/styles/CustomThems';

export default {
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 4,
  },
  shopTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: CustomTheme.colors.secondary,
    textAlign: 'center',
    marginBottom: 4,
  },
  question: {
    fontSize: 16,
    color: CustomTheme.colors.primary,
    textAlign: 'center',
    marginBottom: 50,
  },
// styles.js (veya mevcut style dosyan)
actions: {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  marginTop: 24,
  gap: 12, // desteklenmiyorsa: marginRight kullan
},
cancelButton: {
  width: 90,              // kesin genişlik
  height: 36,             // kesin yükseklik
  backgroundColor: '#fff', // beyaz arka plan
  borderWidth: 1,
  borderColor: '#333',    // koyu gri/siyah kenar çizgisi
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 0,   // gerekirse sıfırla
},
cancelText: {
  color: '#000',          // siyah yazı
  fontWeight: '500',
  fontSize: 14,
  textAlign: 'center',
},
confirmButton: {
  width: 110,
  height: 36,
  backgroundColor: CustomTheme.colors.primary,
  borderRadius: 8,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 0,
},
confirmText: {
  color: '#fff',
  fontWeight: '600',
  fontSize: 14,
  textAlign: 'center',
},

};
