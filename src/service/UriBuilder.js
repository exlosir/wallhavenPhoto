
export default class UriBuilder {

    #baseUri
    #params

    constructor(_baseUri, _params) {
        this.#baseUri = _baseUri,
        this.#params = _params
    }

    build = () => {
        var uri = this.#baseUri + "?";
        for (var prop in this.#params) {
            if(typeof(this.#params[prop]) == 'object') {
                var multiParam = '';
                for(var [key,value] of Object.entries(this.#params[prop])) {
                    multiParam += value;
                }
                uri += prop + '=' + multiParam + '&'
            }else {
                uri += prop + '=' + this.#params[prop] + '&'
            }
        }
        uri = uri.slice(0, -1);
        return uri;
    }

}