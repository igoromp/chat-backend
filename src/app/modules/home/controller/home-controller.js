class HomeController {
    async index(req, res) {
        return res.json({message: 'api is running... :)'});
    }
}

export default new HomeController();