// ECMAScript?
// ===========


  ECMAScript 1
      |  ECMAScript 2
      |      |  ECMAScript 3                     ECMAScript 4  ECMAScript 5      ECMAScript 6
 -----|------|------|----------------------------------------------|-------------------|-----
     1997   1998   1999   2000   2001   ...   2005   ...   2008   2009   2010   ...   2015










// ECMAScript 6?
// =============



	// Utvidelse av syntaks
	//		Block-scope
	//		Default-parametere
	//		Syntaksutvidelse i funksjoner,
	//		arrays, og
	//		objekter

	// Nye konsepter:
	//		Template literals
	//		Klasser
	//		Moduler (todo)
	//		Destructuring
	//		Promises
	//		Generators
	//
	//		Symboler (går ikke gjennom i dag)
	//		Map, Set         ('')
	//		Proxies          ('')

















// ... spread
// ==========




	var numbers = [40, 42, 521, 123]

	// ES5:
	console.log(
		Math.max.apply(this, numbers)
	);

	// ES6:
	console.log(
		Math.max(...numbers)
	);























// ... rest
// ========

	// ES5:
	function add (category) {
		var items = Array.prototype.slice.call(arguments, 1);
		items.forEach(function (item) {
			console.log('Legger til', item, 'i', category);
		});
	}

	add('cool bears', 'Ole Brumm', 'Smokey The Bear', 'Grumpy Bear');





	// ES6:
	function add (category, ...items) {
		items.forEach(function (item) {
			console.log('Legger til', item, 'i', category);
		});
	}

	add('cool bears', 'Ole Brumm', 'Smokey The Bear', 'Grumpy Bear');















// Shorthands for objekter
// =======================

	// Mindre å skrive (implisitt navn på keys)
	function createPerson(name, favoriteFood) {
		return {
			name,
			favoriteFood
		};
	}

	console.log(
		createPerson('Ole Brumm', 'Honning')
	);







	// Mindre å skrive (implisitt funksjonsdeklarering)
	var bear = {
		name: 'Ole Brumm',
		sayName() {
			console.log(`Hi, ${this.name}`);
		}
	};

	console.log(
		bear.sayName()
	);





	// Native _.assign(), _.extend(), $.extend() med Object.assign()
	var bear = {
		name: 'Ole Brumm',
		favoriteFood: 'Valnøtt'
	}

	Object.assign(bear, {
			favoriteFood: 'Honning'
		}, { 
			friends: [ 'Nøff' ]
		});

	console.log(bear);










// Arrays
// (iterators)
// ===========



	// for of over array
	var names = ['O Brumm', 'N Nøff'];
	for (var name of names) {
		console.log(name);
	}



	// for of over Set
	var uniques = new Set([1, 3, 4, 2, 3, 2, 17, 17, 1, 17]);
	for (var value of uniques) {
		console.log(value);
	}





















// Block scoping
// =============


	// ES5 (med bug):
	for (var i = 0; i < 3; i++) {
		setTimeout(function() {
			console.log(i);
		}, i * 500);
	}



	// ES6:
	for (let i = 0; i < 3; i++) {
		setTimeout(function() {
			console.log(i);
		}, i * 500);
	}






// todo: const. bruk const i stedet for let















// Arrow functions
// ===============


	var numbers = [1, 2, 3, 4, 5];

	// ES5:
	console.log(
		numbers.filter(function(item) { return item % 2 === 0 })
	);

	// ES6:
	console.log(
		numbers.filter( item => item % 2 === 0 )
	);


	// Ny metode (find)
	console.log(
		numbers.find( item => item % 2 === 0)
	);





	function _post (object, callback) {
		setTimeout(function () {
			callback();
		}, 500);
	}


	// Scoping av 'this'
	// ES5 (med bug):
	var Animal = (function () {
		function Animal(name) {
			this.name = name;
		}

		Animal.prototype.save = function () {
			_post(this, function () {
				console.log(this);
				this.updated_at = new Date();
				console.log('Updated at er nå ' + this.updated_at);
			});
		};

		 return Animal;
	})();

	console.log(new Animal('Ole Brumm').save());




	function _post (object, callback) {
		setTimeout(function () {
			callback();
		}, 500);
	}


	// ES6 (uten bug):
	let Animal = (function () {
		function Animal(name) {
			this.name = name;
		}

		Animal.prototype.save = function () {
			_post(this, () => {
				this.updated_at = new Date();
				console.log(this);
			});
		};

		 return Animal;
	})();


	console.log(new Animal('Ole Brumm').save());



















