-- Sample blog data
INSERT INTO blogs (id, title, slug, excerpt, content, category, tags, cover_image, reading_time, views, created_at, updated_at) VALUES
(
  '1',
  'Cloudflare D1 ile Edge Database Devrimi',
  'cloudflare-d1-edge-database',
  'Modern web uygulamaları için Edge Database''in gücü ve avantajları.',
  '# Cloudflare D1 ile Edge Database Devrimi

Modern web geliştiriminde performans en kritik faktörlerden biri. Geleneksel database çözümleri coğrafi uzaklık nedeniyle latency sorunlarına yol açabilir. İşte bu noktada Cloudflare D1 devreye giriyor.

## Edge Computing Nedir?

Edge computing, verinin merkezi sunucular yerine kullanıcıya en yakın noktalarda işlenmesi anlamına gelir. Bu yaklaşım sayesinde:

- Daha düşük latency
- Daha iyi kullanıcı deneyimi
- Global ölçeklenebilirlik

## Cloudflare D1 Avantajları

### 1. Performans
- **Global CDN**: 200+ lokasyonda dağıtım
- **Low Latency**: Kullanıcıya en yakın noktadan erişim
- **SQL Gücü**: Relational database özellikleri

### 2. Maliyet
- **Tamamen Ücretsiz**: 100MB storage, 25M okuma/gün
- **Beklenmedik Maliyet Yok**: Kullanım bazlı ücretlendirme
- **Zero Maintenance**: Otomatik scaling ve yönetim

### 3. Geliştirme Deneyimi
- **Familiari Syntax**: SQL desteği
- **Easy Integration**: Wrangler CLI ile kolay setup
- **Local Development**: Geliştirme ortamı desteği

## Kullanım Senaryoları

D1 şu kullanım alanları için ideal:

- Blog sistemleri
- E-ticaret katalogları
- Kullanıcı profilleri
- Config verileri
- Cache katmanları

## Sonuç

Cloudflare D1, modern web uygulamaları için mükemmel bir çözüm sunuyor. Ücretsiz olması ve performans avantajları ile küçük-büyük ölçekli projeler için tercih edilebilir.',
  'Teknoloji',
  '["cloudflare", "database", "edge-computing", "web-development"]',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
  5,
  156,
  '2024-01-15 10:00:00',
  '2024-01-15 10:00:00'
),
(
  '2',
  'Next.js 14 App Router İle Modern Web Geliştirme',
  'nextjs-14-app-router',
  'Next.js 14''ün App Router özelliği ve getirdiği yenilikler.',
  '# Next.js 14 App Router İle Modern Web Geliştirme

Next.js 14 ile birlikte gelen App Router, React uygulamaları geliştirmeyi tamamen değiştiriyor. Server Components, streaming ve daha birçok yenilik ile daha performanslı uygulamalar geliştirebiliriz.

## App Router Nedir?

App Router, Next.js 13 ile tanıtılan ve Next.js 14 ile olgunlaşan yeni routing sistemidir. Pages Router''a göre birçok avantaj sunar:

### Ana Özellikler

1. **Server Components**: Varsayılan olarak server-side render
2. **Streaming**: Parçalar halinde yükleme
3. **Layout Sharing**: Ortak layout yapıları
4. **Nested Routes**: İç içe routing yapısı

## Server Components vs Client Components

### Server Components
- Server''da çalışır
- Direct database erişimi
- Daha küçük bundle size
- SEO dostu

### Client Components
- Browser''da çalışır
- Interactivity destekler
- State ve lifecycle hooks
- "use client" ile işaretlenir

## Performance Avantajları

App Router sayesinde:

- **Faster Initial Load**: Sadece gerekli JavaScript yüklenir
- **Better SEO**: Server-side rendering
- **Smaller Bundles**: Code splitting otomatik
- **Improved UX**: Streaming ile daha hızlı içerik

## Migration

Pages Router''dan App Router''a geçiş:

1. app/ klasörü oluştur
2. Layout''ları tanımla
3. Server/Client component''leri ayır
4. Metadata ekle

## Sonuç

Next.js 14 App Router, modern web geliştirme için güçlü araçlar sunuyor. Performance, SEO ve geliştirme deneyimi açısından büyük avantajlar sağlıyor.',
  'Web Geliştirme',
  '["nextjs", "react", "app-router", "web-development"]',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
  6,
  203,
  '2024-01-12 14:30:00',
  '2024-01-12 14:30:00'
),
(
  '3',
  'TypeScript İle Type Safe React Geliştirme',
  'typescript-react-type-safe',
  'TypeScript kullanarak React uygulamalarında type safety nasıl sağlanır?',
  '# TypeScript İle Type Safe React Geliştirme

Modern frontend geliştirmede type safety kritik öneme sahiptir. TypeScript ve React kombinasyonu, runtime hatalarını minimize ederek daha güvenli uygulamalar geliştirmemizi sağlar.

## TypeScript Avantajları

### 1. Early Error Detection
- Compile time hata tespiti
- IDE desteği ile auto-completion
- Refactoring güvenliği

### 2. Better Developer Experience
- Intellisense
- Type hints
- Documentation within code

### 3. Code Quality
- Self-documenting code
- Better maintainability
- Team collaboration

## React İle TypeScript Kullanımı

### Component Typing

```typescript
interface Props {
  title: string;
  count: number;
  onClick: () => void;
}

const Component: React.FC<Props> = ({ title, count, onClick }) => {
  return (
    <button onClick={onClick}>
      {title} ({count})
    </button>
  );
};
```

### Hook Typing

```typescript
const [user, setUser] = useState<User | null>(null);

const data = useQuery<ResultType>({
  queryKey: ["key"],
  queryFn: async () => {
    return api.getData();
  }
});
```

## Best Practices

### 1. Strict Mode Kullanımı
```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

### 2. Generics Kullanımı
```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
}
```

### 3. Utility Types
```typescript
type PartialUser = Partial<User>;
type UserWithId = Required<Pick<User, "id">>;
```

## Advanced Patterns

### 1. Conditional Types
```typescript
type RequiredProps<T, K extends keyof T> = T & Required<Pick<T, K>>;
```

### 2. Discriminated Unions
```typescript
type LoadingState = { status: "loading" };
type SuccessState<T> = { status: "success"; data: T };
type ErrorState = { status: "error"; error: string };

type State<T> = LoadingState | SuccessState<T> | ErrorState;
```

## Sonuç

TypeScript, React uygulamaları için güçlü bir araçtır. Type safety sayesinde daha güvenli, bakımı kolay ve ölçeklenebilir uygulamalar geliştirebiliriz.',
  'Programlama',
  '["typescript", "react", "type-safety", "javascript"]',
  'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
  7,
  178,
  '2024-01-10 09:15:00',
  '2024-01-10 09:15:00'
);
