var app = angular.module('myApp', ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "login.html"
    })
    .when("/librarian", {
        templateUrl : "librarian.html"
    })
    .when("/student", {
        templateUrl : "student.html"
    })
});


app.controller('myCtrl', function($scope, $location, $http, $rootScope) {
	$rootScope.username;
	var password;
	$scope.shelfIndex = {};
	$scope.checkOut = {};
	$scope.returning = {};
	
	$scope.login = function() {
		$rootScope.username = document.getElementById("username").value;
		password = document.getElementById("password").value;
		
		if (($rootScope.username == "admin") && (password == "admin")) {
			console.log("logging in as librarian");
			$location.path('/librarian');
		}
		else if ($rootScope.username.charAt(0).toLowerCase() != 'u') {
			alert("Username or Password is incorrect!");
		}
		else {
			console.log("logging in as student");
			$location.path('/student');
			getUsersBooks();
		}
	}
	
	getUsersBooks = function() {
		$rootScope.userBooks = [];
		for (i = 0; i < $scope.library.length; i++) {
			for (j = 0; j < $scope.library[i].books.length; j++) {
				if ($scope.library[i].books[j].borrowedBy == $rootScope.username) {
					$rootScope.userBooks.push($scope.library[i].books[j]);
				}
			}
		}
		console.log($rootScope.userBooks);
	}
	
	$scope.checkoutBook = function() {
		if ($scope.checkOut.book.presence == 0) {
			alert("This book is not available." );
		}
		else if ($scope.checkOut.book.type == 'R') {
			alert("You cannot check out a reference book.");
		}
		else if ($rootScope.userBooks.length >= 2) {
			alert("You already have two books checked out. Please return one before checking out another.");
		}
		else {
			$scope.checkOut.book.presence = 0;
			$scope.checkOut.book.borrowedBy = $rootScope.username;
		}
		getUsersBooks();
	}
	
	$scope.returnBook = function() {
		console.log($scope.returning.book);
		var index = $rootScope.userBooks.indexOf($scope.returning.book);
		$rootScope.userBooks.splice(index, 1);
		$scope.returning.book.presence = 1;
		$scope.returning.book.borrowedBy = "";
	}
	
	$scope.bookDetails = function(book) {
		console.log($rootScope.username);
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
	}
	
	$scope.logout = function() {
		$location.path('/');
	}
	
	$scope.color = function(val) {
		if (val == 1) {
			return {'background-color': 'white'};
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
		
		$rootScope.library = [shelfArt, shelfScience, shelfSport, shelfLiterature];
		console.log($rootScope.library);
		
	};
});