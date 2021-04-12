exports.loadCSPSupport = (req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    'script-src-elem http://localhost:64561 http://localhost:3000/js/bundle.js https://api.mapbox.com/mapbox-gl-js/v0.54.0/mapbox-gl.js http://127.0.0.1:3000/api/v1/users/login http://localhost:52798 https://js.stripe.com/v3/'
  );
  //CORS Support
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  next();
};
