import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import AddTeams from '@/components/Addteams'
import EditTeam from '@/components/EditTeam'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-teams',
      name: 'AddTeams',
      component: AddTeams
    },
    {
      path:'/edit-team/:team_slug',
      name: 'EditTeam',
      component: EditTeam

    }
  ]
})
