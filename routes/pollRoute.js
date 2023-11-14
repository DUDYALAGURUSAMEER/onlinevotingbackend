const router = require("express").Router();
const Poll = require("../models/pollmodel");
const authMiddleware = require("../middlewares/authMiddleware");
const PollQuestion = require("../models/pollsModel");
// add poll

router.post("/add", authMiddleware, async (req, res) => {
  try {
    // check if exam already exists
    const pollExists = await Poll.findOne({ name: req.body.name });
    if (pollExists) {
      return res
        .status(200)
        .send({ message: "Poll already exists", success: false });
    }
    req.body.questions = [];
    const newPoll = new Poll(req.body);
    await newPoll.save();
    res.send({
      message: "Poll added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// get all Polls
router.post("/get-all-polls", authMiddleware, async (req, res) => {
  try {
    const polls = await Poll.find({});
    res.send({
      message: "Polls fetched successfully",
      data: polls,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// get poll by id
router.post("/get-poll-by-id", authMiddleware, async (req, res) => {
  try {
    const poll = await Poll.findById(req.body.pollId).populate("questions");
    res.send({
      message: "Poll fetched successfully",
      data: poll,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// edit poll by id
router.post("/edit-poll-by-id", authMiddleware, async (req, res) => {
  try {
    await Poll.findByIdAndUpdate(req.body.pollId, req.body);
    res.send({
      message: "Poll edited successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// delete poll by id
router.post("/delete-poll-by-id", authMiddleware, async (req, res) => {
  try {
    await Poll.findByIdAndDelete(req.body.pollId);
    res.send({
      message: "poll deleted successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

router.post("/add-question-to-poll", authMiddleware, async (req, res) => {
  try {
    // Validation
    const { pollId, question, options } = req.body;
    if (!pollId || !question || !options || !Array.isArray(options)) {
      return res.status(400).json({
        message: !question
          ? "Invalid request poll question should not be empty"
          : "Invalid request poll/ options should not be empty",
        success: false,
      });
    }

    // Add poll question to pollQuestions collection
    const newQuestion = new PollQuestion({ question, options });
    newQuestion.save();
    res.json({
      message: "Poll question added successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: "Invalid request format",
      success: false,
    });
  }
});

// edit question in exam
// router.post("/edit-pollquestion-in-poll", authMiddleware, async (req, res) => {
//   try {
//     // edit question in PollQuestions collection
//     await PollQuestion.findByIdAndUpdate(req.body.questionId, req.body);
//     res.send({
//       message: "Poll Question edited successfully",
//       success: true,
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: error.message,
//       data: error,
//       success: false,
//     });
//   }
// });

// //  delete question in poll
// router.post("/delete-pollquestion-in-poll", authMiddleware, async (req, res) => {
//      try {
//         // delete question in PollQuestions collection
//         await PollQuestion.findByIdAndDelete(req.body.questionId);

//         // delete question in poll
//         const poll = await Poll.findById(req.body.pollId);
//         poll.questions = poll.questions.filter(
//           (question) => question._id != req.body.questionId
//         );
//         await poll.save();
//         res.send({
//           message: "Poll Question deleted successfully",
//           success: true,
//         });
//      } catch (error) {

//      }
// });

module.exports = router;
