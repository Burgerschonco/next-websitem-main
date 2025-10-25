# Cloudflare D1 ile Blog Deploy Guide

## 🌩 **Cloudflare D1 Avantajları**

### ✅ **Neden D1?**
- **Ücretsiz** - 100MB storage, 25M okuma/gün
- **Hızlı** - Edge'de çalışır, latency düşük
- **SQL** - Query'ler daha hızlı
- **Global** - 200+ lokasyonda otomatik
- **Serverless** - Başlangıç maliyeti yok

## 🚀 **Deploy Adımları**

### 1. **Cloudflare Pages Setup**
1. Cloudflare hesabınıza gidin
2. Pages → Create project → Connect to Git
3. GitHub repo'nuzu bağlayın

### 2. **D1 Database Oluşturma**
```bash
# Wrangler kurulumu
npm install -g wrangler

# Login
wrangler login

# D1 database oluşturma
wrangler d1 create blog-db

# Schema import
wrangler d1 execute blog-db --file=./schema.sql
```

### 3. **Environment Variables**
Cloudflare Pages'te şu değişkenleri ekleyin:
```
D1_DATABASE=blog-db
NODE_ENV=production
```

### 4. **Build Settings**
```
Build command: npm run build
Build output directory: .next
Root directory: /
Node.js version: 18.x
```

## 📁 **Dosya Yapısı**

```
├── api/
│   ├── blogs-d1.js          # D1 API endpoint
│   └── categories-d1.js     # Kategoriler API
├── schema.sql               # Database schema
├── app/
│   ├── Blog/               # Blog sayfaları
│   └── Admin/              # Admin paneli
└── wrangler.toml           # Wrangler config
```

## 🔧 **D1 API Özellikleri**

### ✅ **CRUD Operations**
- `GET /api/blogs-d1` - Blog listesi
- `POST /api/blogs-d1` - Yeni blog
- `PUT /api/blogs-d1?id=x` - Blog güncelle
- `DELETE /api/blogs-d1?id=x` - Blog sil

### 📊 **Query Özellikleri**
```sql
-- Pagination
SELECT * FROM blogs 
WHERE published = 1 
ORDER BY created_at DESC 
LIMIT 6 OFFSET 0;

-- Search
SELECT * FROM blogs 
WHERE title LIKE '%nextjs%' 
OR content LIKE '%nextjs%';

-- Category filter
SELECT * FROM blogs 
WHERE category = 'teknoloji' 
AND published = 1;
```

## ⚡ **Performance Optimizasyonları**

### 1. **Index'ler**
```sql
-- Performans için index'ler
CREATE INDEX idx_blogs_published ON blogs(published);
CREATE INDEX idx_blogs_slug ON blogs(slug);
CREATE INDEX idx_blogs_search ON blogs(title, content);
```

### 2. **Query Optimization**
- Content'i listelemeyin (performans için)
- LIMIT ve OFFSET kullanın
- Prepared statements kullanın

### 3. **Caching**
```javascript
// Cloudflare KV ile caching
const CACHE = cache.env.CACHE;
const cacheKey = `blogs:${page}:${category}:${search}`;

const cached = await CACHE.get(cacheKey);
if (cached) return JSON.parse(cached);
```

## 🎨 **Frontend Adaptasyonu**

### API Call Değişiklikleri
```javascript
// Önce (MongoDB)
fetch('/api/blogs?search=nextjs')

// Şimdi (D1)
fetch('/api/blogs-d1?search=nextjs')
```

### Component Güncellemesi
```javascript
// app/Blog/page.js'de değişiklik
const fetchBlogs = async (page = 1, category = '', search = '') => {
  const response = await fetch(`/api/blogs-d1?page=${page}&category=${category}&search=${search}`);
  const data = await response.json();
  // ... rest aynı
};
```

## 📊 **D1 Limitleri**

### 🆓 **Ücretsiz Plan**
- **Storage**: 100MB
- **Reads**: 25M/gün
- **Writes**: 100K/gün
- **Rows**: 100M tablo başına

### 💡 **Optimizasyon İpuçları**
1. **Compress data**: JSON yerine string kullanın
2. **Batch operations**: Multi-insert kullanın
3. **Efficient queries**: SELECT * yerine specific fields
4. **Cache**: KV ile sık kullanılan verileri cache'leyin

## 🔧 **Wrangler Config**

```toml
# wrangler.toml
name = "blog-system"
main = "api/blogs-d1.js"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "D1_DATABASE"
database_name = "blog-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx"

[vars]
NODE_ENV = "production"
```

## 🚀 **Deploy Komutları**

```bash
# Local test
wrangler pages dev

# Production deploy
wrangler pages deploy

# Database seed
wrangler d1 execute blog-db --file=./schema.sql

# Data query
wrangler d1 execute blog-db --command="SELECT COUNT(*) FROM blogs"
```

## 📈 **Monitoring**

### 1. **Cloudflare Analytics**
- Page views
- API requests
- Error rates
- Performance metrics

### 2. **D1 Metrics**
```bash
# Usage kontrol
wrangler d1 info blog-db

# Query monitoring
wrangler d1 execute blog-db --command="SELECT * FROM blogs LIMIT 1"
```

## 🔐 **Security**

### 1. **Input Validation**
- SQL injection için prepared statements
- Request size limits
- Rate limiting

### 2. **CORS**
```javascript
// API'de CORS ayarı
return new Response(data, {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
});
```

## 🎯 **MongoDB vs D1 Karşılaştırma**

| Özellik | MongoDB Atlas | Cloudflare D1 |
|---------|-------------|--------------|
| **Maliyet** | Ücretsiz tier var | Tamamen ücretsiz |
| **Performance** | Global latency | Edge latency (daha hızlı) |
| **Scalability** | Auto-scaling | Built-in limits |
| **Query** | NoSQL | SQL |
| **Setup** | Connection string | Wrangler CLI |
| **Data** | Document-based | Relational |

## 🔄 **Migration**

### MongoDB → D1
```javascript
// Data migration script
const migrateData = async () => {
  // MongoDB'den veri çek
  const mongoBlogs = await fetchFromMongoDB();
  
  // D1'e aktar
  for (const blog of mongoBlogs) {
    await d1.prepare(`
      INSERT INTO blogs (title, slug, content, ...)
      VALUES (?, ?, ?, ...)
    `).bind(blog.title, blog.slug, blog.content).run();
  }
};
```

## 🎉 **Avantajları**

- **0 maliyet** - Startup için perfect
- **Global CDN** - Otomatik dağıtım
- **Edge computing** - Düşük latency
- **SQL power** - Kompleks query'ler
- **Easy deploy** - Git ile otomatik

---

**✨ Cloudflare D1 ile blog sisteminiz hazır!**
