import axios from 'axios'
export default ({
    namespaced: true,
    state: {
        appUser: { id: 1, name: "No name", email: null }
    },
    getters: {
        isLogged: (state) => {
            if (state.appUser.id === null) {
                return false;
            }
            return true;
        },
    },
    mutations: {
        SET_USER(state, user) {
            state.appUuser = user;
        },
    },
    actions: {
        login(context) {
            axios.post("api/users/", { //user
                // Pasar user y login del formulario
                // user: context.state.appUser
            }).then(function (response) {
                // Si el request tuvo exito (codigo 200)
                if (response.status == 200) {
                    // Cargar los datos de usuario
                    //context.SET_USER(response['data']);
                    console.log(response);
                }
            }).catch(function (error) {
                console.log(error);
                // Mostrar mensaje de error en el formulario de login
            });
            context.isLogged;
        },
        logout(context) {
            axios.post("api/users/logout").catch(error => {
                //window.location.href = "/login";
                context.isLogged;
                console.log(error);
            });
        },
    }
})
