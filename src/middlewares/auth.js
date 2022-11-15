import jwt from "../libs/jwt.js";

function auth(request, response, next) {
  try {
    const { authorization: token } = request.headers;

    const tokenDecoded = jwt.verify(token);

    if (!tokenDecoded) throw new Error("No autorizado");
    request.currentUser = tokenDecoded.id;
    // request.currentCompany = tokenDecoded.id; ???
    request.userCurrent = tokenDecoded.id;
    // request.roleCurrent = tokenDecoded.role
    next();
  } catch (error) {
    response.status(401);
    response.json({
      success: false,
      error: error.message,
    });
  }
}

export { auth };
