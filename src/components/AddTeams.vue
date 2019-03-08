<template>
  <div class="add-teams container">
      <h2 class="center-align black-text">Add New Team List</h2>
      <form @submit.prevent="AddTeams">
          <div class="field title">
              <label for="title">Team Name:</label>
              <input type="text" name="title" v-model="title">
          </div>
          <div v-for="(mem,index) in members" :key="index" class="field">
              <label for="members">Members</label>
              <input type="text" name="members" v-model="members[index]">
              <i class="material-icons added"> done </i>
              <i class="material-icons delete" @click="deleteMember(mem)"> delete </i>
          </div>
         
          <div class="field add-members">
              <label for="add-members">Add Team Members:</label>
              <input type="text" name="add-members" @keydown.tab.prevent="addMembers" v-model="another">
              <p v-if="errorFeedBakc" class="red-text">{{errorFeedBakc}}</p>
          </div> 
          <div class="field right-align">
              
              <button class="btn green">Add Team</button>
    
          </div>
      </form>
  </div>

</template>
<script>
import Database from '@/firebase/init'
import slugify from 'slugify'
export default {
    name:'AddTeams',
    data(){
        return{
            title: null,
            another: null,
            members:[],
            errorFeedBakc: null,
            slug:null
        }
    },
    methods:{
        AddTeams(){
         if(this.title){
             // creating slug
             this.slug = slugify(this.title, {
                 replacement:'-',
                 remove: /[#$*_+~.()'"?!\-:@]/g,
                 lower: true
             })
             
             this.errorFeedBakc=null
              Database.collection('teams').add({
                  title: this.title,
                  members: this.members,
                  slug: this.slug
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
                this.members.push(this.another)
                this.another = null
                this.errorFeedBakc = null
               
            }else{
                this.errorFeedBakc= 'Please add team members'

            }
        },
        deleteMember(mem){
            this.members = this.members.filter(member =>{
                return member != mem
            })
        }
    }
}
</script>
<style>
.add-teams{
    margin-top: 50px;
    padding: 20px;
    max-width: 500px;
}
.add-teams h2{
    font-size: 2.5em;
    margin: 20px auto;
}
.add-teams .field{
    margin:  20px auto;
    position: relative;
}
.add-teams .delete{
    color: grey;
    position: absolute;
    right: 0;
    bottom: 16px;
    font-size: 1.5em;
    cursor: pointer;
}
.add-teams .added{
    color: green;
    position: absolute;
    right: 20px;
    bottom: 16px;
    font-size: 1.5em;
    cursor: pointer;
}
</style>

