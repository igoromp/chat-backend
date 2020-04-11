class ChatController {

    async index(req, res) {
        res.json({message:'chat is running...'});
    }

}

export default new ChatController();