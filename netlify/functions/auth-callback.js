// Scratch Auth コールバック処理
exports.handler = async (event, context) => {
  const { privateCode } = event.queryStringParameters || {};

  if (!privateCode) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing privateCode' }),
    };
  }

  try {
    const response = await fetch(
      `https://auth.itinerary.eu.org/api/auth/verifyToken?privateCode=${privateCode}`
    );
    const data = await response.json();

    if (data.valid === true) {
      // 認証成功 → フロントエンドにリダイレクト（ユーザー情報をURLクエリで渡す）
      const username = data.username;
      const origin = event.headers.origin || 'https://your-site.netlify.app';
      // スクリプトで処理できるように、ハッシュパラメータで戻る
      return {
        statusCode: 302,
        headers: {
          Location: `${origin}/#q=home&scratch_user=${encodeURIComponent(username)}`,
        },
      };
    } else {
      return {
        statusCode: 403,
        body: JSON.stringify({ error: 'Authentication failed' }),
      };
    }
  } catch (err) {
    console.error('Scratch Auth Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server error' }),
    };
  }
};