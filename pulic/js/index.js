import * as components from './components.js';
(function(doc) {
  'user strict';
  const app = (function() {

    const xhrList = new XMLHttpRequest();
    const xhrCategory = new XMLHttpRequest();
    const $container = doc.querySelector('[data-js="container-category"]');
    const $containerList = doc.querySelector('[data-js="container-list"]');

    function getCategoryList() {
      xhrList.open('GET', 'https://api.chucknorris.io/jokes/categories');
      xhrList.send();

      xhrList.addEventListener('readystatechange', handleStatus, false);

    }

    function handleStatus() {
      if (components.isRequestOk(xhrList)) {
        const data = components.parseData(xhrList);
        template(data);
      }
    }

    function attachEvents(element) {
      Array.from(element).map((item) => item.addEventListener('click', function(e) {
        const url = this.textContent;
        getCategorie(url);
      }));
    }

    function template(obj) {
      const markup = `
        <section>
            <ul data-js="categorie" class='list-category'>
              ${obj.map((item) => `<li>${item}</li>`).join('')}
            </ul>
        </section>
      `;

      $container.innerHTML = markup;

      const $categorie = doc.querySelectorAll('[data-js="categorie"] li');
      attachEvents($categorie);
    }

    function getCategorie(obj) {
      xhrCategory.open('GET', `https://api.chucknorris.io/jokes/random?category=${obj}`, true);
      xhrCategory.send();

      xhrCategory.addEventListener('readystatechange', handleStatusCategories, false);
    }

    function handleStatusCategories() {
      if (components.isRequestOk(xhrCategory)) {
        const dados = components.parseData(xhrCategory);
        templateInfo(dados);
      }
    }

    function templateInfo(obj) {
      const markupInfo = `
       <section>
        <div class='box-results-request'>
          <div class='thumb'><img src='${obj.icon_url}'></div>        
          <span class="title">Title: ${components.isNull(obj)}</span>
          <span>Link: <a href='${obj.url}' target='_blank'>${obj.url}</a></span>
          <span>Description: ${obj.value}</span>
        </div>
       </section>

      `;
      $containerList.innerHTML = markupInfo;
    }

    return {
      getCategoryList
    };
  })();

  app.getCategoryList();
})(document);