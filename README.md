# promises_and_callbacks
Promises &amp; Callbacks - IT Acadamey - NodeJs - Sprint1
<br>
<br>


### Nivell 1
---
- Exercici 1
Crear una function que retorni una Promise que invoqui la funcion resolve() o bé reject() que rep. Invocar-la des de fora pasandole totes dues funcions que imprimeixin un missatge diferent en cada cas.

- Exercici 2
Crear una arrow function que, rebent un paràmetre i una function callback, li passi a la funció un missatge o un altre (que s'imprimirà per consola) en funció del paràmetre.

### Nivell 2
---  
- Exercici 1
Donats els objectes employees i salaries, creu una arrow function getEmpleado que retorni una Promise efectuant la cerca en l'objecte pel seu id.  

```Javascript
let employees = [{
      id: 1,
      name: 'Linux Torvalds'
    }, {
      id: 2,
      name: 'Bill Gates'
    },{
      id: 3,
      name: 'Jeff Bezos'
    }];
 
let salaries = [{
      id: 1,
      salary: 4000
    }, {
      id: 2,
      salary: 1000
    }, {
      id: 3,
      salary: 2000
}];
```

- Exercici 2
Creu una altra arrow function getSalario que rebi com a paràmetre un objecte employee i retorni el seu salari.

### Nivell 3
---  
- Exercici 1
Fixi un element catch a la invocació de la fase anterior que capturi qualsevol error i l'imprimeixi per consola.