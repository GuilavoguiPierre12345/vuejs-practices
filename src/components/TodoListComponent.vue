<template>
  <div style="height: 90vh;" class="container border border-3">
    <div class="row py-5 h-100">
      <div class="col-6 ">
        <div class="border border-2 h-100">
          <h1 class="text-center p-3 shadow-lg">Todo List App</h1>
          <div class="h-100 w-100 px-2 button-box d-flex flex-column justify-content-center align-items-center">
              <button v-on:click="changeTaskType(1)" class="btn btn-lg btn-primary m-2 w-100">
                <i class="bi bi-plus-square-fill fs-1 mx-3"></i>
                Nouvelle taches
              </button>
              <button v-if="!taskListIsEmpty" v-on:click="changeTaskType(2)" class="btn btn-lg btn-warning m-2 w-100">
                <i class="bi bi-card-list fs-1 mx-3"></i>
                Liste des taches
              </button>
              <button v-if="!validTaskListIsEmpty" v-on:click="changeTaskType(3)" class="btn btn-lg btn-success m-2 w-100">
                <i class="bi bi-card-checklist fs-1 mx-3"></i>
                Les taches valides
              </button>
          </div>
        </div>
      </div>
      <div v-if="type!==0" class="col-6 h-100">
        <div class="border border-3 h-100">
          <div v-if="type===1" class="newTache">
            <h1 class="text-center p-3 mb-3 shadow-lg ">Nouvelle tache</h1>
            <div class="task-form p-3">
                <div class="mb-3">
                  <label for="tire" class="form-label fs-4">Titre de la Tache</label>
                  <input v-model="taskName" :style="titleStyle" type="text" :class="styleNewTaskName" id="tire" placeholder="titre de la tache">
                </div>
                <div class="mb-3">
                  <label for="contenu" class="form-label fs-4 ">Corps de la tache</label>
                  <textarea v-model="taskContent" :style="textEreaStyle" class="form-control" placeholder="Ici le contenu de votre tache..." id="contenu" rows="8"></textarea>
                </div>
                <div class="mb-3">
                  <input v-if="addBtnIsDisplayed" @click="addTask"  class="btn btn-lg btn-info w-100" type="button" value="Ajouter la tache">
                  <p v-if="!addBtnIsDisplayed" class="d-bloc text-center text-info fs-2">pour etre ajoute, la tache doit avoir un titre ! </p>
                  <p class="text-center text-warning fs-2">{{ dblmsg }}</p>
                </div>
            </div>
          </div>

          <div v-if="type===2" class="tacheList overflow-y-scroll h-100">
            <div class="d-flex justify-content-around p-3 mb-3 shadow-lg">
              <h1 class="">Tache liste </h1>
              <button @click="removeAllTask" class="text-danger fs-3 btn border border-danger"><i class="bi bi-trash cursor-pointer"></i>remove alls</button>
            </div>
            <div class="mb-3 mx-2">
              <label for="search" class="form-label fs-4">Rechercher une tache </label>
              <!-- <input type="text" class="form-control form-control-lg" id="search" placeholder="recherche..."> -->
            </div>
            <div v-if="!taskListIsEmpty" class="taskList position-relative h-75">
              <div v-for="(t,i) in displayTask" :key="i" class="card m-2 shadow">
                <div class="card-header fs-3 d-flex w-100">
                  <span class="flex-grow-1">{{ t.name }}</span>
                  <span class="flex-grow-0">
                    <i @click="valideTask(i)" style="cursor: pointer;" class="m-1 bi bi-journal-check text-info"></i>
                    <i @click="showTaskDetail(t.name,t.content)" style="cursor: pointer;" class="m-1 bi bi-eye text-success"></i>
                    <i style="cursor: pointer;" @click="updateTask(i,t.name,t.content)" class="m-1 bi bi-pencil text-warning"></i>
                    <i @click="removeTask(i)" style="cursor: pointer;" class="m-1 bi bi-trash text-danger"></i>
                  </span>
                </div> 
                <div style="max-height: 90px;" class="card-body overflow-y-hidden">
                  {{ t.content }}
                </div>
              </div>
              <!-- show task details -->
              <div v-if="displayTaskDetail" class="overflow-y-scroll detail-task bg-info-subtle text-black w-100 h-100 position-absolute translate-middle start-50 top-50">
                <div class="d-flex p-3 mb-3 shadow-lg">
                  <p class=" text-center fs-2 fw-bold flex-grow-1">Detail tache</p>
                  <i @click="hideDetail" style="cursor:pointer;" class="bi bi-eye-slash-fill flex-grow-0 fs-1"></i>
                </div>
                <div class="p-3 fs-3 ">
                  <p class="title"><span class="fs-2 fw-bold">Titre</span> : {{ detailName }}</p>
                  <p class="content text-break"><span class="fs-2 fw-bold">Contenu</span> : {{ detailContent }} </p>
                </div>
              </div>

              <!-- update task -->
              <div v-if="displayUpdatedBox" class="overflow-y-scroll update-task bg-info-subtle text-black w-100 h-100 position-absolute translate-middle start-50 top-50">
                <div class="d-flex p-3 mb-3 shadow-lg">
                  <p class=" text-center fs-2 fw-bold flex-grow-1">Update tache</p>
                  <i @click="hideUpdateBox" style="cursor:pointer;" class="bi bi-check-square flex-grow-0 fs-1"></i>
                </div>
                <div class="p-3 fs-3 ">
                  <p class="title"><span class="fs-2 fw-bold">Titre</span> : 
                    <input class="w-100" v-model="nouveauTitre" type="text" name="" id=""> 
                  </p>
                  <p class="content text-break"><span class="fs-2 fw-bold">Contenu</span> : 
                    <textarea class="w-100" v-model="nouveauContenu" name="" id="" cols="30" rows="10"></textarea>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div v-if="type===3" class="valideTache">
            <div class="d-flex justify-content-around p-3 mb-3 shadow-lg">
              <h1 class="">Tache valide </h1>
              <button @click="clearValideTask" class="text-danger fs-3 btn border border-danger"><i class="bi bi-trash cursor-pointer"></i>remove alls</button>
            </div>
            <div class="validTask p-2">
              
              <div v-for="(v,k) in displayValidTask" :key="k" class="card m-2 shadow border border-2 border-info">
                <div class="card-header fs-3 w-100">
                  <span class="flex-grow-1">{{ v.name }}</span>
                </div> 
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
    

