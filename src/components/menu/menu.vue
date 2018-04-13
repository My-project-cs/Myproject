<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{data}}</p>
    <ul v-for="(item,index) in menue">
        <li @click='GoUrl(item.url)'><a href="javascript:void(0)"> {{item.test}}</a></li>
    </ul>
<!--     <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul> -->
    <keep-alive><router-view></router-view></keep-alive> 
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      msg: 'Welcome to Meune',
      menue :[
          {
            test :'A_page',
            url:'/menu/A_page',
          },
          {
            test :'B_page',
            url:'/menu/B_page',
          },
          {
            test :'C_page',
            url:'/menu/C_page',
          },
          {
            test :'D_page',
            url:'/menu/D_page',
          }
      ],
      data : null,
    }
  },
  methods:{
    GoUrl(val){
      this.$router.push(val);
    }
  },
  computed:{
    GetData:{
      get(){
          console.log("Hello");
          return this.$store.state.Obj;
      }
    }
  },
  watch:{
    GetData : function(val){
      this.data = val.message;
    }
  },
  mounted(){
      var Obj = {};
      Obj.message = this.msg;
      this.$store.commit('setObj',Obj);
      console.log(this.$store.state.Obj);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
