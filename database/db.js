// import client from "./dbconfig";
const client = require("./dbconfig");

const membersGET = async () => {
  try {
    client.connect();
    console.log("connection was succesful");
  } catch (error) {
    console.log(error);
    return null;
  } finally {
    try {
      client.end();
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};

module.exports = membersGET;
