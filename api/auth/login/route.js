import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    // Basit authentication (gerçek projede database ile doğrulama yapılacak)
    if (username === 'admin' && password === 'admin123') {
      // JWT token oluştur (gerçekte crypto ile yapılacak)
      const token = Buffer.from(JSON.stringify({ 
        username, 
        timestamp: Date.now() 
      })).toString('base64');

      const response = NextResponse.json({
        success: true,
        message: 'Giriş başarılı',
        token: token,
        user: { username }
      });

      // CORS headers ekle
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

      return response;
    } else {
      const response = NextResponse.json({
        success: false,
        message: 'Kullanıcı adı veya şifre hatalı'
      }, { status: 401 });

      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

      return response;
    }
  } catch (error) {
    console.error('Login hatası:', error);
    const response = NextResponse.json({
      success: false,
      message: 'Sunucu hatası'
    }, { status: 500 });

    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

    return response;
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}
