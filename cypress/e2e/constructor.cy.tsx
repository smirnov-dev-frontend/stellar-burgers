const bunId = '643d69a5c3f7b9001cfa093c';
const mainId = '643d69a5c3f7b9001cfa0941';
const sauceId = '643d69a5c3f7b9001cfa0942';

describe('Страница конструктора бургера', () => {
   beforeEach(() => {
      cy.intercept('GET', '**/ingredients', {
         fixture: 'ingredients.json'
      }).as('getIngredients');
   });

   afterEach(() => {
      cy.clearCookie('accessToken');
      cy.window().then((window) => {
         window.localStorage.removeItem('refreshToken');
      });
   });

   it('должна добавлять булку и начинку в конструктор', () => {
      cy.visit('/');
      cy.wait('@getIngredients');

      cy.get(`[data-cy="add-ingredient-${bunId}"]`).contains('Добавить').click();
      cy.get(`[data-cy="add-ingredient-${mainId}"]`).contains('Добавить').click();

      cy.get('[data-cy="constructor-bun-top"]').should(
         'contain',
         'Краторная булка N-200i (верх)'
      );
      cy.get('[data-cy="constructor-bun-bottom"]').should(
         'contain',
         'Краторная булка N-200i (низ)'
      );
      cy.get(`[data-cy="constructor-ingredient-${mainId}"]`).should(
         'contain',
         'Биокотлета из марсианской Магнолии'
      );
   });

   it('должна открывать модальное окно ингредиента с данными выбранного ингредиента', () => {
      cy.visit('/');
      cy.wait('@getIngredients');

      cy.get(`[data-cy="ingredient-link-${bunId}"]`).click();

      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal"]').should('contain', 'Детали ингредиента');
      cy.get('[data-cy="modal"]').should('contain', 'Краторная булка N-200i');
      cy.get('[data-cy="modal"]').should('contain', '420');
      cy.get('[data-cy="modal"]').should('contain', '80');
      cy.get('[data-cy="modal"]').should('contain', '24');
      cy.get('[data-cy="modal"]').should('contain', '53');
   });

   it('должна закрывать модальное окно ингредиента по клику на крестик', () => {
      cy.visit('/');
      cy.wait('@getIngredients');

      cy.get(`[data-cy="ingredient-link-${mainId}"]`).click();

      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal"]').should(
         'contain',
         'Биокотлета из марсианской Магнолии'
      );

      cy.get('[data-cy="modal-close-button"]').find('svg').click({ force: true });

      cy.get('[data-cy="modal"]').should('not.exist');
   });

   it('должна закрывать модальное окно ингредиента по клику на оверлей', () => {
      cy.visit('/');
      cy.wait('@getIngredients');

      cy.get(`[data-cy="ingredient-link-${sauceId}"]`).click();

      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal"]').should('contain', 'Соус Spicy-X');

      cy.get('[data-cy="modal-overlay"]').click({ force: true });

      cy.get('[data-cy="modal"]').should('not.exist');
   });

   it('должна создавать заказ и очищать конструктор после успешного оформления', () => {
      cy.intercept('GET', '**/auth/user', {
         fixture: 'user.json'
      }).as('getUser');

      cy.intercept('POST', '**/orders', {
         fixture: 'order.json'
      }).as('createOrder');

      cy.setCookie('accessToken', 'Bearer test-access-token');

      cy.visit('/', {
         onBeforeLoad(window) {
            window.localStorage.setItem('refreshToken', 'test-refresh-token');
         }
      });

      cy.wait('@getIngredients');
      cy.wait('@getUser');

      cy.get(`[data-cy="add-ingredient-${bunId}"]`).contains('Добавить').click();
      cy.get(`[data-cy="add-ingredient-${mainId}"]`).contains('Добавить').click();

      cy.get('[data-cy="order-button"]').contains('Оформить заказ').click();

      cy.wait('@createOrder');

      cy.get('[data-cy="modal"]').should('be.visible');
      cy.get('[data-cy="modal"]').should('contain', '12345');

      cy.get('[data-cy="modal-close-button"]').find('svg').click({ force: true });

      cy.get('[data-cy="modal"]').should('not.exist');
      cy.get('[data-cy="constructor-bun-top-empty"]').should(
         'contain',
         'Выберите булки'
      );
      cy.get('[data-cy="constructor-bun-bottom-empty"]').should(
         'contain',
         'Выберите булки'
      );
      cy.get('[data-cy="constructor-ingredients-empty"]').should(
         'contain',
         'Выберите начинку'
      );
   });
});