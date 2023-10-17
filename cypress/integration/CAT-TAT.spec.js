///  <reference types="Cypress"/>

describe("Central de atendimento ao cliente TAT", () => {
    beforeEach(() => {
        cy.visit('./src/index.html');
    })

    it("Verificar o título da aplicação", () => {
        cy.title().should('equal', 'Central de Atendimento ao Cliente TAT')
    });

    it('Preencher os campos obrigatórios e enviar o formulário', () => {
        const longText = 'Poema é um texto literário escrito em versos, que são distribuídos em estrofes. Esses versos podem ser regulares, brancos ou livres. Se for composto por versos regulares, esse texto poderá apresentar diversos tipos de rimas. Também pode ser narrativo, dramático ou lírico.'

        cy.get('#firstName').type('José');
        cy.get('#lastName').type('Costa');
        cy.get('#email').type('jose@email.com');
        cy.get('#open-text-area').type(longText, { delay: 0 });
        cy.contains('button', 'Enviar').click();
        cy.get('.success').should('be.visible');

    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        const longText = 'Poema é um texto literário escrito em versos, que são distribuídos em estrofes. Esses versos podem ser regulares, brancos ou livres. Se for composto por versos regulares, esse texto poderá apresentar diversos tipos de rimas. Também pode ser narrativo, dramático ou lírico.'

        cy.get('#firstName').type('José');
        cy.get('#lastName').type('Costa');
        cy.get('#email').type('joseemail.com');
        cy.get('#open-text-area').type(longText, { delay: 0 });
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');
    });

    it('campo telefone se mantém vazio quando um valor não numerico seja preenchido', () => {
        cy.get('#phone').type('asdfçlkj').should("have.value", "")
    });

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('José');
        cy.get('#lastName').type('Costa');
        cy.get('#email').type('jose@email.com');
        cy.get('#phone-checkbox').check();
        cy.get('#open-text-area').type('teste');
        cy.contains('button', 'Enviar').click();

        cy.get('.error').should('be.visible');
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('José').should('have.value', 'José').clear().should('have.value', '');
        cy.get('#lastName').type('Costa').should('have.value', 'Costa').clear().should('have.value', '');
        cy.get('#email').type('jose@email.com').should('have.value', 'jose@email.com').clear().should('have.value', '');
        cy.get('#phone').type('75991342552').should('have.value', '75991342552').clear().should('have.value', '');
        cy.get('#open-text-area').type('teste').should('have.value', 'teste').clear().should('have.value', '');
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click();
        cy.get('.error').should('be.visible');
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit();
        cy.get('.success').should('be.visible');
    })

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"]').check('feedback').should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]').should('have.length', 3).each(($radio) => {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"').check().should('be.checked').last().uncheck().should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload').should('not.have.value').selectFile('cypress/fixtures/example.json').should((($input) => {
            expect($input[0].files[0].name).to.equal('example.json')
        }))
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload').should('not.have.value').selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }).should($input => {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile');
        cy.get('#file-upload').selectFile('@sampleFile').should($input => {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
        cy.contains('Talking About Testing').should('be.visible')
    })


})