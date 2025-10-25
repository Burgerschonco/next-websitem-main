export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '6');
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';

    // Cloudflare D1 bağlantısı
    const d1Database = globalThis.D1_DATABASE;
    
    if (!d1Database) {
      return Response.json({
        success: false,
        message: 'Database connection failed'
      }, { status: 500 });
    }

    // Filtreleme
    let whereClause = 'WHERE published = true';
    let params = [];

    if (category) {
      whereClause += ' AND category = ?';
      params.push(category);
    }

    if (search) {
      whereClause += ' AND (title LIKE ? OR content LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    // Toplam sayı
    const countResult = await d1Database.prepare(
      `SELECT COUNT(*) as total FROM blogs ${whereClause}`
    ).bind(...params).first();

    const total = countResult.total;

    // Blogları getir
    const offset = (page - 1) * limit;
    const blogs = await d1Database.prepare(`
      SELECT id, title, slug, excerpt, content, category, tags, cover_image, 
             published, reading_time, views, created_at, updated_at
      FROM blogs 
      ${whereClause}
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `).bind(...params, limit, offset).all();

    // Pagination hesapla
    const totalPages = Math.ceil(total / limit);

    return Response.json({
      success: true,
      data: {
        blogs: blogs.results,
        pagination: {
          current: page,
          total: totalPages,
          limit: limit,
          totalItems: total
        }
      }
    });

  } catch (error) {
    console.error('Bloglar alınırken hata:', error);
    return Response.json({
      success: false,
      message: 'Bloglar alınırken bir hata oluştu'
    }, { status: 500 });
  }
}
