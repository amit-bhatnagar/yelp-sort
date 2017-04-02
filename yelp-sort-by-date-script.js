
// Sample Yelp business URL
// https://www.yelp.com/biz/kings-of-punjab-sunnyvale-2?sort_by=date_desc

var sortBy = encodeURI('sort_by=date_desc');

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  
  if (changeInfo.status == 'complete' && tab.active) {
  var url = tab.url;
  
  // Replace only on Yelp page of a business
  //and only if the URL does not already contain a sort-by parameter
  if(url.includes("www.yelp.com/biz") && !(url.includes("sort_by")) ){
  var paramStart = (url.indexOf('#') === -1) ? url.length : url.indexOf('#');
  var querySymbol = (url.indexOf('?') === -1) ? '?' : '&';
  
  //Construct a new URL by adding the new sort-by parameter 
  var newUrl = url.substring(0, paramStart) + querySymbol + sortBy +
               url.substring(paramStart);

  // Now reload the page with the reviews sorted by the provided sort-by parameter
  chrome.tabs.update(tab.id, {url: newUrl});
   
}
  }
});

