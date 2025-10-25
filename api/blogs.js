// Cloudflare D1 Database için blog API
// D1: Cloudflare'nin ücretsiz SQL database'i

// D1 bağlantısı için export
export async function onRequestGet(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  
  try {
    // D1 database connection
    const db = env.D1_DATABASE;
    
    if (searchParams.get('slug')) {
      // Tek blog getir
      const slug = searchParams.get('slug');
      const result = await db.prepare(`
        SELECT * FROM blogs 
        WHERE slug = ? AND published = 1
      `).bind(slug).first();
      
      if (result) {
        // View count'u artır
        await db.prepare(`
          UPDATE blogs SET views = views + 1 
          WHERE id = ?
        `).bind(result.id).run();
        
        return new Response(JSON.stringify({
          success: true,
          data: result
        }), {
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        return new Response(JSON.stringify({
          success: false,
          message: 'Blog bulunamadı'
        }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } else {
      // Blog listesi
      const page = parseInt(searchParams.get('page')) || 1;
      const limit = parseInt(searchParams.get('limit')) || 6;
      const offset = (page - 1) * limit;
      const category = searchParams.get('category');
      const search = searchParams.get('search');
      
      let whereClause = 'WHERE published = 1';
      let params = [];
      
      if (category) {
        whereClause += ' AND category = ?';
        params.push(category);
      }
      
      if (search) {
        whereClause += ' AND (title LIKE ? OR content LIKE ? OR tags LIKE ?)';
        params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      }
      
      const blogs = await db.prepare(`
        SELECT * FROM blogs 
        ${whereClause}
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
      `).bind(limit, offset, ...params).all();
      
      // Content'i listelemeyelim (performance için)
      const blogsWithoutContent = blogs.map(blog => ({
        ...blog,
        content: null
      }));
      
      // Total count
      const countResult = await db.prepare(`
        SELECT COUNT(*) as total FROM blogs ${whereClause}
      `).bind(...params).first();
      
      return new Response(JSON.stringify({
        success: true,
        data: {
          blogs: blogsWithoutContent,
          pagination: {
            current: page,
            total: Math.ceil(countResult.total / limit),
            count: countResult.total
          }
        }
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error('D1 API Error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Sunucu hatası',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestPost(context) {
  const { env, request } = context;
  
  try {
    const db = env.D1_DATABASE;
    const body = await request.json();
    
    // Yeni blog oluştur
    const result = await db.prepare(`
      INSERT INTO blogs (title, slug, content, excerpt, cover_image, category, tags, published, reading_time, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
    `).bind(
      body.title,
      body.slug || generateSlug(body.title),
      body.content,
      body.excerpt,
      body.coverImage || '',
      body.category,
      JSON.stringify(body.tags || []),
      body.published ? 1 : 0,
      body.readingTime || 5
    ).run();
    
    return new Response(JSON.stringify({
      success: true,
      data: { id: result.meta.last_row_id }
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('D1 POST Error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Sunucu hatası',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestPut(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  
  try {
    const db = env.D1_DATABASE;
    const body = await request.json();
    
    // Blog güncelle
    await db.prepare(`
      UPDATE blogs SET 
        title = ?, slug = ?, content = ?, excerpt = ?, 
        cover_image = ?, category = ?, tags = ?, 
        published = ?, reading_time = ?, updated_at = datetime('now')
      WHERE id = ?
    `).bind(
      body.title,
      body.slug || generateSlug(body.title),
      body.content,
      body.excerpt,
      body.coverImage || '',
      body.category,
      JSON.stringify(body.tags || []),
      body.published ? 1 : 0,
      body.readingTime || 5,
      id
    ).run();
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Blog güncellendi'
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('D1 PUT Error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Sunucu hatası',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestDelete(context) {
  const { env, request } = context;
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  
  try {
    const db = env.D1_DATABASE;
    
    // Blog sil
    await db.prepare(`
      DELETE FROM blogs WHERE id = ?
    `).bind(id).run();
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Blog silindi'
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('D1 DELETE Error:', error);
    return new Response(JSON.stringify({
      success: false,
      message: 'Sunucu hatası',
      error: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Slug oluşturma fonksiyonu
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
