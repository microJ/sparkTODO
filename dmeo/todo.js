var store = {
    save(key,value){
        localStorage.setItem(key,JSON.stringify(value))
    },
    fetch(key){
        return JSON.parse(localStorage.getItem(key)) || []
    }
}

/*var list = [
    {title: '你好啊',
    isChecked: false},
    {title: '我很好啊',
    isChecked: true} //已完成
]*/
var list = store.fetch('sparkTODO-list')

var vm = new Vue({
    el: '.main',
    data: {
        todo: '',
        list: list,
        editorTodos: '',
        beforeTitle: '',
        visibility: 'all'
    },
    watch: {
        list:{
            handler: function(){
                store.save('sparkTODO-list',this.list)
            },
            deep: true
        }
    },
    computed: {
        noCheckLength: function () {
            return this.list.filter(function(item){
                return !item.isChecked
            }).length
        },
        selectList: function (){
            var filter = {
                all: function(list){
                    return list
                },
                unfinished: function(list){
                    return list.filter(function(item){
                        return !item.isChecked
                    })
                },
                finished: function(list){
                    return list.filter(function(item){
                        return item.isChecked
                    })
                }
            }
            return filter[this.visibility] ? filter[this.visibility](list) : list
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

function hashChange(){
    var hash = window.location.hash.slice(1)
    vm.visibility = hash
    console.log(hash)
}
hashChange()
window.addEventListener('hashchange',hashChange)