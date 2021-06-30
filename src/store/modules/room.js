
export default ({
    namespaced: true,
    state: {
        rooms: [
            {
                id: 1, name: "Room 1", description: "aasdsdasd", messages: [
                    {
                        from: "Robert", message: "Hello everybody"
                    }
                ]
            },
            { id: 2, name: "Room 2", description: "vvvv", messages: [] },
            { id: 3, name: "Room 3", description: "vvvv", messages: [] },
            { id: 4, name: "Room 4", description: "vvvv", messages: [] },
            { id: 5, name: "Room 5", description: "vvvv", messages: [] },
            { id: 6, name: "Room 6", description: "xdd", messages: [] },
            { id: 7, name: "Room 7", description: "vvvv", messages: [] },
            { id: 8, name: "Room 8", description: "xdd", messages: [] }
        ],
        selectedRoom: null
    },
    getters: {

    },
    mutations: {
        SET_ROOMS(state, rooms) {
            state.rooms = rooms;
        },
    },
    actions: {

    }
})
