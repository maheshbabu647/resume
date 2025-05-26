const isAdmin = (req, res, next) => {
    // Assumes 'protect' middleware runs first and attaches user to req

    if (req.user && req.user.userRole === 'admin') {

      next();

    } 
    else {

        const err = new Error()
        err.name = "ACCESS DENIED"
        err.message = "Access denied. Admin role required."
        err.status = 403

        next(err)
    }
  };
  
export {isAdmin}