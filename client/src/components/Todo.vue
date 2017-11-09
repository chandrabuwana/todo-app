<template>
  <div>
    <nav>
    <div class="nav-wrapper">
      <ul class="right hide-on-med-and-down">
        <li><a class="waves-effect waves-light btn" @click="logout">Logout</a></li>
        </ul>
    </div>
  </nav>
  <div class="row">
    <form class="col s6">
      <div class="row">
        <div class="input-field col s3">
          <input v-model="post.task" id="icon_prefix" type="text" class="validate" placeholder="Todo Today">
          <label for="icon_prefix"></label>
          <a  v-on:click.prevent="postData()" class="waves-effect waves-light btn-large">Submit</a>
        </div>
        <div class="input-field col s3">
          <input v-model="post.description" id="icon_telephone" type="tel" class="validate" placeholder="Description">
          <label for="icon_telephone"></label>
        </div>
      </div>
    </form>
    <form class="col s6">
      <table>
        <thead>
          <tr>
            <th>Done</th>
            <th>Todo</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody v-for="(todo,index) in todos" :key="todo.id">
          <tr>
            <td>
              <div class="small">
                <input v-on:click="editStatus(todo, index)" type="checkbox" id="test5"><label for="test5">{{todo.status}}</label></input>
              </div>

            </td>
            <td>{{todo.task}}</td>
            <td>{{todo.description}}</td>
            <!-- <td>asdasd</td> -->
            <td><button type="button" name="button"v-on:click="deleteData(todo._id, index)">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      todos: [],
      post: {
        task: '',
        description: ''
      }
    }
  },
  methods: {
    getData () {
      var self = this
      axios.get('http://localhost:3000/task', {
        headers: {
          token: localStorage.getItem('token') || localStorage.getItem('fbaccesstoken')
        }
      })
      .then(data => {
        console.log(data.data)
        self.todos = data.data
      })
      .catch(err => {
        console.log('ini err', err)
      })
    },
    postData () {
      var self = this
      axios.post('http://localhost:3000/task', {
        task: self.post.task,
        description: self.post.description
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        self.todos.push(response.data)
      })
      .catch(err => {
        console.log(err)
      })
    },
    editStatus (data, index) {
      console.log(index)
      console.log(this.todos)
      console.log('dataaa', data)
      var status = ''
      if (data.status === 'done') {
        status = 'undone'
      } else {
        status = 'done'
      }
      var self = this
      axios.put(`http://localhost:3000/task/${data._id}`, {
        status: status
      }, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        console.log('edittt ', response)
        self.todos[index].status = status
      })
      .catch(err => {
        console.log('inierr ', err)
      })
    },
    deleteData (data, index) {
      console.log(data)
      var self = this
      axios.delete(`http://localhost:3000/task/${data}`, {
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(response => {
        self.todos.splice(index, 1)
      })
    },
    logout () {
      localStorage.clear()
      this.$router.push('/')
    }
  },
  created () {
    if (localStorage.getItem('token') || localStorage.getItem('fbaccesstoken')) {
      this.getData()
    } else {
      this.$router.push('/')
    }
  }
}
</script>
