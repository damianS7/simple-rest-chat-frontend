
export default ({
    namespaced: true,
    state: {
        conversations: [
            {
                userId: 1,
                with: "Mariah", messages: [
                    { from: "Mariah", message: "Hello David" },
                    { from: "David", message: "Hello Mariah" }
                ]
            },
            {
                userId: 2,
                with: "Anthony", messages: [
                    { from: "Anthony", message: "Hello David" },
                    { from: "David", message: "Hey Anthony" }
                ]
            },
        ],
        selectedConversation: null
    },
    getters: {

    },
    mutations: {

    },
    actions: {

    }
})
