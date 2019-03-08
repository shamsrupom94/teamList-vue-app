<template>
  <div class="index container">
    <div class="card" v-for="team in teams" :key="team.id">
      <div class="card-content">
        <i class="material-icons delete" @click="deleteTeam(team.id)">delete</i>
        <h2 class="black-text">{{ team.title}}</h2>
        <ul class="members">
          <li v-for="(member,index) in team.members" :key="index">{{index+1}} <span class="chip">{{member}}</span></li>
        </ul>
      </div>
      <span class="btn-floating btn-large halfway-fab light-green">
        <router-link :to="{ name: 'EditTeam', params: { team_slug: team.slug }}">
            <i class="material-icons edit">edit</i>
        </router-link>
      </span>
    </div>
  </div>
</template>

<script>
import Database from '@/firebase/init.js'
export default {
  name: 'Index',
  data () {
    return {
      teams:[]
     
    }
    
  },
  methods:{

    deleteTeam(id){
      console.log(id)
      Database.collection('teams').doc(id).delete().then(() =>{
         this.teams = this.teams.filter(team =>{
         return team.id != id
      })

      })
     
    }
  },
  created(){
      //fetch data from firestore
      Database.collection('teams').get().then(snapshot =>{
        snapshot.forEach(doc => {
          //console.log(doc.data(),doc.id)  
          let team = doc.data()
          team.id = doc.id
          this.teams.push(team)
        });
      })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.index{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
  margin-top: 40px;

}
.index h2{
  font-size: 2.4em;
  text-align: center;
  margin-top: 0px;
}
.index .members{
  margin: 30px auto;

}
.index .delete{
  position:absolute;
  top:4px;
  right: 4px;
  color:red;
  cursor: pointer;
}

</style>
