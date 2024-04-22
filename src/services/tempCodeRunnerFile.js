	getAllCharacters = async () => {
		const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`)
		console.log(res.data.results.map(this._transformCharacter)) 
	}
	getAllCharacters()