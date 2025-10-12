# 🎨 Portfolio Website - Style Guide

## Renk Sistemi

### Ana Renkler
```css
--bg-light: #F8F5E7;
--bg-dark: #1A1A1A;
--accent: #2B2B2B;
--text-dark-mode: #E6E6E6;
--text-light-mode: #3C3C3C;
--border-light: #E6E6E6;
--border-dark: #3C3C3C;
```

### Proje Gradientleri
```css
E-ticaret: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)
Blog/CMS: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
Chat: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)
Analytics: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)
```

## Typography Scale

```
Heading 1: text-4xl md:text-5xl font-extrabold
Heading 2: text-3xl md:text-4xl font-bold
Heading 3: text-2xl md:text-3xl font-bold
Heading 4: text-xl md:text-2xl font-semibold
Body Large: text-lg md:text-xl
Body: text-base md:text-lg
Body Small: text-sm md:text-base
Caption: text-xs md:text-sm
```

## Spacing System

```
xs: 0.5rem (2px)
sm: 1rem (4px)
md: 1.5rem (6px)
lg: 2rem (8px)
xl: 3rem (12px)
2xl: 4rem (16px)
```

## Border Radius

```
sm: rounded-lg (8px)
md: rounded-xl (12px)
lg: rounded-2xl (16px)
full: rounded-full (9999px)
```

## Shadow Levels

```
sm: shadow-md
md: shadow-lg
lg: shadow-xl
xl: shadow-2xl
```

## Animation Timing

```
fast: 150ms
normal: 300ms
slow: 600ms
very-slow: 1000ms (maksimum)
```

## Z-Index Scale

```
base: 0
dropdown: 10
sticky: 20
fixed: 30
modal-backdrop: 40
modal: 50
popover: 60
tooltip: 70
```

## Breakpoints

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

## Component Variants

### Button
```javascript
// Primary
className="px-8 py-3 rounded-full font-semibold bg-[#2B2B2B] text-white hover:bg-[#1A1A1A]"

// Secondary
className="px-8 py-3 rounded-full font-semibold bg-white text-[#2B2B2B] border-2 border-[#2B2B2B]"
```

### Card
```javascript
className="p-6 rounded-2xl shadow-lg border transition-all duration-300"
style={{ 
  backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FFFFFF',
  borderColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6'
}}
```

### Input
```javascript
className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none"
style={{
  backgroundColor: theme === 'dark' ? '#2B2B2B' : '#FFFFFF',
  color: theme === 'dark' ? '#E6E6E6' : '#1A1A1A',
  borderColor: theme === 'dark' ? '#3C3C3C' : '#E6E6E6'
}}
```

## Icon Kullanımı

### Size Scale
```
sm: text-sm (14px)
md: text-base (16px)
lg: text-lg (18px)
xl: text-xl (20px)
2xl: text-2xl (24px)
3xl: text-3xl (30px)
4xl: text-4xl (36px)
```

### Kullanılan Icon Kütüphaneleri
- `react-icons/fa` - FontAwesome
- `react-icons/si` - Simple Icons
- `react-icons/hi` - Hero Icons

## Grid System

### Projeler
```
Mobile: grid-cols-1
Tablet: md:grid-cols-2
Desktop: lg:grid-cols-4
```

### Services
```
Mobile: grid-cols-1
Desktop: md:grid-cols-3
```

## Hover States

### Cards
```
hover:shadow-xl
hover:scale-105
transition-all duration-300
```

### Buttons
```
hover:scale-110
hover:shadow-2xl
transition-all duration-300
```

### Links
```
hover:opacity-80
transition-opacity duration-200
```