// Destructuring
// =============


	// Arrays
	var bears = [ 'Yogi', 'Ole Brumm', 'Baloo', 'Paw Paw Chuck'];
	var [, ole, baloo ] = bears;

	console.log(ole);
	console.log(baloo);



	// Objekter
	var oleBrumm = {
		firstName: 'Ole',
		lastName: 'Brumm',
		favoriteFood: 'Honning'
	};

	var { firstName, favoriteFood } = oleBrumm;
	console.log(firstName, 's favorittmat er', favoriteFood);



	// Fungerer også i funksjoner
	function say ({ firstName, favoriteFood }) {
		console.log(firstName, 's favorittmat er', favoriteFood);
	}

	say({ favoriteFood: 'honning', firstName: 'Ole' });




	function ajax(url, timeout, cache, method, callback) {
		console.log(method, ':', url, 'med timeout', timeout, 'og cache', cache);
	}

	ajax('/myUrl', undefined, undefined, 'post');

// Oppgave:
// 
// Skriv om 'ajax'-funksjonen til å ta i mot to argumenter i stedet for fem:
// Argument 1: url
// Argument 2: options-objekt
// 
// https://babeljs.io/repl/






//
//
//
//

	function ajax(url, { timeout, method, callback, cache }) {
		console.log(method, ':', url, 'med timeout', timeout, 'og cache', cache);
	}

	ajax('/myUrl', { method: 'post' });

//
//
//
//














// Default-parametere
// ==================

	// ES5:
	function log (message, level) {
		level = level || 'warning';

		console.log(level, ':', message);
	}


	// ES6:
	function log (message, level = 'warning') {
		console.log(level, ':', message);
	}





	// ES5:
	function ajax(url, timeout, cache, method, callback) {
		if (!timeout) {
			timeout = 1000;
		}
		if (!method) {
			method = 'get';
		}
		if (!callback) {
			callback = function () {};
		}
		if (!cache) {
			cache = true;
		}

		console.log(method, ':', url, 'med timeout', timeout, 'og cache', cache);
	}

	ajax('/myUrl', undefined, undefined, 'post');




// Oppgave:
//
// Fortsett på 'ajax'-funksjonen fra forrige oppgave, men innfør default-parametere
// Argument 1: url
// Argument 2: options-objekt med defaultverdier
// 
// https://babeljs.io/repl/






	//
	//
	//
	//

	function ajax(url, {
			timeout = 1000,
			method = 'get',
			callback = () => {},
			cache = true
		}) {
		console.log(method, ':', url, 'med timeout', timeout, 'og cache', cache);
	}

	ajax('/myUrl', { method: 'post' });

	//
	//
	//
	//
























// Classes
// =======

	class Animal {
		constructor (name) {
			this.name = name;
			this.numEyes = 2;
		}

		talk () {
			console.log(`I am ${this.name}, and I have ${this.numEyes} eye(s)`)
		}
	}


	class Cyclops extends Animal {
		constructor (name) {
			super(name);
			this.numEyes = 1;
		}
	}

	console.log (new Animal('Ole').talk());
	console.log (new Cyclops('Walt').talk());
















// Promises
// ========

	// Pyramid of doom
	step1(function (value1) {
		step2(value1, function(value2) {
			step3(value2, function(value3) {
				step4(value3, function(value4) {
					// Do something with value4
				}, function (error) {
					handleError(error);
				});
			}, function (error) {
				handleError(error);
			});
		}, function (error) {
			handleError(error);
		});
	});






	var promise = new Promise(function (resolve, reject) {
		window.setTimeout(function () {
			resolve([1,2,3]);
		}, 100);
	});

	promise.then(function (result) {
		console.log(result);
	}).catch(function (error) {
		console.log('Ops!');
	});





	// Pyramid of doom fikset med promises

	step1()
	.then(step2)
	.then(step3)
	.then(step4)
	.catch(handleError)




