# Angular pipes

## Resources

[Angular Pipes](https://angular.io/api?query=pipe)

## Built-in pipes

Some of the common pipes are: 
  
  - `| uppercase`, 
  - `| data: 'fullDate'` (put parameters behind `:`)

## Pipe Chaining

- Mind the order: 

  `{{ server.started | date: 'fullDate' | uppercase }}` is correct, but `{{ server.started | uppercase | date: 'fullDate' }}` cannot be parsed by Angular.