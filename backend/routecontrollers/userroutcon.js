import User from "../Models/userModels.js";
import Conversation from "../Models/conversation.js";
import Message from "../Models/MessageSchema.js";

export const getuser = async (req, res) => {
  try {
    const search = req.query.search || "";
    const currentUserID = req.user._id;
    const user = await User.find({
      $and: [
        {
          $or: [
            { username: { $regex: ".*" + search + ".*", $options: "i" } },
            { fullname: { $regex: ".*" + search + ".*", $options: "i" } },
          ],
        },
        {
          _id: { $ne: currentUserID },
        },
      ],
    })
      .select("-password")
      .select("email");
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
  }
};

export const getcurrchater = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).send({ success: false, message: "Unauthorized" });
    }

    const currentUserID = req.user._id;

    const currchaters = await Conversation.find({
      participants: currentUserID,
    })
      .sort({ updatedAt: -1 })
      .limit(50);

    if (!currchaters || currchaters.length === 0) {
      return res.status(200).send([]);
    }

    const participantIDs = currchaters.reduce((ids, conversation) => {
      if (Array.isArray(conversation.participants)) {
        const otherparty = conversation.participants.filter(
          (id) => id.toString() !== currentUserID.toString()
        );
        return [...ids, ...otherparty];
      }
      return ids;
    }, []);

    const uniqueParticipantIDs = [...new Set(participantIDs)];
    if (uniqueParticipantIDs.length === 0) {
      return res.status(200).send([]);
    }

    // Exclude the current user's ID explicitly
    const users = await User.find({
      _id: { $in: uniqueParticipantIDs },
    }).select("-password -email");

    // Filter out the current user (this should be redundant but acts as a safeguard)
    const filteredUsers = users.filter(
      (user) => user._id.toString() !== currentUserID.toString()
    );

    res.status(200).send(filteredUsers);
  } catch (error) {
    console.error("Error in getcurrchater:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from JWT token
    const user = await User.findById(userId); // Query the database

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
