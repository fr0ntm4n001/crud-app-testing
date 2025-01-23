

const addproduct = () => {
  cy.visit('http://localhost:3000/')

  //click  on add product
  cy.get('.btn' ).click()
  cy.url().should('include', '/add')

  //add product details
  cy.get('input[name="title"]').type('Test Product 1')
  cy.get('textarea[name="description"]').type('Test Description 1')
  cy.get('input[name="price"]').type('100')
  cy.get('input[type="submit"]').click()
  cy.url().should('include', '/')
  cy.wait(4000)
}

describe('Testing CRUD APP ', () => {

  beforeEach(() => {
    // Clear cookies and local storage before each test
   
    cy.reload();
  });
  
  // Test to check if the app is accessible
  it('App is Accessible', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('Add Product')
  })



  //Navigatinng to Add Product Details Page and Add Product
    it('Navigatinng to Add Product Details Page and Add Product', () => {
      cy.visit('http://localhost:3000/')

      //click  on add product
      addproduct();
      // cy.get('.btn' ).click()
      // cy.url().should('include', '/add')

      // //add product details
      // cy.get('input[name="title"]').type('Test Product 1')
      // cy.get('textarea[name="description"]').type('Test Description 1')
      // cy.get('input[name="price"]').type('100')
      // cy.get('input[type="submit"]').click()
      // cy.url().should('include', '/')
      // cy.wait(4000)
    });

  //verify product is added
  it('Verify Product is Added with all details', () => {
    
    cy.visit('http://localhost:3000/')
    cy.contains('Test Product 1').should('exist')
    cy.contains('Test Description 1').should('exist')
    cy.contains('100').should('exist')
    cy.get('tbody > tr > :nth-child(1)').each(($el) => {
      const productId = $el.text().trim();
  
      // Assert the ID is in the expected format (24-character alphanumeric string)
      expect(productId).to.match(/^[a-f0-9]{24}$/);
    });
    cy.wait(2000)
    
    })
  
// Test to verify that products have unique IDs with no duplicates , must have 2 products add 1st product manually 
it('Verify Each Product has a Unique Id', () => {
  cy.visit('http://localhost:3000/');

  addproduct();
  
  // Collect all product IDs
  cy.get('tbody > tr > :nth-child(1)').then(($ids) => {
    const ids = $ids.map((i, el) => Cypress.$(el).text().trim()).get();

    // Compare each ID with the others to ensure uniqueness
    ids.forEach((id, index) => {
      ids.forEach((otherId, otherIndex) => {
        if (index !== otherIndex) {
          // Assert that two IDs do not have the same characters
          expect(id).not.to.equal(otherId);
        }
      });
    });
  });
  cy.wait(2000)
    
});

// Test to check if clicking the View button redirects, fields are populated, and fields are disabled
it('View Product Details and Verify Fields are Disabled', () => {
  cy.visit('http://localhost:3000/');
  
  // Click the View button for the first product
  cy.get('.btn-info').last().click();
  cy.url().should('include', '/view');
  
  // Verify fields are pre-populated with product details
  cy.get('input[name="title"]').should('have.value', 'Test Product 1').and('be.disabled');
  cy.get('textarea[name="description"]').should('have.value', 'Test Description 1').and('be.disabled');
  cy.get('input[name="price"]').should('have.value', '100').and('be.disabled');
  
  // Verify that the form does not have a submit button
  cy.get('input[type="submit"]').should('not.exist');
});

//Test to check if the edit product form is accessible, fields are populated, and updates are saved
it('Edit Product Details and Verify Update', () => {
  cy.visit('http://localhost:3000/');
  
  // Click the Edit button for the first product
  cy.get('.btn-warning').last().click();
  cy.url().should('include', '/edit');
  
  // Verify fields are pre-populated
  cy.get('input[name="title"]').should('have.value', 'Test Product 1');
  cy.get('textarea[name="description"]').should('have.value', 'Test Description 1');
  cy.get('input[name="price"]').should('have.value', '100');
  
  // Update the product details
  cy.get('input[name="title"]').clear().type('Updated Product 1');
  cy.get('textarea[name="description"]').clear().type('Updated Description 1');
  cy.get('input[name="price"]').clear().type('150');
  
  // Submit the updated details
  cy.get('input[type="submit"]').click();
  
  // Verify the URL redirects back to the homepage
  cy.url().should('include', '/');
  cy.wait(4000)
  // Verify the updated product is displayed on the homepage
  cy.contains('Updated Product 1').should('exist');
  cy.contains('Updated Description 1').should('exist');
  cy.contains('150').should('exist');
});
  
// Test to delete a product and verify it is removed
it('Delete Product and Verify Removal', () => {
  cy.visit('http://localhost:3000/');
  
  // Click the Delete (trash) button for the first product
  cy.get('.btn-danger').last().click();
  

  cy.on('window:alert', (alertText) => {
    // Assert the alert message
    expect(alertText).to.equal('Product deleted successfully');
  });
  
  cy.wait(4000); 
  cy.reload();
 
  //  Verify the product is removed from the UI
  cy.contains('Updated Product 1').should('not.exist');
  cy.contains('Updated Description 1').should('not.exist');
  cy.contains('150').should('not.exist');
 
  cy.wait(2000)
  cy.get('.btn-danger').first().click();
  cy.wait(2000)
  cy.reload();


});

})
