<template>
  <div class="container">
    <h1>Notes</h1>

    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="mensaje.color"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >{{mensaje.texto}}</b-alert>

    <form @submit.prevent="addNote()">
      <h3 class="form__title">Add new Note</h3>
      <input
        type="text"
        class="form-control my-2"
        placeholder="Nombre de la nota"
        v-model="note.nombre"
      />
      <input
        type="text"
        class="form-control my-2"
        placeholder="Descripción de la nota"
        v-model="note.descripcion"
      />
      <b-button class="btn-success btn-block my-2" type="submit">Add new</b-button>
    </form>
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
          <td scope="row">{{ index+1 }}</td>
          <td>{{ note.nombre }}</td>
          <td>{{ note.descripcion }}</td>
          <td>
            <b-button @click="updateNote(note._id)" class="btn-warning btn-sm ml-2">Update</b-button>
            <b-button @click="deleteNote(note._id)" class="btn-danger btn-sm ml-2">Delete</b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<style scoped>
.form__title{
  text-align: left;
}
</style>>
<script>
export default {
  data() {
    return {
      notes: [],
      note: { nombre: "", descripcion: "" },
      mensaje: { color: "", texto: "" },
      dismissSecs: 5,
      dismissCountDown: 0
    };
  },
  created() {
    this.getNotes();
  },
  methods: {
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
    addNote() {
      this.axios
        .post("/new", this.note)
        .then(res => {
          this.getNotes();
          this.note = {};
          this.mensaje = { color: "success", texto: "Note Added Successfuly" }
          this.showAlert();
        })
        .catch(e => {
          console.log(e.message);

          this.mensaje = { color: "danger", texto: "Error Adding a New Note" }
          this.showAlert();
        });
    },
    deleteNote(id){
      this.axios
        .delete('/note/'+id)
        .then(res =>{
          this.getNotes()
          this.mensaje = { color: "success", texto: "Note Deleted Successfuly" }
          this.showAlert()
        })
        .catch(e =>{
          this.mensaje = { color: "danger", texto: "Error Deleting a note" }
          this.showAlert()
        })

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