</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';
      
      // definition dynamique du style du textarea
      const textEreaStyle = "resize:none; font-size:25px;"
      const titleStyle = "font-size:25px;"

      let type = ref(0)
      function changeTaskType(type){
        this.type = type
      }
      // definition de la tache
      const taskName = ref(' ')
      const taskContent = ref(' ')
      // task object
      const addBtnIsDisplayed = computed(()=>{
        return taskName.value.length > 3 ? true : false
      })
      
      const taskListIsEmpty = ref(true)
      let allTask = ref([])
      let displayTask = ref([])
      const dblmsg = ref('')
      const isExistDoublon = ref(false)
      const styleNewTaskName = ref('form-control')

      onMounted(() => {
        fetchAllTasks()
        nextTick()
      })
      
      function viderApresAjout(){
        taskName.value =""
        taskContent.value =""
      }
      function addTask(){
          const taskModel = {
            name: taskName.value,
            content : taskContent.value,
          }
          const reg = RegExp(taskModel.name)
          const doublon = (allTask.value.filter(task => reg.test(task.name)))[0]
          dblmsg.value = ''
          isExistDoublon.value = false
          styleNewTaskName.value = 'form-control'
          if(doublon){
            dblmsg.value = 'Une tache existe avec le meme titre, veuillez changer le titre'
            isExistDoublon.value = true
            styleNewTaskName.value = 'form-control border border-2 border-danger'
            return 0
          }

          allTask.value.push(taskModel)
          const reverseTaskArray = allTask.value.reverse()
          localStorage.setItem("allTask", JSON.stringify(reverseTaskArray))
          fetchAllTasks()
          viderApresAjout()
        }

      function fetchAllTasks(){
        if (localStorage.getItem('allTask')) {
          allTask.value = JSON.parse(localStorage.getItem('allTask'))
          displayTask.value = allTask.value
          taskListIsEmpty.value = false 
        }
      }
      
      function removeAllTask(){
        localStorage.removeItem("allTask")
        displayTask.value = JSON.parse(localStorage.getItem('allTask'))
        allTask.value = []
        taskListIsEmpty.value = true
        type.value = 0
      }

      function clearValideTask(){
        /*localStorage.removeItem("taskValids")
        displayValidTask.value = JSON.parse(localStorage.getItem('taskValids'))
        displayTask.value = []
        validTaskListIsEmpty.value = true
        fetchAllValidTask()*/
      }

      function removeTask(id){
        displayTask.value.splice(id,1)
        localStorage.setItem("allTask", JSON.stringify(displayTask.value))
        if(displayTask.value.length === 0){
          taskListIsEmpty.value = true
          type.value = 0
        }
        // console.log(displayTask.value);
      }

      // gestion des taches valide
      const validateTask = ref([]) 
      const displayValidTask = ref([])
      const validTaskListIsEmpty = computed(()=>displayValidTask.value.length > 0 ? false : true);

      function valideTask(id){
        const validTaskModel = {
          name: displayTask.value[id].name,
          content : displayTask.value[id].content
        }
        validateTask.value.push(validTaskModel)
        localStorage.setItem('taskValids',JSON.stringify(validateTask.value))
        removeTask(id)
        fetchAllValidTask()
      }

      function fetchAllValidTask(){
        if (localStorage.getItem('taskValids')) {
          displayValidTask.value = JSON.parse(localStorage.getItem('taskValids'))
        }
      }
      // gestion de l'affichage des details d'une tache
      const displayTaskDetail = ref(false)
      const detailName = ref('')
      const detailContent = ref('')
      function showTaskDetail(name,content){
        displayTaskDetail.value = true
        detailName.value = name
        detailContent.value = content
      }

      function hideDetail(){
        displayTaskDetail.value = false
      }

      // gestion de la modification d'une tache
      const displayUpdatedBox = ref(false)
      const nouveauTitre = ref('')
      const nouveauContenu = ref('')
      const identifiant = ref('')
      function updateTask(id,name,content){
        displayUpdatedBox.value = true
        nouveauTitre.value = name
        nouveauContenu.value = content
        identifiant.value = id
      }

      function hideUpdateBox(){
        displayTask.value.splice(identifiant.value,1,{name:nouveauTitre,content:nouveauContenu})
        localStorage.setItem("allTask", JSON.stringify(displayTask.value))
        if(displayTask.value.length === 0){
          taskListIsEmpty.value = true
          type.value = 0
        }
        displayUpdatedBox.value = false
      }




</script>
<style>
  .classValue {
    background-color: blueviolet;
    font-size: 100px;
  }
</style>


