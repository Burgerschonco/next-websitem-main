# 🔒 Portfolio Website - Proje Kuralları

## ⚠️ KESİNLİKLE YAPILMAYACAKLAR

### 1. Custom Tailwind Class'ları
```javascript
// ❌ YANLIŞ
className="bg-custom-lightest text-custom-accent"

// ✅ DOĞRU
style={{ 
  backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F5E7',
  color: theme === 'dark' ? '#FFFFFF' : '#2B2B2B'
}}
```

### 2. Emoji Kullanımı
```javascript
// ❌ YANLIŞ
<p>🎯 Odak Alanlarım:</p>

// ✅ DOĞRU
<p><FaBullseye className="text-lg" /> Odak Alanlarım:</p>
```

### 3. Dalgalar ve Dekoratif SVG'ler
```javascript
// ❌ YANLIŞ
<svg viewBox="0 0 1440 100">
  <path d="M0,50 Q360,0 720,50..." />
</svg>

// ✅ DOĞRU
// Hiç ekleme! Site minimal kalacak.
```

### 4. Gereksiz Animasyonlar
```javascript
// ❌ YANLIŞ
transition={{ delay: 3.5 }} // Çok uzun!

// ✅ DOĞRU
transition={{ delay: 0.3 }} // Maksimum 1s
```

### 5. Yeni Package Ekleme
```bash
# ❌ YANLIŞ
npm install random-package

# ✅ DOĞRU
# Önce kullanıcıya sor!
```

## ✅ ZORUNLU YAPILACAKLAR

### 1. Dark Mode Desteği
Her yeni component:
```javascript
style={{ 
  backgroundColor: theme === 'dark' ? '#1A1A1A' : '#F8F5E7',
  color: theme === 'dark' ? '#E6E6E6' : '#3C3C3C'
}}
```

### 2. Responsive Design
```javascript
className="text-base md:text-lg px-4 sm:px-6 lg:px-8"
```

### 3. Accessibility
```javascript
<button aria-label="Close menu">
  <FaTimes />
</button>
```

### 4. Loading States
```javascript
if (!mounted) {
  return <LoadingSpinner />;
}
```

### 5. Error Handling
```javascript
try {
  // code
} catch (error) {
  console.error(error);
  // show error message
}
```

## 📏 Kod Standartları

### Import Sıralaması
```javascript
// 1. React & Next.js
import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import dynamic from 'next/dynamic';

// 2. Third-party libraries
import { motion } from 'framer-motion';

// 3. Icons
import { FaIcon } from 'react-icons/fa';
import { SiIcon } from 'react-icons/si';

// 4. Local components
import CustomComponent from './components/CustomComponent';
```

### Component Yapısı
```javascript
const Component = () => {
  // 1. Hooks
  const { theme } = useTheme();
  const [state, setState] = useState();
  
  // 2. Effects
  useEffect(() => {
    // ...
    return () => {
      // cleanup
    };
  }, []);
  
  // 3. Functions
  const handleClick = () => {};
  
  // 4. Render
  return (
    <div>
      {/* JSX */}
    </div>
  );
};
```

### State Naming
```javascript
// ✅ DOĞRU
const [isLoading, setIsLoading] = useState(false);
const [userData, setUserData] = useState(null);
const [activeTab, setActiveTab] = useState('home');

// ❌ YANLIŞ
const [x, setX] = useState(false);
const [data, setData] = useState(null);
const [tab, setTab] = useState('home');
```

## 🎯 Performance Kuralları

### 1. Lazy Loading
```javascript
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});
```

### 2. Memoization
```javascript
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

### 3. Callback Optimization
```javascript
const handleClick = useCallback(() => {
  // ...
}, [dependencies]);
```

## 🔐 Security Checklist

- [ ] External links: `rel="noopener noreferrer"`
- [ ] Form validation: Client + Server
- [ ] XSS koruması: Sanitize input
- [ ] HTTPS only
- [ ] Environment variables: `.env.local`

## 📱 Mobile-First Checklist

- [ ] Touch targets: 44x44px minimum
- [ ] Font sizes: 16px minimum (body)
- [ ] Viewport meta tag: OK
- [ ] Responsive images: OK
- [ ] Smooth scroll: `behavior: 'smooth'`

## 🧪 Testing Workflow

1. **Development**
   ```bash
   npm run dev
   ```

2. **Check:**
   - [ ] Light mode
   - [ ] Dark mode
   - [ ] Mobile (375px)
   - [ ] Tablet (768px)
   - [ ] Desktop (1440px)

3. **Accessibility Test**
   - [ ] Keyboard navigation
   - [ ] Screen reader compatible
   - [ ] Color contrast OK

4. **Performance Test**
   - [ ] Lighthouse score > 90
   - [ ] No console errors
   - [ ] Fast load time

## 📝 Commit Workflow

1. **Before Commit:**
   ```bash
   # Check for errors
   npm run lint
   
   # Test build
   npm run build
   ```

2. **Commit Message:**
   ```
   type: description
   
   - Detail 1
   - Detail 2
   ```

3. **Types:**
   - `feat:` Yeni özellik
   - `fix:` Bug fix
   - `style:` UI değişikliği
   - `refactor:` Code cleanup
   - `perf:` Performance
   - `docs:` Documentation

## 🚨 Red Flags (Kullanıcıya sor!)

1. Breaking change yapılacaksa
2. Yeni dependency eklenecekse
3. Tasarım büyük değişecekse
4. Mevcut component silinecekse
5. API değişecekse

## 🎨 Tasarım Kararları

### Renkler
- Değiştirme! Sabit palet kullan
- Gradientler: Sadece projeler için
- Opacity: 0.9, 0.8, 0.25, 0.35

### Spacing
- 4px multiples: 4, 8, 12, 16, 24, 32, 48, 64
- Negative space: Bol kullan
- Padding > Margin

### Typography
- Font family: System fonts
- Line height: 1.5-1.75
- Letter spacing: Normal

## 🔄 Update Workflow

1. **Küçük değişiklik:**
   - Doğrudan yap
   - Test et
   - Commit

2. **Orta değişiklik:**
   - Plan yap
   - Test et
   - Kullanıcıya göster
   - Commit

3. **Büyük değişiklik:**
   - Kullanıcıya sor
   - Plan onayı al
   - Yap
   - Test et
   - Review
   - Commit

---

**Not:** Bu kuralların dışına çıkma! Belirsiz durumda KULLANICIYA SOR!
