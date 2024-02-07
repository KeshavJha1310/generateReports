const webhookConnectionController = async (req, res) => {
  try {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token && mode === 'subscribe' && token === "123") {
      console.log("GET Someone is pinging me");
      return res.status(200).send(challenge);
    } else {
      return res.sendStatus(403);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

export default webhookConnectionController;
