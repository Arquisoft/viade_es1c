Feature: Check that all views are correctly internationalized

    Scenario: We are login into Viade and we check all views are internationalized
        Given a view
        When the user press the boton Language or Idioma (depending on the language you have selected) and select the other language
        Then all words on the page change will change language to the one selected by the user