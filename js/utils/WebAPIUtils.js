var WebApiUtils = {
    get: function(url, data, successCallback, errorCallback) {
        $.ajax({
            type: 'GET',
            url: url,
            data: data
        })
        .done(successCallback)
        .fail(errorCallback);
    },
    
    post: function(url, data, successCallback, errorCallback) {
        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify(data),
            contentType: 'application/json'
        })
        .done(successCallback)
        .fail(errorCallback);
    }
};

module.exports = WebApiUtils;