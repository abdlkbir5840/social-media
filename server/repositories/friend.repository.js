const prisma = require("../prisma/prisma");

const getFriendById = async (followerId, followedId) => {
  const friend = await prisma.friend.findFirst({
    where: {
      followerId: followerId,
      followedId: followedId,
      status: "accepted",
    },
  });
  return friend;
};

const getSentPending = async (followerId, followedId) => {
  const friend = await prisma.friend.findFirst({
    where: {
      followerId: followerId,
      followedId: followedId,
      status: "pending",
    },
  });
  return friend;
};

const getReceivePending = async (followerId, followedId) => {
  const friend = await prisma.friend.findFirst({
    where: {
      followerId: followedId,
      followedId: followerId,
      status: "pending",
    },
  });
  return friend;
};

const addFriend = async (followerId, followedId) => {
  const friend = await prisma.friend.create({
    data: {
      follower: { connect: { id: parseInt(followerId) } },
      followed: { connect: { id: parseInt(followedId) } },
    },
  });
  return friend;
};
module.exports = { getFriendById, getSentPending, getReceivePending, addFriend };
