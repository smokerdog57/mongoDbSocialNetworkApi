// /controllers/thoughtController

// Dependencies
const mongoose = require('mongoose');
const { User, Thought} = require('../../models');
const Reaction = require('../../models/Reaction'); // Adjust the path as needed

// Define your controller functions for user routes here
const thoughtController = {

    // GET all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // GET a single thought by _id
    async getThoughtById(req, res) {

        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //POST a new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //PUT to update a thought by _id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //DELETE a thought by _id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
            }

        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Post new reaction to a thought
    async createReaction(req, res) {
               try {
            const { thoughtId } = req.params;
            const { reactionBody, username } = req.body;
            // Validate that required fields are present
            if (!thoughtId || !reactionBody || !username) {
                return res.status(400).json({ message: 'Invalid request. Missing required fields.' });
            }
            
            const thought = await Thought.findByIdAndUpdate(
                {_id: thoughtId},
                { $addToSet: { reactions: req.body} },
                { runValidators: true, new: true }
            );
            
            if (!thought) {
                return res.status(404).json({ message: 'No thought found with that ID :(' });
            }
            
            res.json(thought);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    //DELETE to remove a reation from a thought
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reaction: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res
                    .status(404)
                    .json({ message: 'No thought found with that ID :(' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};

module.exports = thoughtController;