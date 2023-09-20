const CustomError = require("../exceptions/CustomError");
const { getFriendById, getReceivePending, addFriend, getSentPending } = require("../repositories/friend.repository");
const { findById } = require("../repositories/user.repository");

const followUser = async ( followerId, followedId ) => {
    // Check if the user is sending an invitation to himself
    if(followedId===followerId){
        throw new CustomError("You cannot send an invitation to yourself", 401);
    }
    // Checking the existence of both users
    const existingFollower = await findById(followerId);
    if(!existingFollower){
        throw new CustomError(`Follower user with id ${followerId} not found`,404)
    }
    const existingFollowed = await findById(followedId);
    if(!existingFollowed){
        throw new CustomError(`Followed user with id ${followedId} not found`,404)
    }
    // Check if the user (Followed) is not already friends
    const isAlreadyFriends = await getFriendById(followerId, followedId);
    if(isAlreadyFriends) {
        throw new CustomError('Both users are already friends', 401);
    }
    // Check if user (Follower) has already sent an invitation to user (Followed)
    const isAlreadySentInv = await getSentPending(followerId, followedId);
    if(isAlreadySentInv) {
        throw new CustomError('You have already sent an invitation', 401);
    }
    // Check if user (Followed) has not already sent an invitation to user (Follower)
    const isAlreadyReceiveInv = await getReceivePending(followerId, followedId);
    if(isAlreadyReceiveInv) {
        throw new CustomError('User has already sent an invitation', 401);
    }
    // Sent the invetation
    const friend = await addFriend(followerId, followedId);
    return friend;
}

module.exports = {followUser}