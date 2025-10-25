export async function GET() {
  try {
    // Cloudflare D1 bağlantısı
    const d1Database = globalThis.D1_DATABASE;
    
    if (!d1Database) {
      return Response.json({
        success: false,
        message: 'Database connection failed'
      }, { status: 500 });
    }

    // Kategorileri getir
    const categories = await d1Database.prepare(`
      SELECT DISTINCT category 
      FROM blogs 
      WHERE published = true AND category IS NOT NULL AND category != ''
      ORDER BY category ASC
    `).all();

    return Response.json({
      success: true,
      data: categories.results.map(row => row.category)
    });

  } catch (error) {
    console.error('Kategoriler alınırken hata:', error);
    return Response.json({
      success: false,
      message: 'Kategoriler alınırken bir hata oluştu'
    }, { status: 500 });
  }
}
