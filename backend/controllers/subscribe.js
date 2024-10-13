const SubscribedUsers = require("../models/SubscribedUsers");

const subscribe = async (req, res) => {
    const { email } = req.body;
    try {
        // Check if the email is already subscribed
        const existingUser = await SubscribedUsers.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'Email already subscribed.',
            });
        }

        // Create a new subscription
        const userSubscribed = await SubscribedUsers.create({ email });

        // Check if the user was created successfully
        if (userSubscribed) {
            return res.status(200).json({
                message: 'Subscribed successfully.',
            });
        } else {
            return res.status(400).json({
                message: 'Failed to subscribe.',
            });
        }

    } catch (error) {
        console.error('Error while subscribing:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const unsubscribe = async (req, res) => {
    const { email } = req.body;
    try {
        // Attempt to delete the user by email
        const result = await SubscribedUsers.deleteOne({ email });

        // Check if a document was deleted
        if (result.deletedCount > 0) {
            return res.status(200).json({
                message: 'Unsubscribed successfully.',
            });
        } else {
            return res.status(404).json({
                message: 'Email not found.',
            });
        }

    } catch (error) {
        console.error('Error while unsubscribing:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    subscribe,
    unsubscribe,
};
