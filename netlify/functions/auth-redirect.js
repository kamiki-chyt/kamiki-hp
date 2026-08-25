// Scratch Auth リダイレクト用
exports.handler = async (event, context) => {
  // コールバックURL（この関数のURL）
  const redirectUri = `${event.headers.origin}/.netlify/functions/auth-callback`;
  const encodedRedirect = Buffer.from(redirectUri).toString('base64');
  
  const authUrl = `https://auth.itinerary.eu.org/auth/?redirect=${encodedRedirect}&name=神木チャンネル`;

  return {
    statusCode: 302,
    headers: {
      Location: authUrl,
    },
  };
};