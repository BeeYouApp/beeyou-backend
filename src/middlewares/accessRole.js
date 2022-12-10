function access (...validRoles) {
    return (request, response, next) => {
        try {
            console.log('role del usuario logeado: ', request.roleCurrent)
            if(!validRoles.includes(request.roleCurrent)) throw new Error('Not Access')
            next()
        } catch (error) {
            response.status(403)
            response.json({
                success: false,
                message: error.message
            })
        }
    }

}

export {access};