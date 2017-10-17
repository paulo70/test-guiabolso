(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRequestOk = isRequestOk;
exports.parseData = parseData;
exports.isNull = isNull;
function isRequestOk(elem) {
  return elem.readyState === 4 && elem.status === 200;
}

function parseData(elem) {
  return JSON.parse(elem.responseText);
}

function isNull(elem) {
  if (elem.category === null) {
    elem.category = 'explict';
  }
  return elem.category;
}

},{}],2:[function(require,module,exports){
'use strict';

var _components = require('./components.js');

var components = _interopRequireWildcard(_components);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

(function (doc) {
  var app = function () {

    var ajxList = new XMLHttpRequest();
    var ajxCategory = new XMLHttpRequest();
    var $container = doc.querySelector('[data-js="container-category"]');
    var $containerList = doc.querySelector('[data-js="container-list"]');

    function getCategoryList() {
      ajxList.open('GET', 'https://api.chucknorris.io/jokes/categories');
      ajxList.send();

      ajxList.addEventListener('readystatechange', handleStatus, false);
    }

    function handleStatus() {
      if (components.isRequestOk(ajxList)) {
        var data = components.parseData(ajxList);
        template(data);
      }
    }

    function attachEvents(element) {
      Array.from(element).map(function (item) {
        return item.addEventListener('click', function (e) {
          var url = this.textContent;
          getCategorie(url);
          console.log(url);
        });
      });
    }

    function template(obj) {
      var markup = '\n        <section>\n            <ul data-js="categorie" class=\'list-category\'>\n              ' + obj.map(function (item) {
        return '<li>' + item + '</li>';
      }).join('') + '\n            </ul>\n        </section>\n      ';

      $container.innerHTML = markup;

      var $categorie = doc.querySelectorAll('[data-js="categorie"] li');
      attachEvents($categorie);
    }

    function getCategorie(obj) {
      ajxCategory.open('GET', 'https://api.chucknorris.io/jokes/random?category=' + obj, true);
      ajxCategory.send();

      ajxCategory.addEventListener('readystatechange', handleStatusCategories, false);
    }

    function handleStatusCategories() {
      if (components.isRequestOk(ajxCategory)) {
        var dados = components.parseData(ajxCategory);
        templateInfo(dados);
      }
    }

    function templateInfo(obj) {
      var markupInfo = '\n       <section>\n        <div class=\'box-results-request\'>\n          <div class=\'thumb\'><img src=\'' + obj.icon_url + '\'></div>        \n          <span>' + components.isNull(obj) + '</span>\n          <span><a href=\'' + obj.url + '\' target=\'_blank\'>' + obj.url + '</a></span>\n          <span>' + obj.value + '</span>\n        </div>\n       </section>\n\n      ';
      $containerList.innerHTML = markupInfo;
    }

    return {
      getCategoryList: getCategoryList
    };
  }();

  app.getCategoryList();
})(document);

},{"./components.js":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9jb21wb25lbnRzLmpzIiwianMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztRQ0FnQixXLEdBQUEsVztRQUlBLFMsR0FBQSxTO1FBSUEsTSxHQUFBLE07QUFSVCxTQUFTLFdBQVQsQ0FBcUIsSUFBckIsRUFBMkI7QUFDaEMsU0FBTyxLQUFLLFVBQUwsS0FBb0IsQ0FBcEIsSUFBeUIsS0FBSyxNQUFMLEtBQWdCLEdBQWhEO0FBQ0Q7O0FBRU0sU0FBUyxTQUFULENBQW1CLElBQW5CLEVBQXlCO0FBQzlCLFNBQU8sS0FBSyxLQUFMLENBQVcsS0FBSyxZQUFoQixDQUFQO0FBQ0Q7O0FBRU0sU0FBUyxNQUFULENBQWdCLElBQWhCLEVBQXNCO0FBQzNCLE1BQUksS0FBSyxRQUFMLEtBQWtCLElBQXRCLEVBQTRCO0FBQzFCLFNBQUssUUFBTCxHQUFnQixTQUFoQjtBQUNEO0FBQ0QsU0FBTyxLQUFLLFFBQVo7QUFDRDs7Ozs7QUNiRDs7SUFBWSxVOzs7O0FBQ1osQ0FBQyxVQUFTLEdBQVQsRUFBYztBQUNiLE1BQU0sTUFBTyxZQUFXOztBQUV0QixRQUFNLFVBQVUsSUFBSSxjQUFKLEVBQWhCO0FBQ0EsUUFBTSxjQUFjLElBQUksY0FBSixFQUFwQjtBQUNBLFFBQU0sYUFBYSxJQUFJLGFBQUosQ0FBa0IsZ0NBQWxCLENBQW5CO0FBQ0EsUUFBTSxpQkFBaUIsSUFBSSxhQUFKLENBQWtCLDRCQUFsQixDQUF2Qjs7QUFFQSxhQUFTLGVBQVQsR0FBMkI7QUFDekIsY0FBUSxJQUFSLENBQWEsS0FBYixFQUFvQiw2Q0FBcEI7QUFDQSxjQUFRLElBQVI7O0FBRUEsY0FBUSxnQkFBUixDQUF5QixrQkFBekIsRUFBNkMsWUFBN0MsRUFBMkQsS0FBM0Q7QUFFRDs7QUFFRCxhQUFTLFlBQVQsR0FBd0I7QUFDdEIsVUFBSSxXQUFXLFdBQVgsQ0FBdUIsT0FBdkIsQ0FBSixFQUFxQztBQUNuQyxZQUFNLE9BQU8sV0FBVyxTQUFYLENBQXFCLE9BQXJCLENBQWI7QUFDQSxpQkFBUyxJQUFUO0FBQ0Q7QUFDRjs7QUFFRCxhQUFTLFlBQVQsQ0FBc0IsT0FBdEIsRUFBK0I7QUFDN0IsWUFBTSxJQUFOLENBQVcsT0FBWCxFQUFvQixHQUFwQixDQUF3QixVQUFDLElBQUQ7QUFBQSxlQUFVLEtBQUssZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsVUFBUyxDQUFULEVBQVk7QUFDM0UsY0FBTSxNQUFNLEtBQUssV0FBakI7QUFDQSx1QkFBYSxHQUFiO0FBQ0Esa0JBQVEsR0FBUixDQUFZLEdBQVo7QUFDRCxTQUppQyxDQUFWO0FBQUEsT0FBeEI7QUFLRDs7QUFFRCxhQUFTLFFBQVQsQ0FBa0IsR0FBbEIsRUFBdUI7QUFDckIsVUFBTSwrR0FHSSxJQUFJLEdBQUosQ0FBUSxVQUFDLElBQUQ7QUFBQSx3QkFBaUIsSUFBakI7QUFBQSxPQUFSLEVBQXNDLElBQXRDLENBQTJDLEVBQTNDLENBSEosb0RBQU47O0FBUUEsaUJBQVcsU0FBWCxHQUF1QixNQUF2Qjs7QUFFQSxVQUFNLGFBQWEsSUFBSSxnQkFBSixDQUFxQiwwQkFBckIsQ0FBbkI7QUFDQSxtQkFBYSxVQUFiO0FBQ0Q7O0FBRUQsYUFBUyxZQUFULENBQXNCLEdBQXRCLEVBQTJCO0FBQ3pCLGtCQUFZLElBQVosQ0FBaUIsS0FBakIsd0RBQTRFLEdBQTVFLEVBQW1GLElBQW5GO0FBQ0Esa0JBQVksSUFBWjs7QUFFQSxrQkFBWSxnQkFBWixDQUE2QixrQkFBN0IsRUFBaUQsc0JBQWpELEVBQXlFLEtBQXpFO0FBQ0Q7O0FBRUQsYUFBUyxzQkFBVCxHQUFrQztBQUNoQyxVQUFJLFdBQVcsV0FBWCxDQUF1QixXQUF2QixDQUFKLEVBQXlDO0FBQ3ZDLFlBQU0sUUFBUSxXQUFXLFNBQVgsQ0FBcUIsV0FBckIsQ0FBZDtBQUNBLHFCQUFhLEtBQWI7QUFDRDtBQUNGOztBQUVELGFBQVMsWUFBVCxDQUFzQixHQUF0QixFQUEyQjtBQUN6QixVQUFNLDZIQUc2QixJQUFJLFFBSGpDLDJDQUlNLFdBQVcsTUFBWCxDQUFrQixHQUFsQixDQUpOLDJDQUtlLElBQUksR0FMbkIsNkJBSzJDLElBQUksR0FML0MscUNBTU0sSUFBSSxLQU5WLHlEQUFOO0FBV0EscUJBQWUsU0FBZixHQUEyQixVQUEzQjtBQUNEOztBQUVELFdBQU87QUFDTDtBQURLLEtBQVA7QUFHRCxHQTdFVyxFQUFaOztBQStFQSxNQUFJLGVBQUo7QUFDRCxDQWpGRCxFQWlGRyxRQWpGSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJleHBvcnQgZnVuY3Rpb24gaXNSZXF1ZXN0T2soZWxlbSkge1xuICByZXR1cm4gZWxlbS5yZWFkeVN0YXRlID09PSA0ICYmIGVsZW0uc3RhdHVzID09PSAyMDA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZURhdGEoZWxlbSkge1xuICByZXR1cm4gSlNPTi5wYXJzZShlbGVtLnJlc3BvbnNlVGV4dClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVsbChlbGVtKSB7XG4gIGlmIChlbGVtLmNhdGVnb3J5ID09PSBudWxsKSB7XG4gICAgZWxlbS5jYXRlZ29yeSA9ICdleHBsaWN0JztcbiAgfVxuICByZXR1cm4gZWxlbS5jYXRlZ29yeTtcbn0iLCJpbXBvcnQgKiBhcyBjb21wb25lbnRzIGZyb20gJy4vY29tcG9uZW50cy5qcydcbihmdW5jdGlvbihkb2MpIHtcbiAgY29uc3QgYXBwID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgYWp4TGlzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIGNvbnN0IGFqeENhdGVnb3J5ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgY29uc3QgJGNvbnRhaW5lciA9IGRvYy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1qcz1cImNvbnRhaW5lci1jYXRlZ29yeVwiXScpO1xuICAgIGNvbnN0ICRjb250YWluZXJMaXN0ID0gZG9jLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWpzPVwiY29udGFpbmVyLWxpc3RcIl0nKTtcblxuICAgIGZ1bmN0aW9uIGdldENhdGVnb3J5TGlzdCgpIHtcbiAgICAgIGFqeExpc3Qub3BlbignR0VUJywgJ2h0dHBzOi8vYXBpLmNodWNrbm9ycmlzLmlvL2pva2VzL2NhdGVnb3JpZXMnKTtcbiAgICAgIGFqeExpc3Quc2VuZCgpO1xuXG4gICAgICBhanhMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3JlYWR5c3RhdGVjaGFuZ2UnLCBoYW5kbGVTdGF0dXMsIGZhbHNlKTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVN0YXR1cygpIHtcbiAgICAgIGlmIChjb21wb25lbnRzLmlzUmVxdWVzdE9rKGFqeExpc3QpKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBjb21wb25lbnRzLnBhcnNlRGF0YShhanhMaXN0KTtcbiAgICAgICAgdGVtcGxhdGUoZGF0YSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXR0YWNoRXZlbnRzKGVsZW1lbnQpIHtcbiAgICAgIEFycmF5LmZyb20oZWxlbWVudCkubWFwKChpdGVtKSA9PiBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLnRleHRDb250ZW50O1xuICAgICAgICBnZXRDYXRlZ29yaWUodXJsKTtcbiAgICAgICAgY29uc29sZS5sb2codXJsKTtcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0ZW1wbGF0ZShvYmopIHtcbiAgICAgIGNvbnN0IG1hcmt1cCA9IGBcbiAgICAgICAgPHNlY3Rpb24+XG4gICAgICAgICAgICA8dWwgZGF0YS1qcz1cImNhdGVnb3JpZVwiIGNsYXNzPSdsaXN0LWNhdGVnb3J5Jz5cbiAgICAgICAgICAgICAgJHtvYmoubWFwKChpdGVtKSA9PiBgPGxpPiR7aXRlbX08L2xpPmApLmpvaW4oJycpfVxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgYDtcblxuICAgICAgJGNvbnRhaW5lci5pbm5lckhUTUwgPSBtYXJrdXA7XG5cbiAgICAgIGNvbnN0ICRjYXRlZ29yaWUgPSBkb2MucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtanM9XCJjYXRlZ29yaWVcIl0gbGknKTtcbiAgICAgIGF0dGFjaEV2ZW50cygkY2F0ZWdvcmllKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDYXRlZ29yaWUob2JqKSB7XG4gICAgICBhanhDYXRlZ29yeS5vcGVuKCdHRVQnLCBgaHR0cHM6Ly9hcGkuY2h1Y2tub3JyaXMuaW8vam9rZXMvcmFuZG9tP2NhdGVnb3J5PSR7b2JqfWAsIHRydWUpO1xuICAgICAgYWp4Q2F0ZWdvcnkuc2VuZCgpO1xuXG4gICAgICBhanhDYXRlZ29yeS5hZGRFdmVudExpc3RlbmVyKCdyZWFkeXN0YXRlY2hhbmdlJywgaGFuZGxlU3RhdHVzQ2F0ZWdvcmllcywgZmFsc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVN0YXR1c0NhdGVnb3JpZXMoKSB7XG4gICAgICBpZiAoY29tcG9uZW50cy5pc1JlcXVlc3RPayhhanhDYXRlZ29yeSkpIHtcbiAgICAgICAgY29uc3QgZGFkb3MgPSBjb21wb25lbnRzLnBhcnNlRGF0YShhanhDYXRlZ29yeSk7XG4gICAgICAgIHRlbXBsYXRlSW5mbyhkYWRvcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGVtcGxhdGVJbmZvKG9iaikge1xuICAgICAgY29uc3QgbWFya3VwSW5mbyA9IGBcbiAgICAgICA8c2VjdGlvbj5cbiAgICAgICAgPGRpdiBjbGFzcz0nYm94LXJlc3VsdHMtcmVxdWVzdCc+XG4gICAgICAgICAgPGRpdiBjbGFzcz0ndGh1bWInPjxpbWcgc3JjPScke29iai5pY29uX3VybH0nPjwvZGl2PiAgICAgICAgXG4gICAgICAgICAgPHNwYW4+JHtjb21wb25lbnRzLmlzTnVsbChvYmopfTwvc3Bhbj5cbiAgICAgICAgICA8c3Bhbj48YSBocmVmPScke29iai51cmx9JyB0YXJnZXQ9J19ibGFuayc+JHtvYmoudXJsfTwvYT48L3NwYW4+XG4gICAgICAgICAgPHNwYW4+JHtvYmoudmFsdWV9PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICA8L3NlY3Rpb24+XG5cbiAgICAgIGBcbiAgICAgICRjb250YWluZXJMaXN0LmlubmVySFRNTCA9IG1hcmt1cEluZm87XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGdldENhdGVnb3J5TGlzdFxuICAgIH1cbiAgfSkoKTtcblxuICBhcHAuZ2V0Q2F0ZWdvcnlMaXN0KCk7XG59KShkb2N1bWVudCk7Il19
