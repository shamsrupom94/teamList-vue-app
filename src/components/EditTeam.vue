<template>
  <div v-if="team" class="edit-teams container">    
    <h2>Edit {{ team.title }}</h2>
    <form @submit.prevent="EditTeams">
          <div class="field title">
              <label for="title">Team Name:</label>
              <input type="text" name="title" v-model="team.title">
          </div>
          <div v-for="(mem,index) in team.members" :key="index" class="field">
              <label for="members">Members</label>
              <input type="text" name="members" v-model="team.members[index]">
              <i class="material-icons added"> done </i>
              <i class="material-icons delete" @click="deleteMember(mem)"> delete </i>
          </div>
         
          <div class="field add-members">
              <label for="add-members">Add Team Members:</label>
              <input type="text" name="add-members" @keydown.tab.prevent="addMembers" v-model="another">
              <p v-if="errorFeedBakc" class="red-text">{{errorFeedBakc}}</p>
          </div>
          <div class="field right-align">
              <button class="btn light-green">Update Team</button>
          </div>
      </form>
  </div>
</template>

<script>
import Database from '@/firebase/init'
import slugify from 'slugify'
export default {
  name: 'EditTeam',
  data()
  {
    return{
        team: null,
        another: null,
        errorFeedBakc: null
    }
  },
  methods:{
        EditTeams(){
            if(this.team.title){
             // creating slug
             this.team.slug = slugify(this.team.title, {
                 replacement:'-',
                 remove: /[#$*_+~.()'"?!\-:@]/g,
                 lower: true
             })
             
             this.errorFeedBakc=null
              Database.collection('teams').doc(this.team.id).update({
                  title: this.team.title,
                  members: this.team.members,
                  slug: this.team.slug
              }).then(()=>{
                  this.$router.push({ name: 'Index'})
              }).catch(err =>{
                  console.log(err)
              })
          
         }else{
             this.errorFeedBakc ='Team MUST have a name'
         }
        },
        addMembers(){
            if(this.another){
                this.team.members.push(this.another)
                this.another = null
                this.errorFeedBakc = null
               
            }else{
                this.errorFeedBakc= 'Please add team members'

            }
        },
        deleteMember(mem){
            this.team.members = this.team.members.filter(member =>{
                return member != mem
            })
        }
    },
        created(){
            let ref =Database.collection('teams').where('slug', '==', this.$route.params.team_slug )
            ref.get().then(snapshot =>{
                snapshot.forEach(doc => {
                    this.team = doc.data()
                    this.team.id=doc.id
                    });
            })
        }
}
</script>

<style>
.edit-teams{
    margin-top: 50px;
    padding: 20px;
    max-width: 500px;
}
.edit-teams h2{
    font-size: 2.5em;
    margin: 20px auto;
}
.edit-teams .field{
    margin:  20px auto;
    position: relative;
}
.edit-teams .delete{
    color: grey;
    position: absolute;
    right: 0;
    bottom: 16px;
    font-size: 1.5em;
    cursor: pointer;
}
.edit-teams .added{
    color: green;
    position: absolute;
    right: 20px;
    bottom: 16px;
    font-size: 1.5em;
    cursor: pointer;
}
</style>
