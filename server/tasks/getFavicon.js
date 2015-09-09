var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));
var cheerio = require('cheerio');

module.exports = function(products) {
  return Promise.all(products.map(function(product) {
    return getFavicon(product.value());
  }));
}

var getFavicon = function(productModel) {
  return request.getAsync(productModel[0].product_url)
    .spread(function(response, body) {
      var favicon = null;

      var $ = cheerio.load(body);
      var faviconStrings = ['link[rel="shortcut icon"]', 
                            'link[rel="icon"]'];
      for(var i = 0; i < faviconStrings.length; i++) {
        var guess = $(faviconStrings[i]).attr('href');
        favicon = (guess) ? guess: null;
      }  

      if(favicon) {
        productModel[0].favicon_url = favicon;
        //productModel.save();
      }
      return [productModel];
    })
    .catch(function(e) {
      console.log(e);
    });
};
