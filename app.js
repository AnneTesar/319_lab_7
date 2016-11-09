var app = angular.module('myApp', ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "login.html"
    })
    .when("/librarian", {
        templateUrl : "librarian.html"
    })
    .when("/green", {
        templateUrl : "green.htm"
    })
    .when("/blue", {
        templateUrl : "blue.htm"
    });
});


app.controller('myCtrl', function($scope, $location, $http) {
	
	
	$scope.login = function() {
		var username = document.getElementById("username").value;
		var password = document.getElementById("password").value;
		
		if ((username == "admin") && (password == "admin")) {
			console.log("logging in as librarian");
			$location.path('/librarian');
		}
		else if (username.charAt(0).toLowerCase() != 'u') {
			alert("Username or Password is incorrect!");
		}
		else {
			//studentView(library, username);
			console.log("logging in as student");
		}
	}
	
	$scope.bookDetails = function(book) {
		console.log(book);
		var string = book.bookName;
		
		if (book.type == 'R') {
			string += " is a reference book. ";
		}
		else {
			string += " is not a reference book. ";
		}
		
		string += "It has been borrowed by "; 
		if (book.borrowedBy == "") {
			string += "nobody. ";
		}
		else {
			string += book.borrowedBy + ". ";
		}
		
		if (book.presence == 1) {
			string += "It is currently available to checkout. ";
		}
		else {
			string += "This book is currently checked out. ";
		}
		alert(string);
		
	}
	
	$scope.addBook = function() {
		console.log($scope.newBook);
		var book = {bookId:"", bookName:$scope.newBook.bookName, type:$scope.newBook.type, presence:1, borrowedBy:""};
		$scope.library[$scope.newBook.shelf].books.push(book);
		//$scope.$apply();
	}
	
	
	$scope.color = function(val) {
		if (val == 1) {
			return {'background-color': 'green'};
		}
		else {
			return {'background-color': 'red'};
		}
	}
	
	$scope.initLibrary = function() {
	
		var booksArt = [{bookId:0, bookName:"B0", type:"R", presence:1, borrowedBy:""},
						{bookId:4, bookName:"B4", type:"O", presence:1, borrowedBy:""},
						{bookId:8, bookName:"B8", type:"O", presence:1, borrowedBy:""},
						{bookId:12, bookName:"B12", type:"O", presence:1, borrowedBy:""},
						{bookId:16, bookName:"B16", type:"O", presence:1, borrowedBy:""},
						{bookId:20, bookName:"B20", type:"R", presence:1, borrowedBy:""},
						{bookId:24, bookName:"B24", type:"O", presence:1, borrowedBy:""}];
		var shelfArt = {name:"Art", books:booksArt};
		
		var booksScience = [{bookId:1, bookName:"B1", type:"R", presence:1, borrowedBy:""},
							{bookId:5, bookName:"B5", type:"O", presence:1, borrowedBy:""},
							{bookId:9, bookName:"B9", type:"O", presence:1, borrowedBy:""},
							{bookId:13, bookName:"B13", type:"O", presence:1, borrowedBy:""},
							{bookId:17, bookName:"B17", type:"O", presence:1, borrowedBy:""},
							{bookId:21, bookName:"B21", type:"O", presence:1, borrowedBy:""},
							{bookId:25, bookName:"B25", type:"O", presence:1, borrowedBy:""}];
		var shelfScience = {name:"Science", books:booksScience};
		
		var booksSport = [{bookId:2, bookName:"B2", type:"R", presence:1, borrowedBy:""},
						  {bookId:6, bookName:"B6", type:"O", presence:1, borrowedBy:""},
						  {bookId:10, bookName:"B10", type:"O", presence:1, borrowedBy:""},
						  {bookId:14, bookName:"B14", type:"O", presence:1, borrowedBy:""},
						  {bookId:18, bookName:"B18", type:"O", presence:1, borrowedBy:""},
						  {bookId:22, bookName:"B22", type:"O", presence:1, borrowedBy:""}];
		var shelfSport = {name:"Sport", books:booksSport};
		
		var booksLiterature = [{bookId:3, bookName:"B3", type:"R", presence:1, borrowedBy:""},
							   {bookId:7, bookName:"B5", type:"O", presence:1, borrowedBy:""},
							   {bookId:11, bookName:"B9", type:"O", presence:1, borrowedBy:""},
							   {bookId:15, bookName:"B13", type:"O", presence:1, borrowedBy:""},
							   {bookId:19, bookName:"B17", type:"O", presence:1, borrowedBy:""},
							   {bookId:23, bookName:"B21", type:"O", presence:1, borrowedBy:""}];
		var shelfLiterature = {name:"Literature", books:booksLiterature};
		
		$scope.library = [shelfArt, shelfScience, shelfSport, shelfLiterature];
		console.log($scope.library);
		
	};
});