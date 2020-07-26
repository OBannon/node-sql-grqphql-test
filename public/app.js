
  new Vue({
    el: '#app',
    data() {
      return {
        isDark: true,
        show: true,
        todoTitle: '',
        todos: []
      }
    },
    created(){
      const query = `
        query {
          getTodos{
            id title done createdAt updatedAt
          }
        }
      `
      //using Fetch to get data
      fetch('/graphql', { //всегда отправляем только на один роут. Других не бывает.
        method: "post",    //все запросы всегда POST в GraphQL.
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({query: query})   //обязательно ключ равен запросу
      }) 
        .then(res => res.json())
        .then(response => {
          this.todos = response.data.getTodos
        })
    },
    methods: {
      addTodo() {
        const title = this.todoTitle.trim()
        if (!title) {
          return
        }
        const query = `
          mutation {
            createTodo(todo: {title: "${title}"}){
              id title done createdAt updatedAt
            }
          }
        `
        fetch("/graphql", {
          method: "post",
          headers: {
            "Content-Type" : "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({query})
        })
        .then(res => res.json())
        .then(response => {
          const todo = response.data.createTodo
          this.todos.push(todo)
          this.todoTitle = ''
        })
        .catch(e => console.log(e))
        //this.todoTitle = ''
      },
      removeTodo(id) {
        fetch("/api/todo/" + id, {
          method: "delete"
        })
          .then(()=>{
            this.todos = this.todos.filter(t => t.id !== id)
          })
          .catch(e => console.log(e))
        this.todos = this.todos.filter(t => t.id !== id)
      },
      completeTodo(id){
        fetch("/api/todo/" + id, {
          method: "put",
          headers: {"Content-Type" : "application/json"},  //хеадеры описываем, когда что-то передаем на сервер
          body: JSON.stringify({done: true})
        })
          .then(res => res.json())
          .then(({todo}) => {
            const idx = this.todos.findIndex(t => t.id === todo.id)
            this.todos[idx].updatedAt = todo.updatedAt
          })
          .catch(e => console.log(e))
      }
    },
    filters: {
      capitalize(value) {
        return value.toString().charAt(0).toUpperCase() + value.slice(1)
      },
      date(value, withTime) {
        const options = {
          year: 'numeric',
          month: 'long',
          day: '2-digit'
        }
        if(withTime){
          options.hour = "2-digit"
          options.minute = "2-digit"
          options.second = "2-digit"
        }
        return new Intl.DateTimeFormat('ru-RU', options).format(new Date(+value))
      }
    }
  })