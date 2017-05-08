var list = [
    {title: '你好啊',
    isChecked: false},
    {title: '我很好啊',
    isChecked: true}
]
new Vue({
    el: '.main',
    data: {
        todo: '',
        list: list,
        editorTodos: '',
        beforeTitle: ''
    },
    computed: {
        noCheckLength: function () {
            return this.list.filter(function(item){
                return !item.isChecked
            }).length
        }
    },
    methods: {
        addTodo() {
            if(this.todo){
                this.list.push({title: this.todo,isChecked: false})
                this.todo = ''
            }
        },
        deleteTodo(item){
            var index = this.list.indexOf(item)
            this.list.splice(index,1)
        },
        editorTodo(item){
            this.beforeTitle = item.title
            this.editorTodos = item
        },
        cancelTodo(item){
            item.title = this.beforeTitle
            this.beforeTitle = ''
            this.editorTodos = ''
        },
        changedTodo(item){
            this.editorTodos = ''
        }
    }
})