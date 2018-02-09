(function (ns, Url) {

    var _webSearch = new google.search.WebSearch();
    var _options;

    function getUrlOptions() {
        var parameters = new Map();
        var result = {
            parameters: parameters,
            site: ""
        };

        if (Url == null)
            return result;

        var values = document.URL.split('?');        
        var site = values[0];
        site = site.substring(0, site.length - 12)
        result.site = site;        
        values.splice(0, 1);
        if (values.length == 0)
            return result;

        var values = values[0].split('&');
        for (var index = 0, pair; index < values.length; index++) {
            keyValue = values[index].split('=');
            if (keyValue.length < 2)
                continue;

            var key = unescape(keyValue[0]);
            var value = decodeURIComponent(keyValue[1]);
            parameters[key] = value;
        }
        
        result.parameters = parameters;
        return result;
    }

    function buildSearchLineElement(url, title, content) {        
        var ret = "<tr class='search result row'>" +
            "<td>" +
            "<div class='blg_post_right'>" + 
            "<div class='blg_post_title'>" + title + "</div>" +
            "<p class='blg_post_content'>" + content + "</p>" +
            "<div class='blg_post_read_more'><a href='" + url + "'>Read More</a></div>" +
            "</div><div class='close_but'><i class='close1'></i></div>" +
            "</td>" +
            "</tr>";
        return ret;
    }

    function webSearchComplete(searcher, searchNum) {
        var results = searcher.results;
        var lines = ""
        var search = searcher.hf;
        results.forEach(function (result, index, results) {
            lines += buildSearchLineElement(result.unescapedUrl, result.titleNoFormatting, result.content);
        });

        var query = _options.parameters["search"];
        var queryHtml = "<input class='search query blg_search' name='search' value = '" + query + "'>";
        $("input.search.query").replaceWith(queryHtml);
        if (lines == "")
            return;

        $("div.search.query").replaceWith(queryHtml);
        $("tr.search.result.row").remove();
        $("table.search.result").append(lines);
    }

 
    function performSearch() {        
        _options = getUrlOptions();
        var search = _options.parameters["search"];
        if (search != null) {
            search = "site:" + _options.site + " " + search;
            _webSearch.execute(search);
        }
    }

    function actions() {
        performSearch();
    }

    _webSearch.setSearchCompleteCallback(this, webSearchComplete, [_webSearch]);

    //Assure the listeners to be executed after the page is loaded.
    var g_dependencies = $.when($.Deferred(function (deferred) { $(deferred.resolve); }));
    g_dependencies.fail(function () { console.log("Fail to load dependencies"); });
    g_dependencies.done(actions);

})(this,
document.URL)