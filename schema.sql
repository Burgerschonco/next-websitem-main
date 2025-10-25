-- Cloudflare D1 Database Schema
-- Blog tablosu için SQL schema

CREATE TABLE IF NOT EXISTS blogs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  cover_image TEXT DEFAULT '',
  category TEXT NOT NULL,
  tags TEXT DEFAULT '[]',
  published INTEGER DEFAULT 0,
  reading_time INTEGER DEFAULT 5,
  author_name TEXT DEFAULT 'Süleyman Talha Duman',
  author_email TEXT DEFAULT 'talha@example.com',
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Index'ler için performans
CREATE INDEX IF NOT EXISTS idx_blogs_published ON blogs(published);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_category ON blogs(category);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blogs_search ON blogs(title, content);

-- Categories tablosu (optional)
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Blog-Category ilişki tablosu (many-to-many için)
CREATE TABLE IF NOT EXISTS blog_categories (
  blog_id INTEGER,
  category_id INTEGER,
  FOREIGN KEY (blog_id) REFERENCES blogs(id),
  FOREIGN KEY (category_id) REFERENCES categories(id),
  PRIMARY KEY (blog_id, category_id)
);

-- Örnek data
INSERT OR IGNORE INTO blogs (title, slug, content, excerpt, category, tags, published, reading_time) VALUES
('İlk Blog Yazım', 'ilk-blog-yazim', 'Bu benim ilk blog yazımın içeriği...', 'Blog yazmaya başlangıç', 'blog', '["yazılım", "blog", "yeni başlangıç"]', 1, 5),
('Next.js ile Blog Sistemi', 'nextjs-blog-sistemi', 'Next.js kullanarak nasıl blog sistemi yapılır...', 'Next.js tutorial', 'teknoloji', '["nextjs", "react", "blog"]', 1, 8),
('Cloudflare D1 Database', 'cloudflare-d1-database', 'Cloudflare D1 database özellikleri...', 'Cloudflare', 'bulut', '["cloudflare", "database", "d1"]', 1, 6);

-- Örnek kategoriler
INSERT OR IGNORE INTO categories (name, slug) VALUES
('blog', 'blog'),
('teknoloji', 'teknoloji'),
('bulut', 'bulut'),
('yazılım', 'yazilim');
