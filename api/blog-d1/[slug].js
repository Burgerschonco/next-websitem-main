export async function GET(request, { params }) {
  try {
    const { slug } = params;

    // Cloudflare D1 bağlantısı
    const d1Database = globalThis.D1_DATABASE;
    
    if (!d1Database) {
      return Response.json({
        success: false,
        message: 'Database connection failed'
      }, { status: 500 });
    }

    // Blog'u getir
    const blog = await d1Database.prepare(`
      SELECT id, title, slug, excerpt, content, category, tags, cover_image, 
             published, reading_time, views, created_at, updated_at
      FROM blogs 
      WHERE slug = ? AND published = true
    `).bind(slug).first();

    if (!blog) {
      return Response.json({
        success: false,
        message: 'Blog yazısı bulunamadı'
      }, { status: 404 });
    }

    // View count'u artır
    await d1Database.prepare(`
      UPDATE blogs 
      SET views = views + 1 
      WHERE id = ?
    `).bind(blog.id).run();

    // Tags'ı parse et
    if (blog.tags) {
      try {
        blog.tags = JSON.parse(blog.tags);
      } catch {
        blog.tags = [];
      }
    } else {
      blog.tags = [];
    }

    return Response.json({
      success: true,
      data: blog
    });

  } catch (error) {
    console.error('Blog alınırken hata:', error);
    return Response.json({
      success: false,
      message: 'Blog alınırken bir hata oluştu'
    }, { status: 500 });
  }
}
