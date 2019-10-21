(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{106:function(e,t,a){},127:function(e,t,a){"use strict";a.r(t);var n=a(1),o=a.n(n),r=a(43),c=a.n(r),l=(a(54),a(29),a(10)),s=a(11),u=a(13),i=a(12),m=a(14),h=(a(55),a(46)),f=a(17),p=a(8);function v(){return o.a.createElement("div",null,o.a.createElement(p.Navbar,{brand:o.a.createElement("a",{href:"https://github.com/vpvnguyen/google-books-react",target:"_blank",rel:"noopener noreferrer"},"Google Books"),centerLogo:!0,alignLinks:"left"},o.a.createElement(p.NavItem,{href:"/"},"Search"),o.a.createElement(p.NavItem,{href:"/saved"},"Save")))}var g=a(129),b=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement(g.a,null,o.a.createElement("h1",null,"Google Books Search!"),o.a.createElement("p",null,"This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information."))}}]),t}(n.Component),d=(a(106),a(19)),k=a.n(d),E={getBooks:function(e){return k.a.get("https://www.googleapis.com/books/v1/volumes?q=".concat(e))},getSavedBooks:function(){return k.a.get("/api/books/")},deleteBook:function(e){return k.a.delete("/api/books/".concat(e))},saveBook:function(e){return k.a.post("/api/books",e)}},j=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(u.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(o)))).saveBook=function(){console.log("save"),E.getSavedBooks().then(function(e){console.log("API.getSavedBooks()"),console.log(e)}).catch(function(e){console.log("API ERROR: ".concat(e))})},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this;return o.a.createElement("div",{className:"row mt-5"},this.props.searchResults.map(function(t){return o.a.createElement(p.Card,{className:"container",key:"card"+t.id,actions:[o.a.createElement(p.Button,{key:"view"+t.id},o.a.createElement("a",{href:t.volumeInfo.infoLink,target:"_blank",rel:"noopener noreferrer"},"View")),o.a.createElement(p.Button,{key:"save"+t.id,onClick:e.saveBook},"Save")]},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-md-3"},o.a.createElement("img",{src:t.volumeInfo.imageLinks.smallThumbnail,alt:"",className:"imgclass"})),o.a.createElement("div",{className:"col-md-9"},o.a.createElement("h6",null,t.volumeInfo.title),o.a.createElement("p",null,"Author: ",t.volumeInfo.authors[0]),o.a.createElement("p",null,"Rating: ",t.volumeInfo.averageRating?t.volumeInfo.averageRating:"No Rating"),o.a.createElement("p",null,"Desc: ",t.volumeInfo.description))))}))}}]),t}(n.Component),O=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(u.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(o)))).state={searchInput:"",searchResults:[],isSearched:!1},a.handleChange=function(e){a.setState({searchInput:e.target.value})},a.getBooks=function(e){e.preventDefault();var t=a.state.searchInput.trim();console.log("Search Input: ".concat(t)),k.a.get("https://www.googleapis.com/books/v1/volumes?q=".concat(t)).then(function(e){a.setState({searchResults:e.data.items}),console.log(a.state.searchResults)}).catch(function(e){if(e)throw e})},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:"container"},o.a.createElement("form",{className:"col-md-12"},o.a.createElement(p.TextInput,{label:"Search for a book...",value:this.state.searchInput,onChange:this.handleChange}),o.a.createElement(p.Button,{type:"submit",waves:"light",onClick:this.getBooks},"Submit",o.a.createElement(p.Icon,{right:!0},"send"))),this.state.searchResults&&this.state.searchResults.length>0?o.a.createElement(j,{searchResults:this.state.searchResults}):"nothing")}}]),t}(n.Component),y=function(e){function t(){var e,a;Object(l.a)(this,t);for(var n=arguments.length,o=new Array(n),r=0;r<n;r++)o[r]=arguments[r];return(a=Object(u.a)(this,(e=Object(i.a)(t)).call.apply(e,[this].concat(o)))).state={books:[]},a.loadBooks=function(){E.getBooks().then(function(e){return a.setState({books:e.data})}).catch(function(e){return console.log(e)})},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"componentDidMount",value:function(){this.loadBooks()}},{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{style:{backgroundColor:"lightgrey"}}," route2",o.a.createElement("p",null,"saved section"),o.a.createElement("p",null,"map and render saved books from mongo"),o.a.createElement("p",null,"view book"),o.a.createElement("p",null,"delete book"),o.a.createElement("p",null,"title, subinfo, author, image, abstract")))}}]),t}(n.Component),w=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(v,null),o.a.createElement(b,null),o.a.createElement(h.a,null,o.a.createElement("div",null,o.a.createElement(f.c,null,o.a.createElement(f.a,{exact:!0,path:"/",component:O}),o.a.createElement(f.a,{exact:!0,path:"/saved",component:y})))))}}]),t}(n.Component);c.a.render(o.a.createElement(w,null),document.getElementById("root"))},49:function(e,t,a){e.exports=a(127)},54:function(e,t,a){},55:function(e,t,a){}},[[49,1,2]]]);
//# sourceMappingURL=main.8e39128a.chunk.js.map