// Oppgave:
// Bruk promises til å levere et array med artikler etter 500ms. Bruk
// window.setTimeout for å simulere et AJAX-kall. Når artiklene er "levert",
// hent artikkelens sett med kommentarer og bruk console.log til å skrive ut posts


	// Eksempel på data:
	var articles = [
		{ articleId: 1, title: 'A fine article' }
	];

	var comments = [
		{ content: 'This article sucks' },
		{ content: 'Really good article' }
	];







	//
	//
	//
	//
	//

	let getArticles = () => {
		return new Promise((resolve, reject) => {
			window.setTimeout(() => resolve(articles), 500);
		}); 
	};

	let getComments = articleId => {
		return new Promise((resolve, reject) => {
			window.setTimeout(() => resolve(comments), 500);
		});
	};

	getArticles().then(articles => {
		articles.forEach(article => {
			getComments(article.articleId).then(comments => console.log(comments));
		});
	});


	//
	//
	//
	//
	//









// Generators
// ==========

	function *foo(startAt = 0) {
		var x = startAt;  
		var y = 0;
		while (x < startAt+10) {
			x = x + 1 + y;
			y = yield x;
		}
	}

	var gen = foo(10);
	console.log(gen.next());
	console.log(gen.next(1));
	console.log(gen.next(2));
	console.log(gen.next(3));























// Bruk?
// =====

	function _getArticleFromServer(url, success, error) {
		window.setTimeout(function () {
			success({ title: 'An article' });
		}, 100);
	}

	function _getCommentsFromServer(url, success, error) {
		window.setTimeout(function () {
			success([
				{ content: 'This is a fine article' }
			]);
		}, 200);
	}


	function getArticle(index, callback) {
		_getArticleFromServer('/articles/1', function (article) {
			_getCommentsFromServer('/articles/1/comments', function (comments) {
				article.comments = comments;
				callback(undefined, article);
			}, function (error) {
				callback(error);
			});
		}, function (error) {
			callback(error);
		});
	}

	console.log(
		getArticle(1, function (error, article) {
			if (error) {
				handleError(error);
			} else {
				console.log('Artikkel ', article);
			}
		})
	);




	// 
	// Opprydning i ansvar med Promises + Generator:
	//


	let _getArticleFromServer = (url) => {
		return new Promise((resolve, reject) => {
			let article = { articleId: 1, title: 'A fine article' };
			window.setTimeout(() => resolve(article), 1000);
		}); 
	};

	let _getCommentsFromServer = url => {
		let comments = [
			{ content: 'This article sucks' },
         	{ content: 'Really good article' }
		];
		return new Promise((resolve, reject) => {
			window.setTimeout(() => resolve(comments));
		});
	};


	var get = async(function *(url) {
		try {
			let article = yield _getArticleFromServer(url);
			article.comments = yield _getCommentsFromServer(url + '/comments');
			return article;
		} catch (e) {
			handleError(e);
		}
	});


	console.log(get('/articles/1').then(article => console.log(article)));



	

	function async(makeGenerator) {
		return function (...params) {
			var generator = makeGenerator(...params);

			function handle(result) { // { done: [Boolean], value: [Object] }
				if (result.done) {
					return result.value;
				}

				return result.value.then(function (res){
						return handle(generator.next(res));
					}).catch(function (err){
						return handle(generator.throw(err));
					});
			}

			return handle(generator.next())
		}
	}




// Andre eksempler
// ===============

	// Sekvens
	var get = async(function *(){
		var left = yield readJSON('left.json')
		var right = yield readJSON('right.json')
		return {left: left, right: right}
	});

	// Parallell
	var get = async(function *(){
		var left = readJSON('left.json')
		var right = readJSON('right.json')
		return {left: yield left, right: yield right}
	});

	// Loop
	var uploadDocuments = async(function *(documents){
		for (var document of documents) {
			yield upload(document)
		}
	});






















// ES6 allerede nå?
// ================

- Transpilers (Babel/Traceur/echo-js)
- Nativestøtte i nettlesere. http://kangax.github.io/compat-table/es6/





// Ressurser
// =========

- http://exploringjs.com
- http://kangax.github.io/compat-table/es6/