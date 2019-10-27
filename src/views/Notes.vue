<template>
  <div class="container">
    <h1>Notas</h1>
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="mensaje.color"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      {{mensaje.texto}}
    </b-alert>
    <p class="table" v-if="notes.length === 0">No hay notas para mostrar</p>
    <p />
    <table class="table" v-if="notes.length >= 1">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Descrición</th>
          <th scope="col">Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(note, index) in notes" :key="index">
          <td scope="row">{{ note._id }}</td>
          <td>{{ note.nombre }}</td>
          <td>{{ note.descripcion }}</td>
          <td> 
            <b-button 
            @click="alert()"
            >
            Acción
            </b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notes: [],
      mensaje: { color: "", texto: "" },
      dismissSecs: 5,
      dismissCountDown: 0
    };
  },
  created() {
    this.getNotes();
  },
  methods: {
    alert(){
      this.mensaje = { 
        color: "primary",
        texto: "You shitty this bro." 
       }
       this.dismissCountDown = this.dismissSecs;
    },
    async getNotes() {
      //Se puede usar fetch
      /*  const BASE_URL = "http://localhost:3000/api/"
        try{
            const response = await fetch(BASE_URL + "notes")
            const data = await response.json()
            console.log(data)
            this.notes = data
        }catch(e){
            console.log(e);
            
        } */
      this.axios
        .get("/notes")
        .then(res => (this.notes = res.data))
        .catch(e => console.log(e.response));
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  }
};
</script>